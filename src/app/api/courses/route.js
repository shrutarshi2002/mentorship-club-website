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

// GET /api/courses - Get all courses
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const search = searchParams.get("search");

    let filteredCourses = courses.filter((course) => course.isActive);

    // Filter by category
    if (category) {
      filteredCourses = filteredCourses.filter(
        (course) => course.category === category
      );
    }

    // Filter by level
    if (level) {
      filteredCourses = filteredCourses.filter(
        (course) => course.level === level
      );
    }

    // Search by title or description
    if (search) {
      const searchLower = search.toLowerCase();
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower)
      );
    }

    return NextResponse.json({
      success: true,
      courses: filteredCourses,
      total: filteredCourses.length,
    });
  } catch (error) {
    console.error("Get courses error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/courses - Create new course
export async function POST(request) {
  try {
    const {
      title,
      description,
      instructor,
      duration,
      price,
      level,
      category,
      image,
    } = await request.json();

    // Validate required fields
    if (
      !title ||
      !description ||
      !instructor ||
      !duration ||
      !price ||
      !level ||
      !category
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Create new course
    const newCourse = {
      id: courses.length + 1,
      title,
      description,
      instructor,
      duration,
      price: parseFloat(price),
      level,
      category,
      image: image || "/assets/program/default.png",
      isActive: true,
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
}

