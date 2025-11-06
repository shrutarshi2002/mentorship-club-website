import { NextResponse } from "next/server";
import { requireAuth } from "../middleware/auth";

// Mock assignments database
let assignments = [
  {
    id: 1,
    courseId: 1,
    courseName: "Web Development Fundamentals",
    title: "Build a Personal Portfolio Website",
    description:
      "Create a responsive portfolio website using HTML, CSS, and JavaScript",
    instructions:
      "Include: Home page, About page, Projects page, Contact form. Must be responsive.",
    dueDate: "2024-02-15T23:59:59Z",
    maxPoints: 100,
    assignmentType: "project", // project, quiz, homework, exam
    attachments: [
      {
        name: "Design Guidelines.pdf",
        url: "/uploads/assignments/design-guidelines.pdf",
        type: "pdf",
      },
    ],
    isPublished: true,
    createdAt: "2024-01-20T10:00:00Z",
    createdBy: 2, // mentor ID
  },
  {
    id: 2,
    courseId: 1,
    courseName: "Web Development Fundamentals",
    title: "CSS Flexbox Quiz",
    description: "Test your understanding of CSS Flexbox properties",
    instructions:
      "Answer all questions about flexbox properties and their usage",
    dueDate: "2024-02-10T23:59:59Z",
    maxPoints: 50,
    assignmentType: "quiz",
    attachments: [],
    isPublished: true,
    createdAt: "2024-01-18T10:00:00Z",
    createdBy: 2,
  },
];

// Mock submissions database
let submissions = [
  {
    id: 1,
    assignmentId: 1,
    studentId: 3,
    studentName: "John Smith",
    submissionText:
      "I've completed the portfolio website with all required pages.",
    attachments: [
      {
        name: "portfolio.zip",
        url: "/uploads/submissions/portfolio-john-smith.zip",
        type: "zip",
      },
    ],
    submittedAt: "2024-02-14T15:30:00Z",
    status: "submitted", // submitted, graded, late
    grade: null,
    feedback: null,
    gradedAt: null,
    gradedBy: null,
  },
];

// GET /api/assignments - Get assignments for current user
export const GET = requireAuth(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    const assignmentType = searchParams.get("type");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const userId = request.user.userId;
    const userRole = request.user.role;

    let filteredAssignments = assignments.filter(
      (assignment) => assignment.isPublished
    );

    // Filter by course
    if (courseId) {
      filteredAssignments = filteredAssignments.filter(
        (assignment) => assignment.courseId === parseInt(courseId)
      );
    }

    // Filter by type
    if (assignmentType) {
      filteredAssignments = filteredAssignments.filter(
        (assignment) => assignment.assignmentType === assignmentType
      );
    }

    // For students, add submission status
    if (userRole === "student") {
      filteredAssignments = filteredAssignments.map((assignment) => {
        const submission = submissions.find(
          (sub) =>
            sub.assignmentId === assignment.id && sub.studentId === userId
        );

        return {
          ...assignment,
          submission: submission || null,
          submissionStatus: submission ? submission.status : "not_submitted",
        };
      });

      // Filter by submission status
      if (status) {
        filteredAssignments = filteredAssignments.filter(
          (assignment) => assignment.submissionStatus === status
        );
      }
    }

    // Sort by due date
    filteredAssignments.sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedAssignments = filteredAssignments.slice(
      startIndex,
      endIndex
    );

    return NextResponse.json({
      success: true,
      assignments: paginatedAssignments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredAssignments.length / limit),
        totalItems: filteredAssignments.length,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get assignments error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// POST /api/assignments - Create new assignment (mentors only)
export const POST = requireAuth(async (request) => {
  try {
    const userRole = request.user.role;
    if (userRole !== "mentor") {
      return NextResponse.json(
        { success: false, message: "Only mentors can create assignments" },
        { status: 403 }
      );
    }

    const assignmentData = await request.json();
    const {
      courseId,
      title,
      description,
      instructions,
      dueDate,
      maxPoints,
      assignmentType,
      attachments = [],
    } = assignmentData;

    // Validate required fields
    if (!courseId || !title || !description || !dueDate || !maxPoints) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Verify course exists and mentor has access
    const course = courses.find((c) => c.id === courseId);
    if (!course || course.mentorId !== request.user.userId) {
      return NextResponse.json(
        { success: false, message: "Course not found or access denied" },
        { status: 404 }
      );
    }

    // Create new assignment
    const newAssignment = {
      id: assignments.length + 1,
      courseId,
      courseName: course.title,
      title,
      description,
      instructions,
      dueDate,
      maxPoints: parseInt(maxPoints),
      assignmentType: assignmentType || "homework",
      attachments,
      isPublished: true,
      createdAt: new Date().toISOString(),
      createdBy: request.user.userId,
    };

    assignments.push(newAssignment);

    return NextResponse.json(
      {
        success: true,
        message: "Assignment created successfully",
        assignment: newAssignment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create assignment error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





