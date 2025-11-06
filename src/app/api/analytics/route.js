import { NextResponse } from "next/server";
import { requireAuth } from "../middleware/auth";

// Mock analytics data
let analytics = {
  overview: {
    totalUsers: 150,
    totalStudents: 120,
    totalMentors: 25,
    totalCourses: 12,
    totalEnrollments: 180,
    totalRevenue: 45000,
    averageCourseRating: 4.6,
    completionRate: 78,
  },
  userGrowth: [
    { month: "2024-01", students: 45, mentors: 8 },
    { month: "2024-02", students: 67, mentors: 12 },
    { month: "2024-03", students: 89, mentors: 18 },
    { month: "2024-04", students: 120, mentors: 25 },
  ],
  courseStats: [
    {
      courseId: 1,
      courseName: "Web Development Fundamentals",
      enrollments: 45,
      completions: 38,
      averageGrade: 87,
      revenue: 13455,
    },
    {
      courseId: 2,
      courseName: "Advanced React Development",
      enrollments: 32,
      completions: 28,
      averageGrade: 91,
      revenue: 15968,
    },
  ],
  mentorPerformance: [
    {
      mentorId: 2,
      mentorName: "Dr. Sarah Wilson",
      totalStudents: 15,
      averageRating: 4.8,
      coursesTaught: 3,
      totalHours: 120,
    },
  ],
  studentEngagement: {
    dailyActiveUsers: 45,
    weeklyActiveUsers: 89,
    monthlyActiveUsers: 120,
    averageSessionDuration: 25, // minutes
    pageViews: 1250,
    bounceRate: 12,
  },
  revenue: {
    monthly: [
      { month: "2024-01", revenue: 8500 },
      { month: "2024-02", revenue: 12000 },
      { month: "2024-03", revenue: 15000 },
      { month: "2024-04", revenue: 18000 },
    ],
    bySource: [
      { source: "Course Payments", amount: 35000, percentage: 78 },
      { source: "Donations", amount: 8500, percentage: 19 },
      { source: "Subscriptions", amount: 1500, percentage: 3 },
    ],
  },
};

// GET /api/analytics - Get analytics data
export const GET = requireAuth(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const period = searchParams.get("period") || "30d";
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const userRole = request.user.role;

    // Only admins can access analytics
    if (userRole !== "admin") {
      return NextResponse.json(
        { success: false, message: "Access denied. Admin only." },
        { status: 403 }
      );
    }

    // Return specific analytics type
    if (type === "overview") {
      return NextResponse.json({
        success: true,
        data: analytics.overview,
      });
    }

    if (type === "user-growth") {
      return NextResponse.json({
        success: true,
        data: analytics.userGrowth,
      });
    }

    if (type === "course-stats") {
      return NextResponse.json({
        success: true,
        data: analytics.courseStats,
      });
    }

    if (type === "mentor-performance") {
      return NextResponse.json({
        success: true,
        data: analytics.mentorPerformance,
      });
    }

    if (type === "student-engagement") {
      return NextResponse.json({
        success: true,
        data: analytics.studentEngagement,
      });
    }

    if (type === "revenue") {
      return NextResponse.json({
        success: true,
        data: analytics.revenue,
      });
    }

    // Return all analytics if no specific type requested
    return NextResponse.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





