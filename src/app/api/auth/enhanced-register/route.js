import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Enhanced user database
let users = [
  {
    id: 1,
    email: "admin@lms.com",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
    name: "Admin User",
    role: "admin",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
];

export async function POST(request) {
  try {
    const { role, ...userData } = await request.json();

    // Validate role
    const validRoles = ["student", "mentor"];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { success: false, message: "Invalid role" },
        { status: 400 }
      );
    }

    // Role-specific validation
    if (role === "student") {
      const { name, email, password, age, grade, school, interestedCourses } =
        userData;

      if (!name || !email || !password || !age || !grade || !school) {
        return NextResponse.json(
          { success: false, message: "All required fields must be provided" },
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
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create new student
      const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword,
        role: "student",
        age: parseInt(age),
        grade,
        school,
        interestedCourses: interestedCourses || [],
        isActive: true,
        status: "active",
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);

      // Generate JWT token
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "7d" }
      );

      const { password: _, ...userWithoutPassword } = newUser;

      return NextResponse.json(
        {
          success: true,
          message: "Student registered successfully",
          user: userWithoutPassword,
          token,
        },
        { status: 201 }
      );
    }

    if (role === "mentor") {
      const {
        name,
        email,
        password,
        phone,
        expertise,
        experience,
        education,
        motivation,
        availability,
        portfolio,
        linkedin,
        github,
      } = userData;

      if (
        !name ||
        !email ||
        !password ||
        !phone ||
        !expertise ||
        !experience ||
        !education ||
        !motivation
      ) {
        return NextResponse.json(
          { success: false, message: "All required fields must be provided" },
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
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create new mentor (pending approval)
      const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword,
        role: "mentor",
        status: "pending", // pending, approved, rejected
        isActive: false, // inactive until approved
        phone,
        expertise: Array.isArray(expertise) ? expertise : [expertise],
        experience,
        education,
        motivation,
        availability,
        portfolio: portfolio || "",
        linkedin: linkedin || "",
        github: github || "",
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);

      // Don't generate token for pending mentors
      const { password: _, ...userWithoutPassword } = newUser;

      return NextResponse.json(
        {
          success: true,
          message:
            "Mentor application submitted successfully. Please wait for admin approval.",
          user: userWithoutPassword,
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}





