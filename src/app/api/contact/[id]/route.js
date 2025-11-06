import { NextResponse } from "next/server";

// Mock contact messages database - in production, use a real database
let contactMessages = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1-555-0789",
    subject: "Course Inquiry",
    message:
      "I'm interested in learning more about your web development courses.",
    status: "new",
    submittedAt: "2024-01-17T10:00:00Z",
  },
];

// GET /api/contact/[id] - Get single contact message
export async function GET(request, { params }) {
  try {
    const messageId = parseInt(params.id);
    const message = contactMessages.find((m) => m.id === messageId);

    if (!message) {
      return NextResponse.json(
        { success: false, message: "Contact message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Get contact message error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/contact/[id] - Update contact message status
export async function PUT(request, { params }) {
  try {
    const messageId = parseInt(params.id);
    const { status, adminResponse } = await request.json();

    // Validate status
    const validStatuses = ["new", "read", "replied", "closed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid status. Must be new, read, replied, or closed",
        },
        { status: 400 }
      );
    }

    const messageIndex = contactMessages.findIndex((m) => m.id === messageId);

    if (messageIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Contact message not found" },
        { status: 404 }
      );
    }

    // Update message status
    contactMessages[messageIndex].status = status;
    contactMessages[messageIndex].updatedAt = new Date().toISOString();

    if (adminResponse) {
      contactMessages[messageIndex].adminResponse = adminResponse;
    }

    return NextResponse.json({
      success: true,
      message: "Contact message updated successfully",
      contactMessage: contactMessages[messageIndex],
    });
  } catch (error) {
    console.error("Update contact message error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/contact/[id] - Delete contact message
export async function DELETE(request, { params }) {
  try {
    const messageId = parseInt(params.id);
    const messageIndex = contactMessages.findIndex((m) => m.id === messageId);

    if (messageIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Contact message not found" },
        { status: 404 }
      );
    }

    // Remove message
    contactMessages.splice(messageIndex, 1);

    return NextResponse.json({
      success: true,
      message: "Contact message deleted successfully",
    });
  } catch (error) {
    console.error("Delete contact message error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}





