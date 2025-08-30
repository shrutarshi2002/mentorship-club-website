import Image from "next/image";
import Link from "next/link";
import CourseEnrollment from "./CourseEnrollment";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Simplified course data
const courseData = {
  "marketing-branding": {
    title: "Marketing & Branding",
    subtitle:
      "How to shape and promote products, services, or yourself with clarity and creativity.",
    heroImage: "/assets/program/1.png",
    duration: "8 weeks",
    level: "Beginner to Intermediate",
    price: "$299",
    originalPrice: "$399",
    category: "Marketing",
  },
  "ai-fundamentals": {
    title: "AI Fundamentals",
    subtitle:
      "Core AI concepts and understanding how AI is reshaping the world.",
    heroImage: "/assets/program/7.png",
    duration: "10 weeks",
    level: "Beginner",
    price: "$349",
    originalPrice: "$449",
    category: "Technology",
  },
  "public-speaking": {
    title: "Public Speaking",
    subtitle:
      "Building confidence and clarity while communicating in front of others.",
    heroImage: "/assets/program/13.png",
    duration: "6 weeks",
    level: "All Levels",
    price: "$199",
    originalPrice: "$299",
    category: "Communication",
  },
};

// Fallback function for other courses
const generateFallbackCourseData = (courseId) => {
  const programTitles = {
    "social-media-strategy": "Social Media Strategy",
    "content-creation": "Content Creation",
    "digital-advertising": "Digital Advertising",
    "influencer-campaign-marketing": "Influencer & Campaign Marketing",
    "entrepreneurial-marketing": "Entrepreneurial Marketing",
    "prompt-engineering": "Prompt Engineering",
    "no-code-ai-tools": "No-Code AI Tools",
    "mini-chatbot-projects": "Mini Chatbot Projects",
    "python-basics": "Python Basics",
    "ai-in-real-life": "AI in Real Life",
    "pitching-for-entrepreneurs": "Pitching for Entrepreneurs",
    "creative-thinking": "Creative Thinking",
    "interview-impression-skills": "Interview & Impression Skills",
    "networking-conversation": "Networking & Conversation",
    "confidence-presence": "Confidence & Presence",
  };

  const programImages = {
    "social-media-strategy": "/assets/program/2.png",
    "content-creation": "/assets/program/3.png",
    "digital-advertising": "/assets/program/4.png",
    "influencer-campaign-marketing": "/assets/program/5.png",
    "entrepreneurial-marketing": "/assets/program/6.png",
    "prompt-engineering": "/assets/program/8.png",
    "no-code-ai-tools": "/assets/program/9.png",
    "mini-chatbot-projects": "/assets/program/10.png",
    "python-basics": "/assets/program/11.png",
    "ai-in-real-life": "/assets/program/12.png",
    "pitching-for-entrepreneurs": "/assets/program/14.png",
    "creative-thinking": "/assets/program/15.png",
    "interview-impression-skills": "/assets/program/16.png",
    "networking-conversation": "/assets/program/17.png",
    "confidence-presence": "/assets/program/18.png",
  };

  const title = programTitles[courseId] || "Course";
  const image = programImages[courseId] || "/assets/program/1.png";

  return {
    title,
    subtitle: "Learn valuable skills in this comprehensive course.",
    heroImage: image,
    duration: "6-8 weeks",
    level: "Beginner to Intermediate",
    price: "$249",
    originalPrice: "$349",
    category: "Professional Development",
  };
};

export default async function CoursePage({ params }) {
  const courseId = await params.courseId;
  const course = courseData[courseId] || generateFallbackCourseData(courseId);

  return (
    <div className="bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 lg:py-32 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                {course.category}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {course.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {course.subtitle}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-700">{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-700">{course.level}</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <CourseEnrollment course={course} />
            </div>

            <div className="relative">
              <div className="w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={course.heroImage}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Course Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Live Sessions
              </h3>
              <p className="text-gray-600">
                Interactive live sessions with expert instructors
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Certificate
              </h3>
              <p className="text-gray-600">
                Earn a certificate upon completion
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community
              </h3>
              <p className="text-gray-600">Join a community of learners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Generate static params for all course IDs
export async function generateStaticParams() {
  const courseIds = [
    "marketing-branding",
    "social-media-strategy",
    "content-creation",
    "digital-advertising",
    "influencer-campaign-marketing",
    "entrepreneurial-marketing",
    "ai-fundamentals",
    "prompt-engineering",
    "no-code-ai-tools",
    "mini-chatbot-projects",
    "python-basics",
    "ai-in-real-life",
    "public-speaking",
    "pitching-for-entrepreneurs",
    "creative-thinking",
    "interview-impression-skills",
    "networking-conversation",
    "confidence-presence",
  ];

  return courseIds.map((courseId) => ({
    courseId: courseId,
  }));
}
