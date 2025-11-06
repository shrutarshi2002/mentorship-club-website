import { NextResponse } from "next/server";
import { requireAdmin } from "../../../middleware/auth";

// Mock users database (shared with parent route)
// In production, this would be in a database
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

// GET /api/admin/users/[id] - Get single user
export const GET = requireAdmin(async (request, { params }) => {
  try {
    const userId = parseInt(params.id);
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const { password, ...userWithoutPassword } = user;
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// PUT /api/admin/users/[id] - Update user
export const PUT = requireAdmin(async (request, { params }) => {
  try {
    const userId = parseInt(params.id);
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const updateData = await request.json();
    const { password, ...otherUpdates } = updateData;

    // If password is provided, hash it
    if (password) {
      const bcrypt = require("bcryptjs");
      otherUpdates.password = await bcrypt.hash(password, 12);
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      ...otherUpdates,
      updatedAt: new Date().toISOString(),
    };

    const { password: _, ...updatedUserWithoutPassword } = users[userIndex];

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      user: updatedUserWithoutPassword,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// DELETE /api/admin/users/[id] - Delete user
export const DELETE = requireAdmin(async (request, { params }) => {
  try {
    const userId = parseInt(params.id);
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Prevent deleting the last admin
    if (users[userIndex].role === "admin") {
      const adminCount = users.filter((u) => u.role === "admin").length;
      if (adminCount === 1) {
        return NextResponse.json(
          { success: false, message: "Cannot delete the last admin user" },
          { status: 400 }
        );
      }
    }

    users.splice(userIndex, 1);

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

