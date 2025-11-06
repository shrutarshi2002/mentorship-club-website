import { NextResponse } from "next/server";
import { requireAdmin } from "../../middleware/auth";

// Mock users database
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

// GET /api/admin/users - Get all users with filtering
export const GET = requireAdmin(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    let filteredUsers = users;

    // Filter by role
    if (role) {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
    }

    // Filter by status (for mentors)
    if (status) {
      filteredUsers = filteredUsers.filter((user) => user.status === status);
    }

    // Search by name or email
    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    // Remove passwords from response
    const safeUsers = paginatedUsers.map(({ password, ...user }) => user);

    return NextResponse.json({
      success: true,
      users: safeUsers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredUsers.length / limit),
        totalItems: filteredUsers.length,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get users error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// POST /api/admin/users - Create new user
export const POST = requireAdmin(async (request) => {
  try {
    const userData = await request.json();
    const { role, email, password, ...otherData } = userData;

    // Validate required fields
    if (!role || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Role, email, and password are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      role,
      isActive: true,
      createdAt: new Date().toISOString(),
      ...otherData,
    };

    users.push(newUser);

    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





