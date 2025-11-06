import { NextResponse } from "next/server";
import { requireAuth } from "../middleware/auth";

// Mock file uploads database
let uploads = [
  {
    id: 1,
    fileName: "portfolio-website.zip",
    originalName: "portfolio-website.zip",
    fileSize: 2048576, // 2MB in bytes
    fileType: "application/zip",
    fileUrl: "/uploads/submissions/portfolio-website-123456.zip",
    uploadedBy: 3,
    uploadedByName: "John Smith",
    category: "assignment_submission", // assignment_submission, course_material, profile_image, resume
    relatedId: 1, // assignment ID, course ID, etc.
    isPublic: false,
    createdAt: "2024-02-14T15:30:00Z",
  },
  {
    id: 2,
    fileName: "react-tutorial.pdf",
    originalName: "React Tutorial.pdf",
    fileSize: 1024000, // 1MB in bytes
    fileType: "application/pdf",
    fileUrl: "/uploads/course-materials/react-tutorial-789012.pdf",
    uploadedBy: 2,
    uploadedByName: "Dr. Sarah Wilson",
    category: "course_material",
    relatedId: 1,
    isPublic: true,
    createdAt: "2024-01-20T10:00:00Z",
  },
];

// Mock users database
let users = [
  {
    id: 1,
    email: "admin@lms.com",
    name: "Admin User",
    role: "admin",
    isActive: true,
  },
  {
    id: 2,
    email: "mentor@example.com",
    name: "Dr. Sarah Wilson",
    role: "mentor",
    status: "approved",
    isActive: true,
  },
  {
    id: 3,
    email: "student@example.com",
    name: "John Smith",
    role: "student",
    isActive: true,
  },
];

// Allowed file types by category
const ALLOWED_FILE_TYPES = {
  assignment_submission: [
    "application/pdf",
    "application/zip",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "image/jpeg",
    "image/png",
    "video/mp4",
  ],
  course_material: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "video/mp4",
    "video/quicktime",
    "image/jpeg",
    "image/png",
  ],
  profile_image: ["image/jpeg", "image/png", "image/gif"],
  resume: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

// File size limits (in bytes)
const FILE_SIZE_LIMITS = {
  assignment_submission: 50 * 1024 * 1024, // 50MB
  course_material: 100 * 1024 * 1024, // 100MB
  profile_image: 5 * 1024 * 1024, // 5MB
  resume: 10 * 1024 * 1024, // 10MB
};

// POST /api/upload - Upload file
export const POST = requireAuth(async (request) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const category = formData.get("category");
    const relatedId = formData.get("relatedId");
    const isPublic = formData.get("isPublic") === "true";

    // Validate required fields
    if (!file || !category) {
      return NextResponse.json(
        { success: false, message: "File and category are required" },
        { status: 400 }
      );
    }

    // Validate category
    if (!ALLOWED_FILE_TYPES[category]) {
      return NextResponse.json(
        { success: false, message: "Invalid file category" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES[category].includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message: `File type not allowed for ${category}. Allowed types: ${ALLOWED_FILE_TYPES[
            category
          ].join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > FILE_SIZE_LIMITS[category]) {
      return NextResponse.json(
        {
          success: false,
          message: `File too large. Maximum size for ${category}: ${
            FILE_SIZE_LIMITS[category] / (1024 * 1024)
          }MB`,
        },
        { status: 400 }
      );
    }

    // Get user info
    const user = users.find((u) => u.id === request.user.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileExtension = file.name.split(".").pop();
    const uniqueFileName = `${
      file.name.split(".")[0]
    }-${timestamp}-${randomString}.${fileExtension}`;

    // Generate file URL (in production, this would be the actual uploaded file URL)
    const fileUrl = `/uploads/${category}/${uniqueFileName}`;

    // Create upload record
    const newUpload = {
      id: uploads.length + 1,
      fileName: uniqueFileName,
      originalName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileUrl,
      uploadedBy: request.user.userId,
      uploadedByName: user.name,
      category,
      relatedId: relatedId ? parseInt(relatedId) : null,
      isPublic: isPublic || false,
      createdAt: new Date().toISOString(),
    };

    uploads.push(newUpload);

    // TODO: In production, save the actual file to storage (AWS S3, Google Cloud Storage, etc.)
    // await saveFileToStorage(file, fileUrl);

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      upload: newUpload,
    });
  } catch (error) {
    console.error("Upload file error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// GET /api/upload - Get uploaded files
export const GET = requireAuth(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const relatedId = searchParams.get("relatedId");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const userId = request.user.userId;
    const userRole = request.user.role;

    let filteredUploads = uploads;

    // Filter by user (students can only see their own uploads)
    if (userRole === "student") {
      filteredUploads = uploads.filter(
        (upload) => upload.uploadedBy === userId
      );
    }

    // Filter by category
    if (category) {
      filteredUploads = filteredUploads.filter(
        (upload) => upload.category === category
      );
    }

    // Filter by related ID
    if (relatedId) {
      filteredUploads = filteredUploads.filter(
        (upload) => upload.relatedId === parseInt(relatedId)
      );
    }

    // Sort by creation date (newest first)
    filteredUploads.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUploads = filteredUploads.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      uploads: paginatedUploads,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredUploads.length / limit),
        totalItems: filteredUploads.length,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get uploads error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





