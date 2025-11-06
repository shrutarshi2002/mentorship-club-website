import { NextResponse } from "next/server";
import { requireAuth } from "../middleware/auth";

// Mock internships database
let internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Tech Solutions Inc.",
    description:
      "Work on React-based web applications and learn modern frontend development practices.",
    requirements: ["HTML/CSS", "JavaScript", "React basics", "Git"],
    duration: "3 months",
    startDate: "2024-03-01",
    endDate: "2024-05-31",
    location: "Remote",
    stipend: 500,
    currency: "USD",
    mentorId: 2,
    mentorName: "Dr. Sarah Wilson",
    status: "approved", // pending, approved, rejected, filled
    maxApplicants: 5,
    currentApplicants: 2,
    createdAt: "2024-01-20T10:00:00Z",
    approvedAt: "2024-01-22T10:00:00Z",
    approvedBy: 1, // admin ID
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Data Analytics Co.",
    description:
      "Analyze datasets and create visualizations using Python and machine learning libraries.",
    requirements: ["Python", "Pandas", "Matplotlib", "SQL"],
    duration: "4 months",
    startDate: "2024-04-01",
    endDate: "2024-07-31",
    location: "Hybrid",
    stipend: 600,
    currency: "USD",
    mentorId: 2,
    mentorName: "Dr. Sarah Wilson",
    status: "pending",
    maxApplicants: 3,
    currentApplicants: 0,
    createdAt: "2024-01-25T10:00:00Z",
    approvedAt: null,
    approvedBy: null,
  },
];

// Mock internship applications database
let internshipApplications = [
  {
    id: 1,
    internshipId: 1,
    studentId: 3,
    studentName: "John Smith",
    coverLetter: "I am very interested in this internship opportunity...",
    resume: "/uploads/resumes/john-smith-resume.pdf",
    portfolio: "https://johnsmith.dev",
    status: "pending", // pending, accepted, rejected
    appliedAt: "2024-01-26T10:00:00Z",
    reviewedAt: null,
    reviewedBy: null,
  },
];

// GET /api/internships - Get internships
export const GET = requireAuth(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const mentorId = searchParams.get("mentorId");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const userId = request.user.userId;
    const userRole = request.user.role;

    let filteredInternships = internships;

    // Filter by status
    if (status) {
      filteredInternships = filteredInternships.filter(
        (internship) => internship.status === status
      );
    }

    // Filter by mentor
    if (mentorId) {
      filteredInternships = filteredInternships.filter(
        (internship) => internship.mentorId === parseInt(mentorId)
      );
    }

    // For students, only show approved internships
    if (userRole === "student") {
      filteredInternships = filteredInternships.filter(
        (internship) => internship.status === "approved"
      );
    }

    // For mentors, only show their own internships
    if (userRole === "mentor") {
      filteredInternships = filteredInternships.filter(
        (internship) => internship.mentorId === userId
      );
    }

    // Sort by creation date (newest first)
    filteredInternships.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedInternships = filteredInternships.slice(
      startIndex,
      endIndex
    );

    return NextResponse.json({
      success: true,
      internships: paginatedInternships,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredInternships.length / limit),
        totalItems: filteredInternships.length,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get internships error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// POST /api/internships - Create internship (mentors only)
export const POST = requireAuth(async (request) => {
  try {
    const userRole = request.user.role;
    if (userRole !== "mentor") {
      return NextResponse.json(
        { success: false, message: "Only mentors can create internships" },
        { status: 403 }
      );
    }

    const internshipData = await request.json();
    const {
      title,
      company,
      description,
      requirements,
      duration,
      startDate,
      endDate,
      location,
      stipend,
      currency = "USD",
      maxApplicants = 5,
    } = internshipData;

    // Validate required fields
    if (
      !title ||
      !company ||
      !description ||
      !requirements ||
      !duration ||
      !startDate ||
      !endDate ||
      !location
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Get mentor info
    const mentor = users.find((u) => u.id === request.user.userId);
    if (!mentor) {
      return NextResponse.json(
        { success: false, message: "Mentor not found" },
        { status: 404 }
      );
    }

    // Create new internship
    const newInternship = {
      id: internships.length + 1,
      title,
      company,
      description,
      requirements: Array.isArray(requirements) ? requirements : [requirements],
      duration,
      startDate,
      endDate,
      location,
      stipend: stipend ? parseFloat(stipend) : 0,
      currency,
      mentorId: request.user.userId,
      mentorName: mentor.name,
      status: "pending", // Requires admin approval
      maxApplicants: parseInt(maxApplicants),
      currentApplicants: 0,
      createdAt: new Date().toISOString(),
      approvedAt: null,
      approvedBy: null,
    };

    internships.push(newInternship);

    // TODO: Send notification to admin about new internship

    return NextResponse.json(
      {
        success: true,
        message: "Internship created successfully. Pending admin approval.",
        internship: newInternship,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create internship error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





