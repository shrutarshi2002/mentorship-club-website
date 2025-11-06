import { NextResponse } from "next/server";
import { requireAuth } from "../middleware/auth";

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
    status: "submitted",
    grade: null,
    feedback: null,
    gradedAt: null,
    gradedBy: null,
  },
];

// POST /api/assignments/submit - Submit assignment
export const POST = requireAuth(async (request) => {
  try {
    const userRole = request.user.role;
    if (userRole !== "student") {
      return NextResponse.json(
        { success: false, message: "Only students can submit assignments" },
        { status: 403 }
      );
    }

    const {
      assignmentId,
      submissionText,
      attachments = [],
    } = await request.json();

    // Validate required fields
    if (!assignmentId || !submissionText) {
      return NextResponse.json(
        {
          success: false,
          message: "Assignment ID and submission text are required",
        },
        { status: 400 }
      );
    }

    // Check if assignment exists
    const assignment = assignments.find((a) => a.id === assignmentId);
    if (!assignment) {
      return NextResponse.json(
        { success: false, message: "Assignment not found" },
        { status: 404 }
      );
    }

    // Check if assignment is still open
    if (new Date() > new Date(assignment.dueDate)) {
      return NextResponse.json(
        { success: false, message: "Assignment deadline has passed" },
        { status: 400 }
      );
    }

    // Check if already submitted
    const existingSubmission = submissions.find(
      (sub) =>
        sub.assignmentId === assignmentId &&
        sub.studentId === request.user.userId
    );
    if (existingSubmission) {
      return NextResponse.json(
        { success: false, message: "Assignment already submitted" },
        { status: 409 }
      );
    }

    // Get student info
    const student = users.find((u) => u.id === request.user.userId);
    if (!student) {
      return NextResponse.json(
        { success: false, message: "Student not found" },
        { status: 404 }
      );
    }

    // Determine if submission is late
    const isLate = new Date() > new Date(assignment.dueDate);
    const status = isLate ? "late" : "submitted";

    // Create new submission
    const newSubmission = {
      id: submissions.length + 1,
      assignmentId,
      studentId: request.user.userId,
      studentName: student.name,
      submissionText,
      attachments,
      submittedAt: new Date().toISOString(),
      status,
      grade: null,
      feedback: null,
      gradedAt: null,
      gradedBy: null,
    };

    submissions.push(newSubmission);

    // TODO: Send notification to mentor about new submission

    return NextResponse.json(
      {
        success: true,
        message: "Assignment submitted successfully",
        submission: newSubmission,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submit assignment error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





