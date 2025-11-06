import { NextResponse } from "next/server";
import { requireAuth } from "../middleware/auth";

// Mock payments database
let payments = [
  {
    id: 1,
    userId: 3,
    userName: "John Smith",
    type: "course_payment", // course_payment, donation, subscription
    amount: 299,
    currency: "USD",
    status: "completed", // pending, completed, failed, refunded
    paymentMethod: "stripe",
    paymentIntentId: "pi_1234567890",
    courseId: 1,
    courseName: "Web Development Fundamentals",
    description: "Payment for Web Development Fundamentals course",
    createdAt: "2024-01-20T10:00:00Z",
    completedAt: "2024-01-20T10:05:00Z",
  },
  {
    id: 2,
    userId: 3,
    userName: "John Smith",
    type: "donation",
    amount: 50,
    currency: "USD",
    status: "completed",
    paymentMethod: "paypal",
    paymentIntentId: "paypal_1234567890",
    courseId: null,
    courseName: null,
    description: "Donation to support the platform",
    createdAt: "2024-01-25T14:30:00Z",
    completedAt: "2024-01-25T14:32:00Z",
  },
];

// Mock donations database
let donations = [
  {
    id: 1,
    donorId: 3,
    donorName: "John Smith",
    amount: 50,
    currency: "USD",
    message: "Keep up the great work!",
    isAnonymous: false,
    createdAt: "2024-01-25T14:30:00Z",
  },
];

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
    status: "approved",
    isActive: true,
  },
  {
    id: 3,
    email: "student@example.com",
    name: "John Smith",
    role: "student",
    isActive: true,
  },
];

// Mock courses database
let courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript",
    price: 299,
    mentorId: 2,
    isPublished: true,
  },
];

// Mock enrollments database
let enrollments = [
  {
    id: 1,
    studentId: 3,
    courseId: 1,
    enrolledAt: "2024-01-20T10:00:00Z",
    status: "active",
    mentorId: 2,
  },
];

// GET /api/payments - Get payments for current user
export const GET = requireAuth(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;

    const userId = request.user.userId;
    const userRole = request.user.role;

    let filteredPayments = payments;

    // Filter by user (students can only see their own payments)
    if (userRole === "student") {
      filteredPayments = payments.filter(
        (payment) => payment.userId === userId
      );
    }

    // Filter by type
    if (type) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.type === type
      );
    }

    // Filter by status
    if (status) {
      filteredPayments = filteredPayments.filter(
        (payment) => payment.status === status
      );
    }

    // Sort by creation date (newest first)
    filteredPayments.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPayments = filteredPayments.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      payments: paginatedPayments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredPayments.length / limit),
        totalItems: filteredPayments.length,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get payments error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// POST /api/payments - Create payment intent
export const POST = requireAuth(async (request) => {
  try {
    const {
      type,
      amount,
      currency = "USD",
      courseId,
      description,
    } = await request.json();

    // Validate required fields
    if (!type || !amount) {
      return NextResponse.json(
        { success: false, message: "Type and amount are required" },
        { status: 400 }
      );
    }

    // Validate amount
    if (amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Amount must be greater than 0" },
        { status: 400 }
      );
    }

    // Get user info
    const user = users.find((u) => u.id === request.user.userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // For course payments, validate course exists
    if (type === "course_payment" && courseId) {
      const course = courses.find((c) => c.id === courseId);
      if (!course) {
        return NextResponse.json(
          { success: false, message: "Course not found" },
          { status: 404 }
        );
      }

      // Check if user is already enrolled
      const existingEnrollment = enrollments.find(
        (e) => e.studentId === request.user.userId && e.courseId === courseId
      );
      if (existingEnrollment) {
        return NextResponse.json(
          { success: false, message: "Already enrolled in this course" },
          { status: 409 }
        );
      }
    }

    // Create payment record
    const newPayment = {
      id: payments.length + 1,
      userId: request.user.userId,
      userName: user.name,
      type,
      amount: parseFloat(amount),
      currency,
      status: "pending",
      paymentMethod: "stripe", // Default to Stripe
      paymentIntentId: `pi_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      courseId: courseId || null,
      courseName: courseId
        ? courses.find((c) => c.id === courseId)?.title
        : null,
      description: description || `${type.replace("_", " ")} payment`,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    payments.push(newPayment);

    // TODO: Create actual payment intent with Stripe
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(amount * 100), // Convert to cents
    //   currency: currency.toLowerCase(),
    //   metadata: {
    //     userId: request.user.userId,
    //     type,
    //     courseId: courseId || null,
    //   },
    // });

    return NextResponse.json({
      success: true,
      message: "Payment intent created successfully",
      payment: newPayment,
      clientSecret: "pi_mock_client_secret", // Replace with actual client secret
    });
  } catch (error) {
    console.error("Create payment error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





