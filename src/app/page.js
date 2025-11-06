"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Learn Real-World Skills with Interactive Workshops",
    subtitle:
      "Live and self-paced workshops designed for students in grades 6–12. Explore topics like coding, design, public speaking, AI, and more.",
    cta: "Browse All Workshops",
    secondaryCta: "Book a Free Demo",
    gradient: "from-white to-gray-50",
    bgImage: "none",
    image: "/assets/hero/img1.png",
  },
  {
    id: 2,
    title: "Empowering Future Leaders",
    subtitle: "Beyond the Classroom",
    cta: "Become a Mentor",
    secondaryCta: "Become a Mentee",
    gradient: "from-white to-gray-50",
    bgImage: "none",
    image: "/assets/hero/img2.png",
  },
  {
    id: 3,
    title: "Not Just Exams—We Teach Life",
    subtitle: "Real Skills. Real Purpose.",
    cta: "Explore Programs",
    gradient: "from-white to-gray-50",
    bgImage: "none",
    image: "/assets/hero/img3.png",
  },
  {
    id: 4,
    title: "Clarity. Confidence.",
    subtitle: "A Future They Can Own.",
    cta: "Learn More",
    gradient: "from-white to-gray-50",
    bgImage: "none",
    image: "/assets/hero/img1.png",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoFormData, setDemoFormData] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "",
    interests: [],
    preferredTime: "",
    message: "",
  });
  const [openFAQ, setOpenFAQ] = useState(null);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }
  }, [isTransitioning]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }
  }, [isTransitioning]);

  const goToSlide = useCallback(
    (index) => {
      if (!isTransitioning && index !== currentSlide) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSlide(index);
          setIsTransitioning(false);
        }, 300);
      }
    },
    [isTransitioning, currentSlide]
  );

  const callback = useCallback(() => {
    // logic
  }, []);

  const handleDemoFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setDemoFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((item) => item !== value),
      }));
    } else {
      setDemoFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDemoFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare email data
    const emailData = {
      to: "mentorshipclubfl@gmail.com",
      subject: "New Demo Class Request - " + demoFormData.name,
      body: `
New Demo Class Request

Name: ${demoFormData.name}
Email: ${demoFormData.email}
Phone: ${demoFormData.phone || "Not provided"}
Grade Level: ${demoFormData.grade}
Areas of Interest: ${demoFormData.interests.join(", ")}
Preferred Time: ${demoFormData.preferredTime || "Not specified"}

Additional Message:
${demoFormData.message || "No additional message"}

---
This request was sent from the Mentorship Club demo class form.
      `.trim(),
    };

    // Create mailto link
    const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(
      emailData.subject
    )}&body=${encodeURIComponent(emailData.body)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    alert(
      "Your demo class request has been prepared for email. Your default email client should open with a pre-filled email to mentorshipclubfl@gmail.com. Please send the email to complete your request."
    );

    // Close modal and reset form
    setIsDemoModalOpen(false);
    setDemoFormData({
      name: "",
      email: "",
      phone: "",
      grade: "",
      interests: [],
      preferredTime: "",
      message: "",
    });
  };

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-3">
                <Image
                  src="/assets/logo.png"
                  alt="MentorshipClub Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <h1 className="text-2xl font-bold">
                  <span className="text-yellow-500">Mentorship</span>
                  <span className="text-black">Club</span>
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/programs"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Programs
                </Link>
                <Link
                  href="/mentors"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Mentors
                </Link>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Contact
                </Link>

                {/* Authentication Buttons */}
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:text-red-600"
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <Image
                  src="/assets/logo.png"
                  alt="MentorshipClub Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
                <h1 className="text-xl font-bold">
                  <span className="text-yellow-500">Mentorship</span>
                  <span className="text-black">Club</span>
                </h1>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <nav className="mt-4">
              <div className="px-4 space-y-2">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/programs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Programs
                </Link>
                <Link
                  href="/mentors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Mentors
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Contact
                </Link>

                {/* Authentication Buttons */}
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors text-center font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Hero Slider */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 slide-transition ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
            style={{
              background:
                slide.gradient === "from-white to-gray-50"
                  ? "linear-gradient(135deg, #ffffff, #f9fafb)"
                  : `linear-gradient(135deg, ${slide.gradient
                      .split(" ")
                      .map((color) => {
                        const colorMap = {
                          "from-blue-600": "#2563eb",
                          "via-purple-600": "#9333ea",
                          "to-indigo-700": "#4338ca",
                          "from-pink-500": "#ec4899",
                          "via-red-500": "#ef4444",
                          "to-yellow-500": "#eab308",
                          "from-cyan-400": "#22d3ee",
                          "via-blue-500": "#3b82f6",
                          "to-teal-500": "#14b8a6",
                        };
                        return colorMap[color] || color;
                      })
                      .join(", ")})`,
              backgroundImage:
                slide.bgImage === "none" ? "none" : slide.bgImage,
            }}
          >
            <div className="absolute inset-0 bg-transparent"></div>

            {/* Content */}
            <div className="relative h-full flex items-center pt-24 lg:pt-0">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-20 sm:pb-12 lg:py-0">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Left Side - Content */}
                  <div className="text-gray-900 order-2 lg:order-1">
                    <div
                      className={`animate-fade-in-up ${
                        index === currentSlide ? "animate-fade-in-up" : ""
                      }`}
                    >
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                        {slide.title}
                      </h2>
                    </div>

                    <div
                      className={`animate-fade-in-up delay-200 ${
                        index === currentSlide ? "animate-fade-in-up" : ""
                      }`}
                    >
                      <p
                        className={`font-medium mb-6 sm:mb-8 text-gray-700 ${
                          slide.id === 1
                            ? "text-base sm:text-lg md:text-xl lg:text-2xl"
                            : "text-lg sm:text-xl md:text-2xl lg:text-3xl"
                        }`}
                      >
                        {slide.subtitle}
                      </p>
                    </div>

                    <div
                      className={`animate-fade-in-up delay-400 ${
                        index === currentSlide ? "animate-fade-in-up" : ""
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        {slide.id === 2 ? (
                          <Link
                            href="/mentor-application"
                            className="bg-yellow-400 text-black border-2 border-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide text-center"
                          >
                            {slide.cta}
                          </Link>
                        ) : slide.id === 3 ? (
                          <Link
                            href="/programs"
                            className="bg-yellow-400 text-black border-2 border-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide text-center"
                          >
                            {slide.cta}
                          </Link>
                        ) : (
                          <button className="bg-yellow-400 text-black border-2 border-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide">
                            {slide.cta}
                          </button>
                        )}
                        {slide.secondaryCta &&
                          (slide.secondaryCta === "Become a Mentee" ? (
                            <Link
                              href="/mentee-application"
                              className="bg-transparent text-black border-2 border-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-yellow-400 hover:text-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide inline-block"
                            >
                              {slide.secondaryCta}
                            </Link>
                          ) : (
                            <button
                              onClick={() => setIsDemoModalOpen(true)}
                              className="bg-transparent text-black border-2 border-black px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold hover:bg-yellow-400 hover:text-black transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide"
                            >
                              {slide.secondaryCta}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Image */}
                  {slide.image && (
                    <div className="block order-1 lg:order-2">
                      <div className="relative">
                        <div
                          className={`w-full rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ${
                            slide.id === 1
                              ? "h-[200px] sm:h-[400px] md:h-[500px] lg:h-[800px]"
                              : "h-[300px] sm:h-[400px] md:h-[500px] lg:h-[800px]"
                          }`}
                        >
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            className={`w-full h-full ${
                              slide.id === 1
                                ? "object-contain object-center"
                                : "object-contain object-center"
                            }`}
                            loading="eager"
                            width={800}
                            height={800}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 border-2 ${
                index === currentSlide
                  ? "bg-red-600 border-red-600 scale-125 shadow-lg"
                  : "bg-white/80 border-gray-300 hover:bg-red-400 hover:border-red-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Why Mentorship Club? */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Mentorship Club?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We go beyond traditional education to provide real-world skills,
              personal development, and lasting connections.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Expert Guidance
              </h3>
              <p className="text-gray-600">
                Learn from industry professionals and experienced mentors who
                have walked the path you&apos;re on.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Community Support
              </h3>
              <p className="text-gray-600">
                Join a network of like-minded individuals who support and
                encourage each other&apos;s growth.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 7 9-7M3 17l9-7 9 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Real-World Projects
              </h3>
              <p className="text-gray-600">
                Gain hands-on experience by working on projects that matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Our Programs Overview
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore high-impact tracks designed to build real skills across
              marketing, AI, and personal growth.
            </p>
          </div>

          {(() => {
            const programs = [
              {
                id: "marketing-branding",
                title: "Marketing & Branding",
                desc: "How to shape and promote products, services, or yourself with clarity and creativity.",
                image: "/assets/program/1.png",
              },
              {
                id: "social-media-strategy",
                title: "Social Media Strategy",
                desc: "Understanding how platforms work and how to build an impactful online presence.",
                image: "/assets/program/2.png",
              },
              {
                id: "content-creation",
                title: "Content Creation",
                desc: "Using design, video, and storytelling tools to create engaging content.",
                image: "/assets/program/3.png",
              },
              {
                id: "digital-advertising",
                title: "Digital Advertising",
                desc: "Basics of running ad campaigns and reaching the right audience.",
                image: "/assets/program/4.png",
              },
              {
                id: "influencer-campaign-marketing",
                title: "Influencer & Campaign Marketing",
                desc: "Planning and executing influencer strategies and brand partnerships.",
                image: "/assets/program/5.png",
              },
              {
                id: "entrepreneurial-marketing",
                title: "Entrepreneurial Marketing",
                desc: "Turning ideas into offers, building funnels, and pitching with purpose.",
                image: "/assets/program/6.png",
              },
              {
                id: "ai-fundamentals",
                title: "AI Fundamentals",
                desc: "Core AI concepts and understanding how AI is reshaping the world.",
                image: "/assets/program/7.png",
              },
              {
                id: "prompt-engineering",
                title: "Prompt Engineering",
                desc: "Using tools like ChatGPT for writing, thinking, and creativity.",
                image: "/assets/program/8.png",
              },
              {
                id: "no-code-ai-tools",
                title: "No-Code AI Tools",
                desc: "Creating simple apps or automations using visual platforms.",
                image: "/assets/program/9.png",
              },
              {
                id: "mini-chatbot-projects",
                title: "Mini Chatbot Projects",
                desc: "Designing basic interactive bots that can assist or guide.",
                image: "/assets/program/10.png",
              },
              {
                id: "python-basics",
                title: "Python Basics",
                desc: "Learning foundational programming skills through simple projects.",
                image: "/assets/program/11.png",
              },
              {
                id: "ai-in-real-life",
                title: "AI in Real Life",
                desc: "Exploring how AI is applied in fields like health, art, business, and more.",
                image: "/assets/program/12.png",
              },
              {
                id: "public-speaking",
                title: "Public Speaking",
                desc: "Building confidence and clarity while communicating in front of others.",
                image: "/assets/program/13.png",
              },
              {
                id: "pitching-for-entrepreneurs",
                title: "Pitching for Entrepreneurs",
                desc: "Creating strong, clear pitches for projects, businesses, or ideas.",
                image: "/assets/program/14.png",
              },
              {
                id: "creative-thinking",
                title: "Creative Thinking",
                desc: "Practicing innovation, brainstorming, and idea development.",
                image: "/assets/program/15.png",
              },
              {
                id: "interview-impression-skills",
                title: "Interview & Impression Skills",
                desc: "Preparing to present yourself with clarity, confidence, and professionalism.",
                image: "/assets/program/16.png",
              },
              {
                id: "networking-conversation",
                title: "Networking & Conversation",
                desc: "Strengthening real-world social interaction and connection skills.",
                image: "/assets/program/17.png",
              },
              {
                id: "confidence-presence",
                title: "Confidence & Presence",
                desc: "Improving mindset, self-belief, and personal presence.",
                image: "/assets/program/18.png",
              },
            ];

            return (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {programs.map((p, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                  >
                    {/* Program Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="p-6">
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
                          <span className="block h-2 w-2 rounded-full bg-green-500"></span>
                          Program
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {p.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                    <div className="px-6 pb-6">
                      <Link
                        href={`/courses/${p.id}`}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:border-gray-300 hover:bg-gray-50 transition-colors block text-center"
                      >
                        View Program
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

          <div className="mt-10 text-center">
            <Link
              href="/programs"
              className="inline-block rounded-xl bg-gray-900 text-white px-6 py-3 font-semibold hover:bg-black/90 transition-colors"
            >
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Members Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Hear what our members have
              to say about their experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">JD</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    John Doe
                  </h3>
                  <p className="text-gray-600">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700">
                &quot;Being a part of the Mentorship Club has been a game
                changer for my career. The guidance and support I&apos;ve
                received are invaluable.&quot;
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">JS</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Jane Smith
                  </h3>
                  <p className="text-gray-600">Product Manager</p>
                </div>
              </div>
              <p className="text-gray-700">
                &quot;The Mentorship Club connected me with an amazing mentor
                who helped me navigate my career path. I highly recommend this
                to anyone looking to grow professionally.&quot;
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">MJ</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Mike Johnson
                  </h3>
                  <p className="text-gray-600">UX Designer</p>
                </div>
              </div>
              <p className="text-gray-700">
                &quot;I joined the Mentorship Club looking for guidance, and I
                got so much more. The community is supportive, and the
                mentorship is top-notch.&quot;
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">ED</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Emily Davis
                  </h3>
                  <p className="text-gray-600">Data Scientist</p>
                </div>
              </div>
              <p className="text-gray-700">
                &quot;The best decision I ever made for my career was joining
                the Mentorship Club. The skills and connections I&apos;ve gained
                are priceless.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the Mentorship Club today and take the first step towards a
              brighter, more successful future.
            </p>
            <div className="flex justify-center">
              <Link
                href="/signup"
                className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide"
              >
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-red-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about joining our mentorship programs
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {/* FAQ Item 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 1 ? null : 1)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q1. Who can join as a mentee?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 1 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 1 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      Anyone from middle school, high school, or college, as
                      well as individuals and business owners, can join our
                      programs. We welcome all who are eager to gain practical
                      skills and personal or professional growth beyond what
                      schools or colleges usually offer.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 2 ? null : 2)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q2. What age groups are allowed?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 2 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 2 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      We start from middle schoolers around 11 years old, but
                      there is no upper age limit. Young professionals,
                      entrepreneurs, and individuals looking to reskill or
                      upskill are also encouraged to participate.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 3 ? null : 3)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q3. Do I need to be a student to join?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 3 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 3 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      No. While many of our mentees are students, this platform
                      is equally open to entrepreneurs, professionals, and
                      anyone who wants to learn new skills or explore fresh
                      career opportunities.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 4 ? null : 4)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q4. Can working professionals or entrepreneurs join?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 4 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 4 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      Yes, definitely. We have customized workshops and
                      mentorship tracks that focus on business growth,
                      marketing, finance, and leadership to support individuals
                      already running or starting a business.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q5. What skills or courses are available?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our skill areas include communication, public speaking,
                  leadership, entrepreneurship, marketing, coding, financial
                  literacy, creativity, design, and problem-solving. We keep
                  expanding the topics to stay relevant to modern needs.
                </p>
              </div>

              {/* FAQ Item 6 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q6. How are sessions conducted?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  All sessions are held online to ensure accessibility for
                  everyone. They may be in workshop format (interactive group
                  learning), one-to-one sessions (personal guidance), or even
                  collaborative projects.
                </p>
              </div>

              {/* FAQ Item 7 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q7. What is the difference between workshops and one-to-one
                  mentoring?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Workshops are topic-based sessions attended by many learners
                  together, while one-to-one mentoring is personalized to your
                  unique challenges and goals. Both formats complement each
                  other depending on your needs.
                </p>
              </div>

              {/* FAQ Item 8 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q8. Do I need prior experience?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  No prior knowledge is necessary. Our programs are designed to
                  start from basics and gradually build up to advanced concepts,
                  so even beginners can benefit fully.
                </p>
              </div>

              {/* FAQ Item 9 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q9. Can I choose my own mentor?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  You can suggest preferences, but final matching is done by our
                  team based on your profile and the mentor&apos;s expertise.
                  This ensures you get the right fit for your goals.
                </p>
              </div>

              {/* FAQ Item 10 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q10. How long do programs last?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Short workshops may run 1–3 hours, while structured mentorship
                  programs may extend for weeks or even months. The duration
                  depends on your chosen track.
                </p>
              </div>

              {/* FAQ Item 11 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q11. Will I get a certificate?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, mentees receive certificates of participation or
                  completion, which can be added to resumes, portfolios, or
                  LinkedIn profiles to showcase your new skills.
                </p>
              </div>

              {/* FAQ Item 12 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q12. Is there a cost?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Our mentorship initiative is primarily free as we are an NGO.
                  However, some advanced or specialized programs may require a
                  minimal fee to cover resources.
                </p>
              </div>

              {/* FAQ Item 13 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q13. Can I switch courses or mentors?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes. If a course isn&apos;t the right fit or you feel better
                  guidance is needed, you can request a change. We value
                  flexibility to suit your learning journey.
                </p>
              </div>

              {/* FAQ Item 14 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q14. What if I don&apos;t know what skill to focus on?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  That&apos;s normal. We provide guidance through assessments
                  and conversations to help identify your strengths, interests,
                  and most suitable courses.
                </p>
              </div>

              {/* FAQ Item 15 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q15. Can this help me academically?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes. Although designed for practical learning, mentees often
                  notice better performance in studies thanks to improved
                  confidence, focus, and problem-solving.
                </p>
              </div>

              {/* FAQ Item 16 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q16. Are there business-focused programs?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, we support entrepreneurs with mentoring on branding,
                  digital presence, marketing, scaling, financial management,
                  and leadership.
                </p>
              </div>

              {/* FAQ Item 17 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q17. Can I get internships?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes. Many mentors from professional backgrounds also offer
                  internships. These opportunities are managed separately to
                  ensure mentees are prepared before joining.
                </p>
              </div>

              {/* FAQ Item 18 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q18. How will this help me in real life?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Mentorship prepares you for real-world challenges, from
                  interviews to running a business. It builds life skills like
                  decision-making, teamwork, and leadership that schools rarely
                  focus on.
                </p>
              </div>

              {/* FAQ Item 19 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q19. Do mentees get career guidance?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes. Career clarity sessions, resume reviews, interview
                  practice, and industry insights are part of what mentors
                  provide to prepare you for the future.
                </p>
              </div>

              {/* FAQ Item 20 */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Q20. How do I register?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Simply sign up on our website. After reviewing your details,
                  our NGO team connects you with suitable workshops, mentors, or
                  career pathways.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Mentorship Club Branding */}
            <div className="col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/assets/logo2.png"
                  alt="MentorshipClub Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <h3 className="text-2xl font-bold">
                  <span className="text-yellow-500">Mentorship</span>
                  <span className="text-white">Club</span>
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Empowering the next generation of leaders through meaningful
                mentorship and real-world skills.
              </p>
            </div>

            {/* Programs Section */}
            <div className="col-span-1">
              <h4 className="text-white font-bold text-lg mb-4">Programs</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-yellow-400 transition-colors text-sm"
                  >
                    Leadership Development
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-yellow-400 transition-colors text-sm"
                  >
                    Career Guidance
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-yellow-400 transition-colors text-sm"
                  >
                    Skill Building
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-yellow-400 transition-colors text-sm"
                  >
                    Personal Growth
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div className="col-span-1">
              <h4 className="text-white font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-yellow-400 transition-colors text-sm"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-yellow-400 transition-colors text-sm"
                  >
                    Success Stories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-yellow-400 transition-colors text-sm"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-yellow-400 transition-colors text-sm"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="col-span-1">
              <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:mentorshipclubfl@gmail.com"
                    className="text-white hover:text-yellow-400 transition-colors text-sm"
                  >
                    mentorshipclubfl@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+15551234567"
                    className="text-white hover:text-yellow-400 transition-colors text-sm"
                  >
                    +1 (555) 123-4567
                  </a>
                </li>
                <li className="text-white text-sm">
                  10044 NW 2nd St Coral Springs, FLORIDA 33071
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-8">
            <div className="text-center">
              <p className="text-white text-sm">
                &copy; 2024 Mentorship Club. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Demo Booking Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 backdrop-blur-sm"
            onClick={() => setIsDemoModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Book a Free Demo Class
                </h2>
                <p className="text-gray-600 mt-1">
                  Experience our interactive workshops firsthand
                </p>
              </div>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleDemoFormSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={demoFormData.name}
                    onChange={handleDemoFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={demoFormData.email}
                    onChange={handleDemoFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={demoFormData.phone}
                    onChange={handleDemoFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade Level *
                  </label>
                  <select
                    name="grade"
                    required
                    value={demoFormData.grade}
                    onChange={handleDemoFormChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select your grade</option>
                    <option value="6th">6th Grade</option>
                    <option value="7th">7th Grade</option>
                    <option value="8th">8th Grade</option>
                    <option value="9th">9th Grade</option>
                    <option value="10th">10th Grade</option>
                    <option value="11th">11th Grade</option>
                    <option value="12th">12th Grade</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Areas of Interest (Select all that apply)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "Coding/Programming",
                    "Graphic Design",
                    "Public Speaking",
                    "AI & Machine Learning",
                    "Digital Marketing",
                    "Leadership Skills",
                    "Financial Literacy",
                    "Entrepreneurship",
                    "Data Analysis",
                    "Web Development",
                    "Mobile App Development",
                    "Game Development",
                  ].map((interest) => (
                    <label key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        name="interests"
                        value={interest}
                        checked={demoFormData.interests.includes(interest)}
                        onChange={handleDemoFormChange}
                        className="mr-2 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                      />
                      <span className="text-sm text-gray-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Demo Time
                </label>
                <select
                  name="preferredTime"
                  value={demoFormData.preferredTime}
                  onChange={handleDemoFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                >
                  <option value="">Select preferred time</option>
                  <option value="morning">Morning (9 AM - 12 PM)</option>
                  <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
                  <option value="evening">Evening (5 PM - 8 PM)</option>
                  <option value="weekend">Weekend</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Message
                </label>
                <textarea
                  name="message"
                  value={demoFormData.message}
                  onChange={handleDemoFormChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                  placeholder="Tell us what you'd like to learn or any specific questions you have..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Book Free Demo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
