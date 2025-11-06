import { NextResponse } from "next/server";

// Mock applications databases - in production, use a real database
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

// PUT /api/applications/[id]/status - Update application status
export async function PUT(request, { params }) {
  try {
    const applicationId = parseInt(params.id);
    const { status, type } = await request.json();

    // Validate status
    const validStatuses = ["pending", "approved", "rejected"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status. Must be pending, approved, or rejected",
        },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = ["mentor", "mentee"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { success: false, message: "Invalid type. Must be mentor or mentee" },
        { status: 400 }
      );
    }

    let applications, applicationType;

    if (type === "mentor") {
      applications = mentorApplications;
      applicationType = "mentor";
    } else {
      applications = menteeApplications;
      applicationType = "mentee";
    }

    const applicationIndex = applications.findIndex(
      (app) => app.id === applicationId
    );

    if (applicationIndex === -1) {
      return NextResponse.json(
        { success: false, message: `${applicationType} application not found` },
        { status: 404 }
      );
    }

    // Update application status
    applications[applicationIndex].status = status;
    applications[applicationIndex].updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: `${applicationType} application status updated successfully`,
      application: applications[applicationIndex],
    });
  } catch (error) {
    console.error("Update application status error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}





