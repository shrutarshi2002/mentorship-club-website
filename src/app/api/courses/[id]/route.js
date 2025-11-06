import { NextResponse } from "next/server";

// Mock courses database - in production, use a real database
let courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    instructor: "John Doe",
    duration: "8 weeks",
    price: 299,
    level: "beginner",
    category: "programming",
    image: "/assets/program/1.png",
    isActive: true,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Advanced React Development",
    description: "Master React hooks, context, and advanced patterns",
    instructor: "Jane Smith",
    duration: "12 weeks",
    price: 499,
    level: "intermediate",
    category: "programming",
    image: "/assets/program/2.png",
    isActive: true,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
  },
  {
    id: 3,
    title: "Data Science with Python",
    description: "Learn data analysis, visualization, and machine learning",
    instructor: "Dr. Alex Johnson",
    duration: "16 weeks",
    price: 699,
    level: "intermediate",
    category: "data-science",
    image: "/assets/program/3.png",
    isActive: true,
    createdAt: "2024-01-25T10:00:00Z",
    updatedAt: "2024-01-25T10:00:00Z",
  },
];

// GET /api/courses/[id] - Get single course
export async function GET(request, { params }) {
  try {
    const courseId = parseInt(params.id);
    const course = courses.find((c) => c.id === courseId && c.isActive);

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
}

// PUT /api/courses/[id] - Update course
export async function PUT(request, { params }) {
  try {
    const courseId = parseInt(params.id);
    const courseIndex = courses.findIndex((c) => c.id === courseId);

    if (courseIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    const {
      title,
      description,
      instructor,
      duration,
      price,
      level,
      category,
      image,
      isActive,
    } = await request.json();

    // Update course fields
    if (title !== undefined) courses[courseIndex].title = title;
    if (description !== undefined)
      courses[courseIndex].description = description;
    if (instructor !== undefined) courses[courseIndex].instructor = instructor;
    if (duration !== undefined) courses[courseIndex].duration = duration;
    if (price !== undefined) courses[courseIndex].price = parseFloat(price);
    if (level !== undefined) courses[courseIndex].level = level;
    if (category !== undefined) courses[courseIndex].category = category;
    if (image !== undefined) courses[courseIndex].image = image;
    if (isActive !== undefined) courses[courseIndex].isActive = isActive;

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
}

// DELETE /api/courses/[id] - Delete course (soft delete)
export async function DELETE(request, { params }) {
  try {
    const courseId = parseInt(params.id);
    const courseIndex = courses.findIndex((c) => c.id === courseId);

    if (courseIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    // Soft delete - mark as inactive
    courses[courseIndex].isActive = false;
    courses[courseIndex].updatedAt = new Date().toISOString();

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
}

