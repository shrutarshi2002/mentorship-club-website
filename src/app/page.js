"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    id: 1,
    title: "Empowering Future Leaders",
    subtitle: "Beyond the Classroom",
    cta: "Become a Mentor / Mentee",
    gradient: "from-white to-gray-50",
    bgImage: "none",
    image: "/assets/hero/img1.png",
  },
  {
    id: 2,
    title: "Not Just Exams—We Teach Life",
    subtitle: "Real Skills. Real Purpose.",
    cta: "Explore Programs",
    gradient: "from-white to-gray-50",
    bgImage: "none",
    image: "/assets/hero/img2.png",
  },
  {
    id: 3,
    title: "Clarity. Confidence.",
    subtitle: "A Future They Can Own.",
    cta: "Learn More",
    gradient: "from-white to-gray-50",
    bgImage: "none",
    image: "/assets/hero/img3.png",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsTransitioning(false);
      }, 300);
    }
  }, [isTransitioning, slides.length]);

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
  }, [isTransitioning, slides.length]);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-3">
                <img
                  src="/assets/logo.png"
                  alt="MentorshipClub Logo"
                  className="h-10 w-10 object-contain"
                />
                <h1 className="text-2xl font-bold">
                  <span className="text-yellow-500">Mentorship</span>
                  <span className="text-black">Club</span>
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="#"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Programs
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Mentors
                </a>
                <a
                  href="/about"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="md:hidden">
              <button className="text-gray-700 hover:text-red-600">
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
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Slider */}
      <div className="relative h-screen overflow-hidden">
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
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Side - Content */}
                  <div className="text-gray-900">
                    <div
                      className={`animate-fade-in-up ${
                        index === currentSlide ? "animate-fade-in-up" : ""
                      }`}
                    >
                      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                        {slide.title}
                      </h2>
                    </div>

                    <div
                      className={`animate-fade-in-up delay-200 ${
                        index === currentSlide ? "animate-fade-in-up" : ""
                      }`}
                    >
                      <p className="text-xl sm:text-2xl lg:text-3xl font-medium mb-8 text-red-600">
                        {slide.subtitle}
                      </p>
                    </div>

                    <div
                      className={`animate-fade-in-up delay-400 ${
                        index === currentSlide ? "animate-fade-in-up" : ""
                      }`}
                    >
                      <button className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide">
                        {slide.cta}
                      </button>
                    </div>
                  </div>

                  {/* Right Side - Image */}
                  {slide.image && (
                    <div className="hidden lg:block">
                      <div className="relative">
                        <div className="w-full h-[800px] rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover object-center"
                            loading="eager"
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
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
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-6">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Real Results
              </h3>
              <p className="text-gray-600">
                See tangible improvements in your skills, confidence, and career
                prospects through our proven methods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Programs Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Programs Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of mentorship programs designed
              to accelerate your personal and professional growth.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
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
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Leadership Development
                  </h3>
                  <p className="text-gray-600">
                    Build essential leadership skills through one-on-one
                    coaching and group workshops.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Career Guidance
                  </h3>
                  <p className="text-gray-600">
                    Navigate your career path with expert advice and industry
                    insights.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Skill Building
                  </h3>
                  <p className="text-gray-600">
                    Master practical skills that are in high demand in
                    today&apos;s competitive market.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Personal Growth
                  </h3>
                  <p className="text-gray-600">
                    Develop self-awareness, confidence, and emotional
                    intelligence.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
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
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Networking
                  </h3>
                  <p className="text-gray-600">
                    Connect with professionals and build valuable relationships
                    in your field.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Acceleration
                  </h3>
                  <p className="text-gray-600">
                    Fast-track your progress with proven strategies and
                    methodologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              See the real difference our mentorship programs are making in
              people&apos;s lives.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Active Mentees</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-blue-200">Expert Mentors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-200">Lives Transformed</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Success Stories</h3>
              </div>
              <p className="text-blue-100">
                &ldquo;The mentorship program completely changed my career
                trajectory. I went from feeling stuck to landing my dream job
                within 6 months.&rdquo;
              </p>
              <div className="mt-4 text-sm text-blue-200">
                - Sarah Johnson, Software Engineer
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Measurable Results</h3>
              </div>
              <p className="text-blue-100">
                &ldquo;Our mentees see an average 40% increase in confidence and
                60% improvement in career satisfaction within the first
                year.&rdquo;
              </p>
              <div className="mt-4 text-sm text-blue-200">
                - Program Analytics
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Involved
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your mentorship journey? Choose your path and take
              the first step towards transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Become a Mentee</h3>
                <p className="text-blue-100 mb-6">
                  Ready to accelerate your growth? Join our community of
                  learners and get personalized guidance from experienced
                  mentors.
                </p>
                <ul className="space-y-2 text-blue-100">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Personalized mentorship plan
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Access to expert mentors
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Community support network
                  </li>
                </ul>
              </div>
              <div className="p-8">
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                  Apply as Mentee
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Become a Mentor</h3>
                <p className="text-green-100 mb-6">
                  Share your expertise and make a lasting impact. Help others
                  grow while developing your leadership skills.
                </p>
                <ul className="space-y-2 text-green-100">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Flexible mentoring schedule
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Leadership development
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Professional recognition
                  </li>
                </ul>
              </div>
              <div className="p-8">
                <button className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105">
                  Apply as Mentor
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Not Sure Where to Start?
              </h3>
              <p className="text-gray-600 mb-6">
                Take our quick assessment to find the perfect mentorship program
                for your goals and experience level.
              </p>
              <button className="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-8 rounded-lg font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105">
                Take Assessment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-yellow-500">Mentorship</span>
                <span className="text-white">Club</span>
              </h3>
              <p className="text-gray-400">
                Empowering the next generation of leaders through meaningful
                mentorship and real-world skills.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Leadership Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Career Guidance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Skill Building
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Personal Growth
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>info@mentorshipclub.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Mentorship Ave, City, State</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Mentorship Club. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
