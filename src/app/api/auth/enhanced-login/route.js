import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Enhanced user database with role-based access
let users = [
  {
    id: 1,
    email: "admin@lms.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    name: "Admin User",
    role: "admin",
    isActive: true,
    lastLogin: null,
    loginAttempts: 0,
    lockedUntil: null,
  },
  {
    id: 2,
    email: "mentor@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    name: "Dr. Sarah Wilson",
    role: "mentor",
    status: "approved", // pending, approved, rejected
    isActive: true,
    expertise: ["Web Development", "React", "Node.js"],
    experience: "5+ years",
    education: "PhD in Computer Science",
    lastLogin: null,
    loginAttempts: 0,
    lockedUntil: null,
  },
  {
    id: 3,
    email: "student@example.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    name: "John Smith",
    role: "student",
    isActive: true,
    age: 16,
    grade: "10th",
    school: "Example High School",
    interestedCourses: ["Web Development", "Data Science"],
    lastLogin: null,
    loginAttempts: 0,
    lockedUntil: null,
  },
];

// Login attempts tracking
let loginAttempts = [];

export async function POST(request) {
  try {
    const { email, password, rememberMe = false } = await request.json();
    const clientIP = request.headers.get("x-forwarded-for") || "unknown";

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check for too many failed attempts
    const recentAttempts = loginAttempts.filter(
      (attempt) =>
        attempt.email === email &&
        attempt.ip === clientIP &&
        attempt.timestamp > Date.now() - 15 * 60 * 1000 // 15 minutes
    );

    if (recentAttempts.length >= 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many failed attempts. Please try again in 15 minutes.",
        },
        { status: 429 }
      );
    }

    // Find user
    const user = users.find((u) => u.email === email);
    if (!user) {
      // Log failed attempt
      loginAttempts.push({
        email,
        ip: clientIP,
        timestamp: Date.now(),
        success: false,
      });
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if account is locked
    if (user.lockedUntil && user.lockedUntil > Date.now()) {
      return NextResponse.json(
        {
          success: false,
          message: "Account is temporarily locked. Please try again later.",
        },
        { status: 423 }
      );
    }

    // Check if account is active
    if (!user.isActive) {
      return NextResponse.json(
        { success: false, message: "Account is deactivated" },
        { status: 403 }
      );
    }

    // Check if mentor is approved
    if (user.role === "mentor" && user.status !== "approved") {
      return NextResponse.json(
        {
          success: false,
          message: "Mentor account is pending approval",
        },
        { status: 403 }
      );
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      // Increment failed attempts
      user.loginAttempts = (user.loginAttempts || 0) + 1;

      // Lock account after 5 failed attempts
      if (user.loginAttempts >= 5) {
        user.lockedUntil = Date.now() + 15 * 60 * 1000; // 15 minutes
      }

      // Log failed attempt
      loginAttempts.push({
        email,
        ip: clientIP,
        timestamp: Date.now(),
        success: false,
      });

      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.lockedUntil = null;
    user.lastLogin = new Date().toISOString();

    // Generate JWT token
    const tokenExpiry = rememberMe ? "30d" : "7d";
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: tokenExpiry }
    );

    // Log successful attempt
    loginAttempts.push({
      email,
      ip: clientIP,
      timestamp: Date.now(),
      success: true,
    });

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}





