import { NextResponse } from "next/server";
import { requireAuth } from "../middleware/auth";

// Mock messages database
let messages = [
  {
    id: 1,
    senderId: 2,
    receiverId: 3,
    senderName: "Dr. Sarah Wilson",
    receiverName: "John Smith",
    message: "Hi John! How are you doing with the React project?",
    messageType: "text", // text, file, image, video
    fileUrl: null,
    isRead: false,
    createdAt: "2024-01-20T10:00:00Z",
  },
  {
    id: 2,
    senderId: 3,
    receiverId: 2,
    senderName: "John Smith",
    receiverName: "Dr. Sarah Wilson",
    message:
      "Hi Dr. Wilson! I'm making good progress. I have a question about useState hook.",
    messageType: "text",
    fileUrl: null,
    isRead: true,
    createdAt: "2024-01-20T10:15:00Z",
  },
];

// GET /api/messages - Get messages for current user
export const GET = requireAuth(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const conversationWith = searchParams.get("conversationWith");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 50;

    const userId = request.user.userId;

    let userMessages = messages.filter(
      (msg) => msg.senderId === userId || msg.receiverId === userId
    );

    // Filter by specific conversation
    if (conversationWith) {
      const conversationId = parseInt(conversationWith);
      userMessages = userMessages.filter(
        (msg) =>
          (msg.senderId === userId && msg.receiverId === conversationId) ||
          (msg.senderId === conversationId && msg.receiverId === userId)
      );
    }

    // Sort by creation date (newest first)
    userMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedMessages = userMessages.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      messages: paginatedMessages,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(userMessages.length / limit),
        totalItems: userMessages.length,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get messages error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// POST /api/messages - Send new message
export const POST = requireAuth(async (request) => {
  try {
    const {
      receiverId,
      message,
      messageType = "text",
      fileUrl = null,
    } = await request.json();

    const senderId = request.user.userId;

    // Validate required fields
    if (!receiverId || !message) {
      return NextResponse.json(
        { success: false, message: "Receiver ID and message are required" },
        { status: 400 }
      );
    }

    // Check if receiver exists
    const receiver = users.find((u) => u.id === parseInt(receiverId));
    if (!receiver) {
      return NextResponse.json(
        { success: false, message: "Receiver not found" },
        { status: 404 }
      );
    }

    // Get sender info
    const sender = users.find((u) => u.id === senderId);
    if (!sender) {
      return NextResponse.json(
        { success: false, message: "Sender not found" },
        { status: 404 }
      );
    }

    // Create new message
    const newMessage = {
      id: messages.length + 1,
      senderId,
      receiverId: parseInt(receiverId),
      senderName: sender.name,
      receiverName: receiver.name,
      message,
      messageType,
      fileUrl,
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    messages.push(newMessage);

    // TODO: Send real-time notification to receiver
    // await sendRealtimeNotification(receiverId, newMessage);

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        newMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Send message error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





