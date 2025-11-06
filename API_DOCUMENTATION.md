# LMS Backend API Documentation

## Overview

This is a comprehensive Learning Management System (LMS) backend built with Next.js API Routes. The system supports three user roles: Admin, Mentor, and Student, with role-based access control and full CRUD operations.

## Base URL

```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

## User Roles

- **Admin**: Full system access, can manage all users, courses, and content
- **Mentor**: Can manage assigned students, create courses, grade assignments
- **Student**: Can enroll in courses, submit assignments, view grades

---

## Authentication Endpoints

### POST /api/auth/enhanced-login

Enhanced login with role-based access and security features.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "rememberMe": false
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "role": "student",
    "isActive": true
  },
  "token": "jwt_token_here"
}
```

### POST /api/auth/enhanced-register

Register new users with role-specific validation.

**Request Body (Student):**

```json
{
  "role": "student",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "age": 16,
  "grade": "10th",
  "school": "Example High School",
  "interestedCourses": ["Web Development", "Data Science"]
}
```

**Request Body (Mentor):**

```json
{
  "role": "mentor",
  "name": "Dr. Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "phone": "+1-555-0123",
  "expertise": ["Web Development", "React"],
  "experience": "5+ years",
  "education": "PhD in Computer Science",
  "motivation": "I want to help students learn",
  "availability": "Weekends and evenings"
}
```

---

## Admin Endpoints

### GET /api/admin/users

Get all users with filtering and pagination.

**Query Parameters:**

- `role`: Filter by user role
- `status`: Filter by status (for mentors)
- `search`: Search by name or email
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### PUT /api/admin/mentors/approve

Approve or reject mentor applications.

**Request Body:**

```json
{
  "mentorId": 2,
  "action": "approve",
  "adminNotes": "Great qualifications!"
}
```

### GET /api/admin/courses

Get all courses with filtering.

**Query Parameters:**

- `category`: Filter by category
- `ageGroup`: Filter by age group
- `difficulty`: Filter by difficulty
- `isPublished`: Filter by published status
- `search`: Search by title or description

### POST /api/admin/courses

Create new course.

**Request Body:**

```json
{
  "title": "Web Development Fundamentals",
  "description": "Learn HTML, CSS, and JavaScript",
  "category": "programming",
  "ageGroup": "14-18",
  "difficulty": "beginner",
  "mentorId": 2,
  "syllabus": "Introduction to HTML, CSS Basics...",
  "schedule": "Tuesdays & Thursdays, 4:00 PM - 5:30 PM",
  "maxStudents": 20,
  "price": 299
}
```

---

## Course Management

### GET /api/courses

Get all published courses with filtering.

**Query Parameters:**

- `category`: Filter by category
- `level`: Filter by difficulty level
- `search`: Search by title or description

### GET /api/courses/[id]

Get single course details.

### PUT /api/courses/[id]

Update course (admin/mentor only).

### DELETE /api/courses/[id]

Delete course (admin only).

---

## Assignment System

### GET /api/assignments

Get assignments for current user.

**Query Parameters:**

- `courseId`: Filter by course
- `type`: Filter by assignment type
- `status`: Filter by submission status

### POST /api/assignments

Create new assignment (mentors only).

**Request Body:**

```json
{
  "courseId": 1,
  "title": "Build a Portfolio Website",
  "description": "Create a responsive portfolio website",
  "instructions": "Include: Home page, About page, Projects page",
  "dueDate": "2024-02-15T23:59:59Z",
  "maxPoints": 100,
  "assignmentType": "project"
}
```

### POST /api/assignments/submit

Submit assignment (students only).

**Request Body:**

```json
{
  "assignmentId": 1,
  "submissionText": "I've completed the portfolio website...",
  "attachments": [
    {
      "name": "portfolio.zip",
      "url": "/uploads/submissions/portfolio.zip",
      "type": "zip"
    }
  ]
}
```

---

## Grading System

### GET /api/grades

Get grades for current user.

**Query Parameters:**

- `courseId`: Filter by course
- `studentId`: Filter by student (mentors/admins)

### POST /api/grades

Grade an assignment (mentors/admins only).

**Request Body:**

```json
{
  "submissionId": 1,
  "grade": 85,
  "feedback": "Great work! Consider adding more interactive elements.",
  "isVisibleToStudent": true
}
```

---

## Messaging System

### GET /api/messages

Get messages for current user.

**Query Parameters:**

- `conversationWith`: Filter by specific user
- `page`: Page number
- `limit`: Items per page

### POST /api/messages

Send new message.

**Request Body:**

```json
{
  "receiverId": 2,
  "message": "Hi! I have a question about the assignment.",
  "messageType": "text",
  "fileUrl": null
}
```

### PUT /api/messages/[id]/read

Mark message as read.

---

## Progress Tracking

### GET /api/progress

Get progress for current user.

**Query Parameters:**

- `courseId`: Filter by course
- `studentId`: Filter by student (mentors/admins)

### POST /api/progress

Update progress (internal use).

---

## Payment System

### GET /api/payments

Get payments for current user.

**Query Parameters:**

- `type`: Filter by payment type
- `status`: Filter by payment status

### POST /api/payments

Create payment intent.

**Request Body:**

```json
{
  "type": "course_payment",
  "amount": 299,
  "currency": "USD",
  "courseId": 1,
  "description": "Payment for Web Development course"
}
```

### POST /api/payments/confirm

Confirm payment.

**Request Body:**

```json
{
  "paymentIntentId": "pi_1234567890",
  "status": "completed"
}
```

---

## Internship System

### GET /api/internships

Get internships.

**Query Parameters:**

- `status`: Filter by status
- `mentorId`: Filter by mentor

### POST /api/internships

Create internship (mentors only).

**Request Body:**

```json
{
  "title": "Frontend Developer Intern",
  "company": "Tech Solutions Inc.",
  "description": "Work on React-based web applications",
  "requirements": ["HTML/CSS", "JavaScript", "React basics"],
  "duration": "3 months",
  "startDate": "2024-03-01",
  "endDate": "2024-05-31",
  "location": "Remote",
  "stipend": 500
}
```

---

## Calendar System

### GET /api/calendar

Get calendar events.

**Query Parameters:**

- `startDate`: Start date filter
- `endDate`: End date filter
- `type`: Filter by event type
- `courseId`: Filter by course

### POST /api/calendar

Create calendar event (mentors/admins only).

**Request Body:**

```json
{
  "title": "Web Development Class",
  "description": "Introduction to HTML and CSS",
  "type": "class",
  "startTime": "2024-02-20T16:00:00Z",
  "endTime": "2024-02-20T17:30:00Z",
  "location": "Online - Zoom",
  "courseId": 1,
  "studentIds": [3]
}
```

---

## File Upload

### POST /api/upload

Upload file.

**Form Data:**

- `file`: File to upload
- `category`: File category (assignment_submission, course_material, profile_image, resume)
- `relatedId`: Related entity ID
- `isPublic`: Whether file is public

### GET /api/upload

Get uploaded files.

**Query Parameters:**

- `category`: Filter by category
- `relatedId`: Filter by related ID

---

## Analytics

### GET /api/analytics

Get analytics data (admin only).

**Query Parameters:**

- `type`: Analytics type (overview, user-growth, course-stats, mentor-performance, student-engagement, revenue)

---

## Enrollments

### GET /api/enrollments

Get enrollments.

**Query Parameters:**

- `studentId`: Filter by student
- `courseId`: Filter by course
- `status`: Filter by status

### POST /api/enrollments

Enroll in course (students only).

**Request Body:**

```json
{
  "courseId": 1
}
```

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"] // Optional
}
```

## Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `422`: Validation Error
- `429`: Too Many Requests
- `500`: Internal Server Error

## Rate Limiting

- Login attempts: 5 per 15 minutes per IP
- General API: 100 requests per 15 minutes per user
- File uploads: 10 per hour per user

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- Rate limiting
- CORS protection
- Helmet security headers

## Database

Currently uses in-memory mock databases. In production, replace with:

- PostgreSQL for main data
- Redis for caching and sessions
- AWS S3 for file storage
- MongoDB for analytics data

## Environment Variables

```env
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_S3_BUCKET=...
```





