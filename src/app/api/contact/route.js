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

// GET /api/contact - Get all contact messages (admin only)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let filteredMessages = contactMessages;

    // Filter by status
    if (status) {
      filteredMessages = contactMessages.filter((msg) => msg.status === status);
    }

    return NextResponse.json({
      success: true,
      messages: filteredMessages,
      total: filteredMessages.length,
    });
  } catch (error) {
    console.error("Get contact messages error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/contact - Submit contact message
export async function POST(request) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, subject, and message are required",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Create new contact message
    const newMessage = {
      id: contactMessages.length + 1,
      name,
      email,
      phone: phone || "",
      subject,
      message,
      status: "new",
      submittedAt: new Date().toISOString(),
    };

    contactMessages.push(newMessage);

    return NextResponse.json(
      {
        success: true,
        message: "Contact message submitted successfully",
        contactMessage: newMessage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submit contact message error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}





