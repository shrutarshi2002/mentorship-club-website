import { NextResponse } from "next/server";
import { requireAuth } from "../middleware/auth";

// Mock grades database
let grades = [
  {
    id: 1,
    assignmentId: 1,
    studentId: 3,
    studentName: "John Smith",
    mentorId: 2,
    mentorName: "Dr. Sarah Wilson",
    grade: 85,
    maxPoints: 100,
    feedback:
      "Great work on the portfolio! The design is clean and responsive. Consider adding more interactive elements.",
    gradedAt: "2024-02-16T10:00:00Z",
    isVisibleToStudent: true,
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
    status: "graded",
    grade: 85,
    feedback:
      "Great work on the portfolio! The design is clean and responsive.",
    gradedAt: "2024-02-16T10:00:00Z",
    gradedBy: 2,
  },
];

// GET /api/grades - Get grades for current user
export const GET = requireAuth(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    const studentId = searchParams.get("studentId");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const userId = request.user.userId;
    const userRole = request.user.role;

    let filteredGrades = grades;

    // Filter based on user role
    if (userRole === "student") {
      filteredGrades = grades.filter((grade) => grade.studentId === userId);
    } else if (userRole === "mentor") {
      filteredGrades = grades.filter((grade) => grade.mentorId === userId);
    }
    // Admin can see all grades

    // Filter by course (if courseId provided)
    if (courseId) {
      // Get assignments for this course
      const courseAssignments = assignments.filter(
        (a) => a.courseId === parseInt(courseId)
      );
      const assignmentIds = courseAssignments.map((a) => a.id);
      filteredGrades = filteredGrades.filter((grade) =>
        assignmentIds.includes(grade.assignmentId)
      );
    }

    // Filter by student (for mentors/admins)
    if (studentId && (userRole === "mentor" || userRole === "admin")) {
      filteredGrades = filteredGrades.filter(
        (grade) => grade.studentId === parseInt(studentId)
      );
    }

    // Sort by graded date (newest first)
    filteredGrades.sort((a, b) => new Date(b.gradedAt) - new Date(a.gradedAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedGrades = filteredGrades.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      grades: paginatedGrades,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredGrades.length / limit),
        totalItems: filteredGrades.length,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get grades error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// POST /api/grades - Grade an assignment (mentors only)
export const POST = requireAuth(async (request) => {
  try {
    const userRole = request.user.role;
    if (userRole !== "mentor" && userRole !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Only mentors and admins can grade assignments",
        },
        { status: 403 }
      );
    }

    const {
      submissionId,
      grade,
      feedback,
      isVisibleToStudent = true,
    } = await request.json();

    // Validate required fields
    if (!submissionId || grade === undefined || !feedback) {
      return NextResponse.json(
        {
          success: false,
          message: "Submission ID, grade, and feedback are required",
        },
        { status: 400 }
      );
    }

    // Find submission
    const submissionIndex = submissions.findIndex(
      (sub) => sub.id === submissionId
    );
    if (submissionIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Submission not found" },
        { status: 404 }
      );
    }

    const submission = submissions[submissionIndex];

    // Check if mentor has access to this submission
    if (userRole === "mentor") {
      const assignment = assignments.find(
        (a) => a.id === submission.assignmentId
      );
      if (!assignment || assignment.mentorId !== request.user.userId) {
        return NextResponse.json(
          { success: false, message: "Access denied" },
          { status: 403 }
        );
      }
    }

    // Get assignment details
    const assignment = assignments.find(
      (a) => a.id === submission.assignmentId
    );
    if (!assignment) {
      return NextResponse.json(
        { success: false, message: "Assignment not found" },
        { status: 404 }
      );
    }

    // Validate grade
    if (grade < 0 || grade > assignment.maxPoints) {
      return NextResponse.json(
        {
          success: false,
          message: `Grade must be between 0 and ${assignment.maxPoints}`,
        },
        { status: 400 }
      );
    }

    // Update submission
    submissions[submissionIndex].grade = grade;
    submissions[submissionIndex].feedback = feedback;
    submissions[submissionIndex].gradedAt = new Date().toISOString();
    submissions[submissionIndex].gradedBy = request.user.userId;
    submissions[submissionIndex].status = "graded";

    // Create or update grade record
    const existingGradeIndex = grades.findIndex(
      (g) =>
        g.assignmentId === submission.assignmentId &&
        g.studentId === submission.studentId
    );

    const gradeData = {
      assignmentId: submission.assignmentId,
      studentId: submission.studentId,
      studentName: submission.studentName,
      mentorId: request.user.userId,
      mentorName: request.user.name || "Unknown Mentor",
      grade,
      maxPoints: assignment.maxPoints,
      feedback,
      gradedAt: new Date().toISOString(),
      isVisibleToStudent,
    };

    if (existingGradeIndex !== -1) {
      grades[existingGradeIndex] = {
        ...grades[existingGradeIndex],
        ...gradeData,
      };
    } else {
      grades.push({
        id: grades.length + 1,
        ...gradeData,
      });
    }

    // TODO: Send notification to student about grade

    return NextResponse.json({
      success: true,
      message: "Assignment graded successfully",
      grade: gradeData,
    });
  } catch (error) {
    console.error("Grade assignment error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





