import { NextResponse } from "next/server";
import { requireAdmin } from "../../../middleware/auth";

// Mock users database
let users = [
  {
    id: 1,
    email: "admin@lms.com",
    name: "Admin User",
    role: "admin",
    isActive: true,
  },
  {
    id: 2,
    email: "mentor@example.com",
    name: "Dr. Sarah Wilson",
    role: "mentor",
    status: "pending",
    isActive: false,
    expertise: ["Web Development", "React", "Node.js"],
    experience: "5+ years",
    education: "PhD in Computer Science",
  },
];

// PUT /api/admin/mentors/approve - Approve or reject mentor
export const PUT = requireAdmin(async (request) => {
  try {
    const { mentorId, action, adminNotes } = await request.json();

    // Validate action
    const validActions = ["approve", "reject"];
    if (!validActions.includes(action)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid action. Must be 'approve' or 'reject'",
        },
        { status: 400 }
      );
    }

    // Find mentor
    const mentorIndex = users.findIndex(
      (u) => u.id === mentorId && u.role === "mentor"
    );

    if (mentorIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Mentor not found" },
        { status: 404 }
      );
    }

    const mentor = users[mentorIndex];

    // Update mentor status
    if (action === "approve") {
      users[mentorIndex].status = "approved";
      users[mentorIndex].isActive = true;
      users[mentorIndex].approvedAt = new Date().toISOString();
      users[mentorIndex].adminNotes = adminNotes || "";
    } else {
      users[mentorIndex].status = "rejected";
      users[mentorIndex].isActive = false;
      users[mentorIndex].rejectedAt = new Date().toISOString();
      users[mentorIndex].adminNotes = adminNotes || "";
    }

    users[mentorIndex].updatedAt = new Date().toISOString();

    // TODO: Send email notification to mentor
    // await sendMentorNotification(mentor.email, action, adminNotes);

    return NextResponse.json({
      success: true,
      message: `Mentor ${action}d successfully`,
      mentor: users[mentorIndex],
    });
  } catch (error) {
    console.error("Mentor approval error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// GET /api/admin/mentors/approve - Get pending mentors
export const GET = requireAdmin(async (request) => {
  try {
    const pendingMentors = users.filter(
      (u) => u.role === "mentor" && u.status === "pending"
    );

    // Remove passwords from response
    const safeMentors = pendingMentors.map(({ password, ...mentor }) => mentor);

    return NextResponse.json({
      success: true,
      mentors: safeMentors,
      total: safeMentors.length,
    });
  } catch (error) {
    console.error("Get pending mentors error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





