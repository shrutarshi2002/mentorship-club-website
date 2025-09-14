"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Programs() {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  const programs = [
    {
      id: "marketing-branding",
      title: "Marketing & Branding",
      desc: "How to shape and promote products, services, or yourself with clarity and creativity.",
      image: "/assets/program/1.png",
      category: "Marketing",
      duration: "8 weeks",
      level: "Beginner",
    },
    {
      id: "social-media-strategy",
      title: "Social Media Strategy",
      desc: "Understanding how platforms work and how to build an impactful online presence.",
      image: "/assets/program/2.png",
      category: "Marketing",
      duration: "6 weeks",
      level: "Beginner",
    },
    {
      id: "content-creation",
      title: "Content Creation",
      desc: "Using design, video, and storytelling tools to create engaging content.",
      image: "/assets/program/3.png",
      category: "Creative",
      duration: "10 weeks",
      level: "Intermediate",
    },
    {
      id: "digital-advertising",
      title: "Digital Advertising",
      desc: "Basics of running ad campaigns and reaching the right audience.",
      image: "/assets/program/4.png",
      category: "Marketing",
      duration: "8 weeks",
      level: "Intermediate",
    },
    {
      id: "influencer-campaign-marketing",
      title: "Influencer & Campaign Marketing",
      desc: "Planning and executing influencer strategies and brand partnerships.",
      image: "/assets/program/5.png",
      category: "Marketing",
      duration: "12 weeks",
      level: "Advanced",
    },
    {
      id: "entrepreneurial-marketing",
      title: "Entrepreneurial Marketing",
      desc: "Turning ideas into offers, building funnels, and pitching with purpose.",
      image: "/assets/program/6.png",
      category: "Business",
      duration: "10 weeks",
      level: "Intermediate",
    },
    {
      id: "ai-fundamentals",
      title: "AI Fundamentals",
      desc: "Core AI concepts and understanding how AI is reshaping the world.",
      image: "/assets/program/7.png",
      category: "Technology",
      duration: "8 weeks",
      level: "Beginner",
    },
    {
      id: "prompt-engineering",
      title: "Prompt Engineering",
      desc: "Using tools like ChatGPT for writing, thinking, and creativity.",
      image: "/assets/program/8.png",
      category: "Technology",
      duration: "6 weeks",
      level: "Beginner",
    },
    {
      id: "no-code-ai-tools",
      title: "No-Code AI Tools",
      desc: "Creating simple apps or automations using visual platforms.",
      image: "/assets/program/9.png",
      category: "Technology",
      duration: "8 weeks",
      level: "Beginner",
    },
    {
      id: "mini-chatbot-projects",
      title: "Mini Chatbot Projects",
      desc: "Designing basic interactive bots that can assist or guide.",
      image: "/assets/program/10.png",
      category: "Technology",
      duration: "10 weeks",
      level: "Intermediate",
    },
    {
      id: "python-basics",
      title: "Python Basics",
      desc: "Learning foundational programming skills through simple projects.",
      image: "/assets/program/11.png",
      category: "Technology",
      duration: "12 weeks",
      level: "Beginner",
    },
    {
      id: "ai-in-real-life",
      title: "AI in Real Life",
      desc: "Exploring how AI is applied in fields like health, art, business, and more.",
      image: "/assets/program/12.png",
      category: "Technology",
      duration: "8 weeks",
      level: "Intermediate",
    },
    {
      id: "public-speaking",
      title: "Public Speaking",
      desc: "Building confidence and clarity while communicating in front of others.",
      image: "/assets/program/13.png",
      category: "Communication",
      duration: "6 weeks",
      level: "Beginner",
    },
    {
      id: "pitching-for-entrepreneurs",
      title: "Pitching for Entrepreneurs",
      desc: "Creating strong, clear pitches for projects, businesses, or ideas.",
      image: "/assets/program/14.png",
      category: "Business",
      duration: "8 weeks",
      level: "Intermediate",
    },
    {
      id: "creative-thinking",
      title: "Creative Thinking",
      desc: "Practicing innovation, brainstorming, and idea development.",
      image: "/assets/program/15.png",
      category: "Creative",
      duration: "6 weeks",
      level: "Beginner",
    },
    {
      id: "interview-impression-skills",
      title: "Interview & Impression Skills",
      desc: "Preparing to present yourself with clarity, confidence, and professionalism.",
      image: "/assets/program/16.png",
      category: "Communication",
      duration: "8 weeks",
      level: "Intermediate",
    },
    {
      id: "networking-conversation",
      title: "Networking & Conversation",
      desc: "Strengthening real-world social interaction and connection skills.",
      image: "/assets/program/17.png",
      category: "Communication",
      duration: "6 weeks",
      level: "Beginner",
    },
    {
      id: "confidence-presence",
      title: "Confidence & Presence",
      desc: "Improving mindset, self-belief, and personal presence.",
      image: "/assets/program/18.png",
      category: "Personal Development",
      duration: "8 weeks",
      level: "Beginner",
    },
  ];

  const categories = [
    "All",
    "Marketing",
    "Technology",
    "Creative",
    "Business",
    "Communication",
    "Personal Development",
  ];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const durations = ["All", "6 weeks", "8 weeks", "10 weeks", "12 weeks"];

  const filteredPrograms = programs.filter((program) => {
    const matchesCategory =
      selectedCategory === "All" || program.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel =
      selectedLevel === "All" || program.level === selectedLevel;
    const matchesDuration =
      selectedDuration === "All" || program.duration === selectedDuration;

    return matchesCategory && matchesSearch && matchesLevel && matchesDuration;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  const getCategoryColor = (category) => {
    const colors = {
      Marketing: "bg-blue-100 text-blue-800",
      Technology: "bg-purple-100 text-purple-800",
      Creative: "bg-pink-100 text-pink-800",
      Business: "bg-green-100 text-green-800",
      Communication: "bg-orange-100 text-orange-800",
      "Personal Development": "bg-indigo-100 text-indigo-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getLevelColor = (level) => {
    const colors = {
      Beginner: "bg-green-100 text-green-800",
      Intermediate: "bg-yellow-100 text-yellow-800",
      Advanced: "bg-red-100 text-red-800",
    };
    return colors[level] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-8 pb-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-red-600">Programs</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of programs designed to build
            real-world skills, foster creativity, and prepare you for success in
            the modern world.
          </p>
        </div>
      </section>

      {/* Filter Interface */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-yellow-400 text-black border-2 border-black shadow-lg"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:bg-yellow-50 hover:border-yellow-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search programs or topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 text-black placeholder-gray-400"
                  />
                </div>
                <button className="bg-yellow-400 text-black border-2 border-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-500 transition-all duration-300">
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Level Filter */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="appearance-none bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 pr-10 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 cursor-pointer"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Duration Filter */}
            <div className="relative">
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="appearance-none bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 pr-10 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 cursor-pointer"
              >
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {duration}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* Filter Icon */}
            <button className="bg-white border-2 border-gray-200 p-3 rounded-xl hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300">
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            </button>

            {/* Reset Button */}
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
                setSelectedLevel("All");
                setSelectedDuration("All");
              }}
              className="text-gray-600 hover:text-black font-medium transition-colors"
            >
              Reset
            </button>

            {/* Sort Button */}
            <button className="bg-white border-2 border-gray-200 p-3 rounded-xl hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300">
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </button>

            {/* Bookmark Button */}
            <button className="bg-white border-2 border-gray-200 p-3 rounded-xl hover:bg-yellow-50 hover:border-yellow-300 transition-all duration-300">
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section
        id="programs-grid"
        ref={setRef("programs-grid")}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible["programs-grid"]
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredPrograms.map((program, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Program Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                          program.category
                        )}`}
                      >
                        {program.category}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
                          program.level
                        )}`}
                      >
                        {program.level}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700">
                        {program.duration}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {program.desc}
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
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
                          {program.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
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
                          {program.level}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/courses/${program.id}`}
                          className="w-full bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-center"
                        >
                          View Program
                        </Link>
                        <button
                          onClick={() => {
                            const emailData = {
                              to: "mentorshipclubfl@gmail.com",
                              subject: `Enrollment Request - ${program.title}`,
                              body: `
Program Enrollment Request

I would like to enroll in:
Program: ${program.title}
Description: ${program.description}
Duration: ${program.duration}
Level: ${program.level}
Price: ${program.price}

Please contact me to complete my enrollment.

---
This request was sent from the Mentorship Club programs page.
                              `.trim(),
                            };

                            const mailtoLink = `mailto:${
                              emailData.to
                            }?subject=${encodeURIComponent(
                              emailData.subject
                            )}&body=${encodeURIComponent(emailData.body)}`;
                            window.location.href = mailtoLink;

                            alert(
                              "Your enrollment request has been prepared for email. Your default email client should open with a pre-filled email to mentorshipclubfl@gmail.com. Please send the email to complete your enrollment request."
                            );
                          }}
                          className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Choose a program that matches your interests and goals. Our expert
            mentors are here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Get Started Today
            </Link>
            <Link
              href="/about"
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Learn More About Us
            </Link>
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
                  <Link href="#" className="hover:text-white transition-colors">
                    Marketing & Branding
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    AI & Technology
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Communication Skills
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Personal Development
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>mentorshipclubfl@gmail.com</li>
                <li>+1 (555) 123-4567</li>
                <li>10044 NW 2nd St Coral Springs, FLORIDA 33071</li>
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
