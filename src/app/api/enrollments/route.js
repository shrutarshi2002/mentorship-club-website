import { NextResponse } from "next/server";
import { requireAuth } from "../middleware/auth";

// Mock enrollments database
let enrollments = [
  {
    id: 1,
    studentId: 3,
    studentName: "John Smith",
    courseId: 1,
    courseName: "Web Development Fundamentals",
    mentorId: 2,
    mentorName: "Dr. Sarah Wilson",
    enrolledAt: "2024-01-20T10:00:00Z",
    status: "active", // active, completed, dropped, suspended
    progress: 60,
    lastAccessedAt: "2024-02-16T10:00:00Z",
    completedAt: null,
  },
  {
    id: 2,
    studentId: 3,
    studentName: "John Smith",
    courseId: 2,
    courseName: "Advanced React Development",
    mentorId: 2,
    mentorName: "Dr. Sarah Wilson",
    enrolledAt: "2024-01-25T10:00:00Z",
    status: "active",
    progress: 25,
    lastAccessedAt: "2024-02-15T14:30:00Z",
    completedAt: null,
  },
];

// GET /api/enrollments - Get enrollments
export const GET = requireAuth(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");
    const courseId = searchParams.get("courseId");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const userId = request.user.userId;
    const userRole = request.user.role;

    let filteredEnrollments = enrollments;

    // Filter based on user role
    if (userRole === "student") {
      filteredEnrollments = enrollments.filter(
        (enrollment) => enrollment.studentId === userId
      );
    } else if (userRole === "mentor") {
      filteredEnrollments = enrollments.filter(
        (enrollment) => enrollment.mentorId === userId
      );
    }
    // Admin can see all enrollments

    // Filter by student
    if (studentId) {
      filteredEnrollments = filteredEnrollments.filter(
        (enrollment) => enrollment.studentId === parseInt(studentId)
      );
    }

    // Filter by course
    if (courseId) {
      filteredEnrollments = filteredEnrollments.filter(
        (enrollment) => enrollment.courseId === parseInt(courseId)
      );
    }

    // Filter by status
    if (status) {
      filteredEnrollments = filteredEnrollments.filter(
        (enrollment) => enrollment.status === status
      );
    }

    // Sort by enrollment date (newest first)
    filteredEnrollments.sort(
      (a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt)
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEnrollments = filteredEnrollments.slice(
      startIndex,
      endIndex
    );

    return NextResponse.json({
      success: true,
      enrollments: paginatedEnrollments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredEnrollments.length / limit),
        totalItems: filteredEnrollments.length,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get enrollments error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// POST /api/enrollments - Enroll in course
export const POST = requireAuth(async (request) => {
  try {
    const userRole = request.user.role;
    if (userRole !== "student") {
      return NextResponse.json(
        { success: false, message: "Only students can enroll in courses" },
        { status: 403 }
      );
    }

    const { courseId } = await request.json();

    // Validate required fields
    if (!courseId) {
      return NextResponse.json(
        { success: false, message: "Course ID is required" },
        { status: 400 }
      );
    }

    // Check if course exists
    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    // Check if course is published
    if (!course.isPublished) {
      return NextResponse.json(
        { success: false, message: "Course is not available for enrollment" },
        { status: 400 }
      );
    }

    // Check if already enrolled
    const existingEnrollment = enrollments.find(
      (e) => e.studentId === request.user.userId && e.courseId === courseId
    );
    if (existingEnrollment) {
      return NextResponse.json(
        { success: false, message: "Already enrolled in this course" },
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

    // Create new enrollment
    const newEnrollment = {
      id: enrollments.length + 1,
      studentId: request.user.userId,
      studentName: student.name,
      courseId,
      courseName: course.title,
      mentorId: course.mentorId,
      mentorName: course.mentorName,
      enrolledAt: new Date().toISOString(),
      status: "active",
      progress: 0,
      lastAccessedAt: new Date().toISOString(),
      completedAt: null,
    };

    enrollments.push(newEnrollment);

    // TODO: Send enrollment confirmation email
    // await sendEnrollmentConfirmation(request.user.userId, courseId);

    return NextResponse.json(
      {
        success: true,
        message: "Successfully enrolled in course",
        enrollment: newEnrollment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Enroll in course error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





