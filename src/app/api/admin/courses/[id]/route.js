import { NextResponse } from "next/server";
import { requireAdmin } from "../../../middleware/auth";

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
];

// GET /api/admin/courses/[id] - Get single course
export const GET = requireAdmin(async (request, { params }) => {
  try {
    const courseId = parseInt(params.id);
    const course = courses.find((c) => c.id === courseId);

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      course,
    });
  } catch (error) {
    console.error("Get course error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// PUT /api/admin/courses/[id] - Update course
export const PUT = requireAdmin(async (request, { params }) => {
  try {
    const courseId = parseInt(params.id);
    const courseIndex = courses.findIndex((c) => c.id === courseId);

    if (courseIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    const updateData = await request.json();
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
      isPublished,
    } = updateData;

    // Update course fields
    if (title !== undefined) courses[courseIndex].title = title;
    if (description !== undefined)
      courses[courseIndex].description = description;
    if (category !== undefined) courses[courseIndex].category = category;
    if (ageGroup !== undefined) courses[courseIndex].ageGroup = ageGroup;
    if (difficulty !== undefined) courses[courseIndex].difficulty = difficulty;
    if (mentorId !== undefined) {
      // Verify new mentor exists and is approved
      const mentor = users.find(
        (u) =>
          u.id === mentorId && u.role === "mentor" && u.status === "approved"
      );
      if (!mentor) {
        return NextResponse.json(
          { success: false, message: "Mentor not found or not approved" },
          { status: 400 }
        );
      }
      courses[courseIndex].mentorId = mentorId;
      courses[courseIndex].mentorName = mentor.name;
    }
    if (syllabus !== undefined) courses[courseIndex].syllabus = syllabus;
    if (schedule !== undefined) courses[courseIndex].schedule = schedule;
    if (bannerImage !== undefined)
      courses[courseIndex].bannerImage = bannerImage;
    if (maxStudents !== undefined)
      courses[courseIndex].maxStudents = maxStudents;
    if (price !== undefined) courses[courseIndex].price = price;
    if (isPublished !== undefined)
      courses[courseIndex].isPublished = isPublished;

    courses[courseIndex].updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: "Course updated successfully",
      course: courses[courseIndex],
    });
  } catch (error) {
    console.error("Update course error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// DELETE /api/admin/courses/[id] - Delete course
export const DELETE = requireAdmin(async (request, { params }) => {
  try {
    const courseId = parseInt(params.id);
    const courseIndex = courses.findIndex((c) => c.id === courseId);

    if (courseIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    // Check if course has enrollments
    if (courses[courseIndex].currentEnrollments > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Cannot delete course with active enrollments",
        },
        { status: 400 }
      );
    }

    // Remove course
    courses.splice(courseIndex, 1);

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Delete course error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





