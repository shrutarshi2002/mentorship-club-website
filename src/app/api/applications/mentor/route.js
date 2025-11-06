import { NextResponse } from "next/server";

// Mock mentor applications database - in production, use a real database
let mentorApplications = [
  {
    id: 1,
    name: "Dr. Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1-555-0123",
    expertise: ["Web Development", "React", "Node.js"],
    experience: "5+ years",
    education: "PhD in Computer Science",
    motivation: "I want to help students learn programming",
    availability: "Weekends and evenings",
    status: "pending",
    submittedAt: "2024-01-15T10:00:00Z",
  },
];

// GET /api/applications/mentor - Get all mentor applications
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let filteredApplications = mentorApplications;

    // Filter by status
    if (status) {
      filteredApplications = mentorApplications.filter(
        (app) => app.status === status
      );
    }

    return NextResponse.json({
      success: true,
      applications: filteredApplications,
      total: filteredApplications.length,
    });
  } catch (error) {
    console.error("Get mentor applications error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/applications/mentor - Submit mentor application
export async function POST(request) {
  try {
    const {
      name,
      email,
      phone,
      expertise,
      experience,
      education,
      motivation,
      availability,
      portfolio,
      linkedin,
      github,
    } = await request.json();

    // Validate required fields
    if (
      !name ||
      !email ||
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

    // Check if application already exists
    const existingApplication = mentorApplications.find(
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

    // Create new mentor application
    const newApplication = {
      id: mentorApplications.length + 1,
      name,
      email,
      phone,
      expertise: Array.isArray(expertise) ? expertise : [expertise],
      experience,
      education,
      motivation,
      availability,
      portfolio: portfolio || "",
      linkedin: linkedin || "",
      github: github || "",
      status: "pending",
      submittedAt: new Date().toISOString(),
    };

    mentorApplications.push(newApplication);

    return NextResponse.json(
      {
        success: true,
        message: "Mentor application submitted successfully",
        application: newApplication,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submit mentor application error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}





