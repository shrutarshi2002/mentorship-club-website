import { NextResponse } from "next/server";
import { requireAdmin } from "../../middleware/auth";

// Mock users database (for mentor verification)
let users = [
  {
    id: 1,
    email: "admin@lms.com",
    name: "Admin User",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    email: "mentor@example.com",
    name: "Dr. Sarah Wilson",
    role: "mentor",
    status: "approved",
    isActive: true,
    expertise: ["Web Development", "React", "Node.js"],
    experience: "5+ years",
    education: "PhD in Computer Science",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 3,
    email: "student@example.com",
    name: "John Smith",
    role: "student",
    isActive: true,
    age: 16,
    grade: "10th",
    school: "Example High School",
    interestedCourses: ["Web Development", "Data Science"],
    createdAt: "2024-01-16T10:00:00Z",
  },
];

// Mock courses database
let courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    category: "programming",
    ageGroup: "14-18",
    difficulty: "beginner",
    mentorId: 2,
    mentorName: "Dr. Sarah Wilson",
    syllabus:
      "Introduction to HTML, CSS Basics, JavaScript Fundamentals, Project Building",
    schedule: "Tuesdays & Thursdays, 4:00 PM - 5:30 PM",
    bannerImage: "/assets/program/1.png",
    isPublished: true,
    maxStudents: 20,
    currentEnrollments: 15,
    price: 299,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Advanced React Development",
    description: "Master React hooks, context, and advanced patterns",
    category: "programming",
    ageGroup: "16-18",
    difficulty: "intermediate",
    mentorId: 2,
    mentorName: "Dr. Sarah Wilson",
    syllabus: "React Hooks, Context API, State Management, Advanced Patterns",
    schedule: "Mondays & Wednesdays, 5:00 PM - 6:30 PM",
    bannerImage: "/assets/program/2.png",
    isPublished: true,
    maxStudents: 15,
    currentEnrollments: 12,
    price: 499,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
];

// GET /api/admin/courses - Get all courses with filtering
export const GET = requireAdmin(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const ageGroup = searchParams.get("ageGroup");
    const difficulty = searchParams.get("difficulty");
    const isPublished = searchParams.get("isPublished");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    let filteredCourses = courses;

    // Filter by category
    if (category) {
      filteredCourses = filteredCourses.filter(
        (course) => course.category === category
      );
    }

    // Filter by age group
    if (ageGroup) {
      filteredCourses = filteredCourses.filter(
        (course) => course.ageGroup === ageGroup
      );
    }

    // Filter by difficulty
    if (difficulty) {
      filteredCourses = filteredCourses.filter(
        (course) => course.difficulty === difficulty
      );
    }

    // Filter by published status
    if (isPublished !== null) {
      filteredCourses = filteredCourses.filter(
        (course) => course.isPublished === (isPublished === "true")
      );
    }

    // Search by title or description
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower) ||
          course.mentorName.toLowerCase().includes(searchLower)
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      courses: paginatedCourses,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredCourses.length / limit),
        totalItems: filteredCourses.length,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get courses error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// POST /api/admin/courses - Create new course
export const POST = requireAdmin(async (request) => {
  try {
    const courseData = await request.json();
    const {
      title,
      description,
      category,
      ageGroup,
      difficulty,
      mentorId,
      syllabus,
      schedule,
      bannerImage,
      maxStudents,
      price,
    } = courseData;

    // Validate required fields
    if (
      !title ||
      !description ||
      !category ||
      !ageGroup ||
      !difficulty ||
      !syllabus ||
      !schedule
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Verify mentor exists and is approved (if provided)
    let mentor = null;
    let mentorIdInt = null;
    if (mentorId) {
      mentorIdInt = parseInt(mentorId);
      mentor = users.find(
        (u) => u.id === mentorIdInt && u.role === "mentor" && u.status === "approved"
      );
      if (!mentor) {
        return NextResponse.json(
          { success: false, message: "Mentor not found or not approved" },
          { status: 400 }
        );
      }
    }

    // Create new course
    const newCourse = {
      id: courses.length + 1,
      title,
      description,
      category,
      ageGroup,
      difficulty,
      mentorId: mentorIdInt || null,
      mentorName: mentor ? mentor.name : null,
      syllabus,
      schedule,
      bannerImage: bannerImage || "/assets/program/default.png",
      isPublished: false, // Start as unpublished
      maxStudents: maxStudents || 20,
      currentEnrollments: 0,
      price: price || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    courses.push(newCourse);

    return NextResponse.json(
      {
        success: true,
        message: "Course created successfully",
        course: newCourse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create course error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





