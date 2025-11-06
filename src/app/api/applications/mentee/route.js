import { NextResponse } from "next/server";

// Mock mentee applications database - in production, use a real database
let menteeApplications = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1-555-0456",
    age: 22,
    grade: "Senior",
    interests: ["Web Development", "Mobile Apps"],
    goals: "I want to become a full-stack developer",
    preferredTime: "Evenings",
    experience: "Beginner",
    status: "pending",
    submittedAt: "2024-01-16T10:00:00Z",
  },
];

// GET /api/applications/mentee - Get all mentee applications
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let filteredApplications = menteeApplications;

    // Filter by status
    if (status) {
      filteredApplications = menteeApplications.filter(
        (app) => app.status === status
      );
    }

    return NextResponse.json({
      success: true,
      applications: filteredApplications,
      total: filteredApplications.length,
    });
  } catch (error) {
    console.error("Get mentee applications error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/applications/mentee - Submit mentee application
export async function POST(request) {
  try {
    const {
      name,
      email,
      phone,
      age,
      grade,
      interests,
      goals,
      preferredTime,
      experience,
      additionalInfo,
    } = await request.json();

    // Validate required fields
    if (
      !name ||
      !email ||
      !phone ||
      !age ||
      !grade ||
      !interests ||
      !goals ||
      !preferredTime
    ) {
      return NextResponse.json(
        { success: false, message: "All required fields must be provided" },
        { status: 400 }
      );
    }

    // Check if application already exists
    const existingApplication = menteeApplications.find(
      (app) => app.email === email
    );
    if (existingApplication) {
      return NextResponse.json(
        {
          success: false,
          message: "Application already submitted with this email",
        },
        { status: 409 }
      );
    }

    // Create new mentee application
    const newApplication = {
      id: menteeApplications.length + 1,
      name,
      email,
      phone,
      age: parseInt(age),
      grade,
      interests: Array.isArray(interests) ? interests : [interests],
      goals,
      preferredTime,
      experience: experience || "Beginner",
      additionalInfo: additionalInfo || "",
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    menteeApplications.push(newApplication);

    return NextResponse.json(
      {
        success: true,
        message: "Mentee application submitted successfully",
        application: newApplication,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submit mentee application error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

