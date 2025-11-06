import { NextResponse } from "next/server";
import { requireAuth } from "../middleware/auth";

// Mock calendar events database
let events = [
  {
    id: 1,
    title: "Web Development Class",
    description: "Introduction to HTML and CSS",
    type: "class", // class, meeting, assignment_due, exam, event
    startTime: "2024-02-20T16:00:00Z",
    endTime: "2024-02-20T17:30:00Z",
    location: "Online - Zoom",
    courseId: 1,
    courseName: "Web Development Fundamentals",
    mentorId: 2,
    mentorName: "Dr. Sarah Wilson",
    studentIds: [3], // Array of student IDs
    isRecurring: false,
    recurrencePattern: null, // daily, weekly, monthly
    createdAt: "2024-01-20T10:00:00Z",
    createdBy: 2,
  },
  {
    id: 2,
    title: "Portfolio Assignment Due",
    description: "Submit your portfolio website project",
    type: "assignment_due",
    startTime: "2024-02-15T23:59:59Z",
    endTime: "2024-02-15T23:59:59Z",
    location: "Online",
    courseId: 1,
    courseName: "Web Development Fundamentals",
    mentorId: 2,
    mentorName: "Dr. Sarah Wilson",
    studentIds: [3],
    isRecurring: false,
    recurrencePattern: null,
    createdAt: "2024-01-20T10:00:00Z",
    createdBy: 2,
  },
  {
    id: 3,
    title: "Mentor Meeting",
    description: "One-on-one session with John Smith",
    type: "meeting",
    startTime: "2024-02-22T14:00:00Z",
    endTime: "2024-02-22T15:00:00Z",
    location: "Online - Google Meet",
    courseId: null,
    courseName: null,
    mentorId: 2,
    mentorName: "Dr. Sarah Wilson",
    studentIds: [3],
    isRecurring: false,
    recurrencePattern: null,
    createdAt: "2024-01-22T10:00:00Z",
    createdBy: 2,
  },
];

// GET /api/calendar - Get calendar events
export const GET = requireAuth(async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const type = searchParams.get("type");
    const courseId = searchParams.get("courseId");
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 50;

    const userId = request.user.userId;
    const userRole = request.user.role;

    let filteredEvents = events;

    // Filter based on user role
    if (userRole === "student") {
      filteredEvents = events.filter((event) =>
        event.studentIds.includes(userId)
      );
    } else if (userRole === "mentor") {
      filteredEvents = events.filter((event) => event.mentorId === userId);
    }
    // Admin can see all events

    // Filter by date range
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredEvents = filteredEvents.filter((event) => {
        const eventStart = new Date(event.startTime);
        return eventStart >= start && eventStart <= end;
      });
    }

    // Filter by type
    if (type) {
      filteredEvents = filteredEvents.filter((event) => event.type === type);
    }

    // Filter by course
    if (courseId) {
      filteredEvents = filteredEvents.filter(
        (event) => event.courseId === parseInt(courseId)
      );
    }

    // Sort by start time
    filteredEvents.sort(
      (a, b) => new Date(a.startTime) - new Date(b.startTime)
    );

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      events: paginatedEvents,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredEvents.length / limit),
        totalItems: filteredEvents.length,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Get calendar events error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});

// POST /api/calendar - Create calendar event
export const POST = requireAuth(async (request) => {
  try {
    const userRole = request.user.role;
    if (userRole !== "mentor" && userRole !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Only mentors and admins can create events",
        },
        { status: 403 }
      );
    }

    const eventData = await request.json();
    const {
      title,
      description,
      type,
      startTime,
      endTime,
      location,
      courseId,
      studentIds,
      isRecurring = false,
      recurrencePattern = null,
    } = eventData;

    // Validate required fields
    if (!title || !startTime || !endTime) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, start time, and end time are required",
        },
        { status: 400 }
      );
    }

    // Validate date range
    if (new Date(startTime) >= new Date(endTime)) {
      return NextResponse.json(
        { success: false, message: "End time must be after start time" },
        { status: 400 }
      );
    }

    // Get creator info
    const creator = users.find((u) => u.id === request.user.userId);
    if (!creator) {
      return NextResponse.json(
        { success: false, message: "Creator not found" },
        { status: 404 }
      );
    }

    // Get course info if provided
    let courseName = null;
    if (courseId) {
      const course = courses.find((c) => c.id === courseId);
      if (!course) {
        return NextResponse.json(
          { success: false, message: "Course not found" },
          { status: 404 }
        );
      }
      courseName = course.title;
    }

    // Create new event
    const newEvent = {
      id: events.length + 1,
      title,
      description: description || "",
      type: type || "event",
      startTime,
      endTime,
      location: location || "Online",
      courseId: courseId || null,
      courseName,
      mentorId: request.user.userId,
      mentorName: creator.name,
      studentIds: studentIds || [],
      isRecurring,
      recurrencePattern,
      createdAt: new Date().toISOString(),
      createdBy: request.user.userId,
    };

    events.push(newEvent);

    // TODO: Send notifications to students about new event

    return NextResponse.json(
      {
        success: true,
        message: "Event created successfully",
        event: newEvent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create event error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
});





