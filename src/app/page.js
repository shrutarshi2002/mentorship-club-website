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
    cta: "Become a Mentor / Mentee",
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
                      <p
                        className={`font-medium mb-8 text-red-600 ${
                          slide.id === 1
                            ? "text-lg sm:text-xl lg:text-2xl"
                            : "text-xl sm:text-2xl lg:text-3xl"
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
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide">
                          {slide.cta}
                        </button>
                        {slide.secondaryCta && (
                          <button className="bg-transparent text-red-600 border-2 border-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-600 hover:text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl uppercase tracking-wide">
                            {slide.secondaryCta}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Image */}
                  {slide.image && (
                    <div className="hidden lg:block">
                      <div className="relative">
                        <div className="w-full h-[800px] rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300">
                          <Image
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover object-center"
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

      {/* Footer */}
      <footer className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Mentorship Club Branding */}
            <div className="col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/assets/logo.png"
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
                    href="mailto:info@mentorshipclub.com"
                    className="text-white hover:text-yellow-400 transition-colors text-sm"
                  >
                    info@mentorshipclub.com
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
                  123 Mentorship Ave, City, State
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
    </div>
  );
}
