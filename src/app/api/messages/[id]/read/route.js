import { NextResponse } from "next/server";
import { requireAuth } from "../../middleware/auth";

// Mock messages database
let messages = [
  {
    id: 1,
    senderId: 2,
    receiverId: 3,
    senderName: "Dr. Sarah Wilson",
    receiverName: "John Smith",
    message: "Hi John! How are you doing with the React project?",
    messageType: "text",
    fileUrl: null,
    isRead: false,
    createdAt: "2024-01-20T10:00:00Z",
  },
];

// PUT /api/messages/[id]/read - Mark message as read
export const PUT = requireAuth(async (request, { params }) => {
  try {
    const messageId = parseInt(params.id);
    const userId = request.user.userId;

    const messageIndex = messages.findIndex((msg) => msg.id === messageId);

    if (messageIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Message not found" },
        { status: 404 }
      );
    }

    const message = messages[messageIndex];

    // Check if user is the receiver
    if (message.receiverId !== userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    // Mark as read
    messages[messageIndex].isRead = true;
    messages[messageIndex].readAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      message: "Message marked as read",
    });
  } catch (error) {
    console.error("Mark message as read error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





