import { NextResponse } from "next/server";
import { requireAuth } from "../middleware/auth";

// Mock progress tracking database
let progress = [
  {
    id: 1,
    studentId: 3,
    courseId: 1,
    courseName: "Web Development Fundamentals",
    totalAssignments: 5,
    completedAssignments: 3,
    totalPoints: 500,
    earnedPoints: 255,
    averageGrade: 85,
    lastActivity: "2024-02-16T10:00:00Z",
    enrolledAt: "2024-01-20T10:00:00Z",
    completionPercentage: 60,
  },
  {
    id: 2,
    studentId: 3,
    courseId: 2,
    courseName: "Advanced React Development",
    totalAssignments: 8,
    completedAssignments: 2,
    totalPoints: 800,
    earnedPoints: 180,
    averageGrade: 90,
    lastActivity: "2024-02-15T14:30:00Z",
    enrolledAt: "2024-01-25T10:00:00Z",
    completionPercentage: 25,
  },
];

// Mock enrollments database
let enrollments = [
  {
    id: 1,
    studentId: 3,
    courseId: 1,
    enrolledAt: "2024-01-20T10:00:00Z",
    status: "active", // active, completed, dropped
    mentorId: 2,
  },
  {
    id: 2,
    studentId: 3,
    courseId: 2,
    enrolledAt: "2024-01-25T10:00:00Z",
    status: "active",
    mentorId: 2,
  },
];

// GET /api/progress - Get progress for current user
export const GET = requireAuth(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");
    const studentId = searchParams.get("studentId");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const userId = request.user.userId;
    const userRole = request.user.role;

    let filteredProgress = progress;

    // Filter based on user role
    if (userRole === "student") {
      filteredProgress = progress.filter((p) => p.studentId === userId);
    } else if (userRole === "mentor") {
      // Get students assigned to this mentor
      const mentorStudents = enrollments
        .filter((e) => e.mentorId === userId)
        .map((e) => e.studentId);
      filteredProgress = progress.filter((p) =>
        mentorStudents.includes(p.studentId)
      );
    }
    // Admin can see all progress

    // Filter by course
    if (courseId) {
      filteredProgress = filteredProgress.filter(
        (p) => p.courseId === parseInt(courseId)
      );
    }

    // Filter by student (for mentors/admins)
    if (studentId && (userRole === "mentor" || userRole === "admin")) {
      filteredProgress = filteredProgress.filter(
        (p) => p.studentId === parseInt(studentId)
      );
    }

    // Sort by last activity (newest first)
    filteredProgress.sort(
      (a, b) => new Date(b.lastActivity) - new Date(a.lastActivity)
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProgress = filteredProgress.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      progress: paginatedProgress,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredProgress.length / limit),
        totalItems: filteredProgress.length,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get progress error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// POST /api/progress - Update progress (internal use)
export const POST = requireAuth(async (request) => {
  try {
    const { studentId, courseId, assignmentId, grade } = await request.json();

    // Find or create progress record
    let progressIndex = progress.findIndex(
      (p) => p.studentId === studentId && p.courseId === courseId
    );

    if (progressIndex === -1) {
      // Create new progress record
      const course = courses.find((c) => c.id === courseId);
      if (!course) {
        return NextResponse.json(
          { success: false, message: "Course not found" },
          { status: 404 }
        );
      }

      const newProgress = {
        id: progress.length + 1,
        studentId,
        courseId,
        courseName: course.title,
        totalAssignments: 0,
        completedAssignments: 0,
        totalPoints: 0,
        earnedPoints: 0,
        averageGrade: 0,
        lastActivity: new Date().toISOString(),
        enrolledAt: new Date().toISOString(),
        completionPercentage: 0,
      };

      progress.push(newProgress);
      progressIndex = progress.length - 1;
    }

    // Update progress
    const currentProgress = progress[progressIndex];
    currentProgress.completedAssignments += 1;
    currentProgress.earnedPoints += grade;
    currentProgress.averageGrade =
      currentProgress.earnedPoints / currentProgress.completedAssignments;
    currentProgress.completionPercentage = Math.round(
      (currentProgress.completedAssignments /
        currentProgress.totalAssignments) *
        100
    );
    currentProgress.lastActivity = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: "Progress updated successfully",
      progress: currentProgress,
    });
  } catch (error) {
    console.error("Update progress error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





