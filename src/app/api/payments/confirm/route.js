import { NextResponse } from "next/server";
import { requireAuth } from "../middleware/auth";

// Mock payments database
let payments = [
  {
    id: 1,
    userId: 3,
    userName: "John Smith",
    type: "course_payment",
    amount: 299,
    currency: "USD",
    status: "pending",
    paymentMethod: "stripe",
    paymentIntentId: "pi_1234567890",
    courseId: 1,
    courseName: "Web Development Fundamentals",
    description: "Payment for Web Development Fundamentals course",
    createdAt: "2024-01-20T10:00:00Z",
    completedAt: null,
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

// POST /api/payments/confirm - Confirm payment
export const POST = requireAuth(async (request) => {
  try {
    const { paymentIntentId, status = "completed" } = await request.json();

    // Validate required fields
    if (!paymentIntentId) {
      return NextResponse.json(
        { success: false, message: "Payment intent ID is required" },
        { status: 400 }
      );
    }

    // Find payment
    const paymentIndex = payments.findIndex(
      (p) =>
        p.paymentIntentId === paymentIntentId &&
        p.userId === request.user.userId
    );

    if (paymentIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Payment not found" },
        { status: 404 }
      );
    }

    const payment = payments[paymentIndex];

    // Update payment status
    payments[paymentIndex].status = status;
    if (status === "completed") {
      payments[paymentIndex].completedAt = new Date().toISOString();

      // If it's a course payment, enroll the student
      if (payment.type === "course_payment" && payment.courseId) {
        // Check if already enrolled
        const existingEnrollment = enrollments.find(
          (e) =>
            e.studentId === request.user.userId &&
            e.courseId === payment.courseId
        );

        if (!existingEnrollment) {
          // Create enrollment
          const newEnrollment = {
            id: enrollments.length + 1,
            studentId: request.user.userId,
            courseId: payment.courseId,
            enrolledAt: new Date().toISOString(),
            status: "active",
            mentorId:
              courses.find((c) => c.id === payment.courseId)?.mentorId || null,
          };

          enrollments.push(newEnrollment);

          // TODO: Send enrollment confirmation email
          // await sendEnrollmentConfirmation(request.user.userId, payment.courseId);
        }
      }

      // If it's a donation, add to donations
      if (payment.type === "donation") {
        const newDonation = {
          id: donations.length + 1,
          donorId: request.user.userId,
          donorName: payment.userName,
          amount: payment.amount,
          currency: payment.currency,
          message: "Thank you for your support!",
          isAnonymous: false,
          createdAt: new Date().toISOString(),
        };

        donations.push(newDonation);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Payment confirmed successfully",
      payment: payments[paymentIndex],
    });
  } catch (error) {
    console.error("Confirm payment error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





