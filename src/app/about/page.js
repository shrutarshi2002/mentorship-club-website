"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/assets/logo.png",
      bio: "Former tech executive with 15+ years of experience in leadership development and mentorship programs.",
      color: "from-red-500 to-pink-600",
    },
    {
      name: "Michael Chen",
      role: "Head of Programs",
      image: "/assets/logo.png",
      bio: "Education specialist focused on creating impactful learning experiences and career development pathways.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Emily Rodriguez",
      role: "Community Director",
      image: "/assets/logo.png",
      bio: "Passionate about building inclusive communities and fostering meaningful connections between mentors and mentees.",
      color: "from-green-500 to-teal-600",
    },
    {
      name: "David Thompson",
      role: "Technology Lead",
      image: "/assets/logo.png",
      bio: "Innovator in ed-tech solutions, ensuring our platform provides seamless mentorship experiences.",
      color: "from-purple-500 to-pink-600",
    },
    {
      name: "Lisa Wang",
      role: "Marketing Director",
      image: "/assets/logo.png",
      bio: "Strategic marketing expert who helps us reach and connect with communities worldwide.",
      color: "from-yellow-500 to-orange-600",
    },
    {
      name: "James Rodriguez",
      role: "Operations Manager",
      image: "/assets/logo.png",
      bio: "Ensures smooth operations and exceptional user experiences across all our programs.",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  const values = [
    {
      title: "Excellence",
      description:
        "We strive for the highest quality in everything we do, from our programs to our relationships.",
      icon: "⭐",
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Integrity",
      description:
        "We operate with honesty, transparency, and ethical practices in all our interactions.",
      icon: "🤝",
      color: "from-blue-400 to-indigo-500",
    },
    {
      title: "Innovation",
      description:
        "We continuously evolve our methods and approaches to meet changing needs and opportunities.",
      icon: "💡",
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Community",
      description:
        "We believe in the power of collective growth and supportive relationships.",
      icon: "🌱",
      color: "from-green-400 to-teal-500",
    },
    {
      title: "Empowerment",
      description:
        "We enable individuals to take control of their personal and professional development.",
      icon: "🚀",
      color: "from-red-400 to-pink-500",
    },
    {
      title: "Inclusivity",
      description:
        "We welcome and support people from all backgrounds, experiences, and perspectives.",
      icon: "🌈",
      color: "from-indigo-400 to-purple-500",
    },
  ];

  const approachSteps = [
    {
      number: "01",
      title: "Personalized Matching",
      description:
        "Our AI-powered algorithm matches mentees with mentors based on goals, experience, personality, and availability, ensuring optimal compatibility.",
      color: "from-blue-500 to-purple-600",
    },
    {
      number: "02",
      title: "Structured Programs",
      description:
        "We offer structured mentorship programs with clear objectives, milestones, and progress tracking to ensure measurable outcomes.",
      color: "from-green-500 to-teal-600",
    },
    {
      number: "03",
      title: "Community Support",
      description:
        "Beyond one-on-one mentorship, we foster a supportive community where members can learn from each other and build lasting relationships.",
      color: "from-red-500 to-pink-600",
    },
    {
      number: "04",
      title: "Continuous Learning",
      description:
        "We provide ongoing resources, workshops, and events to support continuous growth and development for both mentors and mentees.",
      color: "from-yellow-500 to-orange-600",
    },
    {
      number: "05",
      title: "Technology Integration",
      description:
        "Our platform leverages cutting-edge technology to facilitate seamless communication, progress tracking, and resource sharing.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      number: "06",
      title: "Impact Measurement",
      description:
        "We continuously measure and analyze the impact of our programs to ensure we&apos;re delivering real value and improving outcomes.",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  const storyTimeline = [
    {
      year: "2020",
      title: "The Beginning",
      description:
        "It all started when our founder, Sarah Johnson, realized that despite having an excellent education, she was missing the practical guidance and real-world insights that could have accelerated her career.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      year: "2021",
      title: "Building the Foundation",
      description:
        "We started with just 10 mentors and 50 mentees, testing our approach and refining our methodology. The early success stories confirmed we were onto something special.",
      color: "from-green-500 to-teal-600",
    },
    {
      year: "2022-2023",
      title: "Growth & Innovation",
      description:
        "As our community grew, we expanded our programs, developed new technologies, and created specialized mentorship tracks.",
      color: "from-purple-500 to-pink-600",
    },
    {
      year: "2024+",
      title: "Today & Beyond",
      description:
        "With over 500 active mentees and 150 expert mentors, we&apos;re now a thriving ecosystem making a real difference globally.",
      color: "from-red-500 to-orange-600",
    },
  ];

  const impactStats = [
    {
      number: "500+",
      label: "Active Mentees",
      color: "from-red-500 to-pink-600",
    },
    {
      number: "150+",
      label: "Expert Mentors",
      color: "from-blue-500 to-indigo-600",
    },
    {
      number: "95%",
      label: "Success Rate",
      color: "from-green-500 to-teal-600",
    },
    {
      number: "1000+",
      label: "Lives Transformed",
      color: "from-purple-500 to-pink-600",
    },
    {
      number: "40%",
      label: "Confidence Increase",
      color: "from-yellow-500 to-orange-600",
    },
    {
      number: "60%",
      label: "Career Satisfaction",
      color: "from-cyan-500 to-blue-600",
    },
  ];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
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
                  href="#"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Programs
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Mentors
                </Link>
                <Link
                  href="/about"
                  className="text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  About
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-red-600">Mentorship Club</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re on a mission to transform lives through meaningful
            mentorship, real-world skills, and authentic connections that go
            beyond traditional education.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" ref={setRef("about")} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Who We Are
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A revolutionary platform that bridges the gap between traditional
              education and real-world success.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div
              className={`transform transition-all duration-1000 ${
                isVisible.about
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
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
                  Our Mission
                </h3>
                <p className="text-gray-600">
                  To democratize access to mentorship by connecting experienced
                  professionals with eager learners through innovative
                  technology and proven methodologies.
                </p>
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-200 ${
                isVisible.about
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-br from-red-500 to-pink-600 p-8 rounded-3xl shadow-xl text-white h-full">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
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
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Core Belief</h3>
                <p className="text-red-50">
                  &ldquo;Success is not just about what you know, but about who
                  you become and the relationships you build along the
                  way.&rdquo;
                </p>
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-400 ${
                isVisible.about
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
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
                  Community First
                </h3>
                <p className="text-gray-600">
                  We believe that true learning happens through meaningful
                  relationships, practical experiences, and personalized
                  guidance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Programs Section */}
      <section
        id="programs"
        ref={setRef("programs")}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Our Core Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three transformative pillars that prepare students for real-world
              success beyond traditional academics.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div
              className={`transform transition-all duration-1000 ${
                isVisible.programs
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-3xl shadow-xl text-white h-full">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
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
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Hands-On Career Exploration
                </h3>
                <p className="text-blue-100">
                  Early exposure to real industries through live sessions,
                  shadowing, and practical simulations.
                </p>
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-200 ${
                isVisible.programs
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-3xl shadow-xl text-white h-full">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
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
                <h3 className="text-2xl font-bold mb-4">
                  College Prep & Competitive Mentorship
                </h3>
                <p className="text-purple-100">
                  Support with applications, essay writing, and navigating
                  admissions—with guidance from elite mentors.
                </p>
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-400 ${
                isVisible.programs
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-br from-green-500 to-teal-600 p-8 rounded-3xl shadow-xl text-white h-full">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Life Skills & Emotional Confidence
                </h3>
                <p className="text-green-100">
                  Sessions that build clarity, resilience, and the social skills
                  needed to succeed beyond academics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" ref={setRef("story")} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a simple idea to a thriving community that&apos;s
              transforming lives every day.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {storyTimeline.map((item, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 delay-${
                  index * 200
                } ${
                  isVisible.story
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
              >
                <div
                  className={`bg-gradient-to-br ${item.color} p-8 rounded-3xl shadow-xl text-white h-full`}
                >
                  <div className="text-6xl font-bold text-white/30 mb-4">
                    {item.year}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-white/90">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section
        id="approach"
        ref={setRef("approach")}
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Our Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;ve developed a unique methodology that combines proven
              mentorship principles with innovative technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {approachSteps.map((step, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 delay-${
                  index * 100
                } ${
                  isVisible.approach
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
              >
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 h-full hover:shadow-2xl transition-shadow duration-300">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <span className="text-2xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Values Section */}
      <section id="vision" ref={setRef("vision")} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Vision, Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The guiding principles that drive everything we do at Mentorship
              Club.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div
              className={`transform transition-all duration-1000 ${
                isVisible.vision
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 rounded-3xl shadow-xl text-white h-full">
                <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
                <p className="text-xl leading-relaxed text-blue-100">
                  To create a world where every individual has access to
                  meaningful mentorship, enabling them to unlock their full
                  potential and achieve their dreams.
                </p>
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-200 ${
                isVisible.vision
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-br from-red-600 to-pink-700 p-8 rounded-3xl shadow-xl text-white h-full">
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-xl leading-relaxed text-red-100">
                  To democratize access to mentorship by connecting experienced
                  professionals with eager learners through innovative
                  technology and proven methodologies.
                </p>
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-400 ${
                isVisible.vision
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-br from-green-600 to-teal-700 p-8 rounded-3xl shadow-xl text-white h-full">
                <h3 className="text-3xl font-bold mb-6">Our Purpose</h3>
                <p className="text-xl leading-relaxed text-green-100">
                  We exist to bridge the gap between education and real-world
                  success, fostering authentic relationships that transform
                  lives.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 delay-${
                  index * 100
                } ${
                  isVisible.vision
                    ? "translate-y-0 opacity-100"
                    : "translate-y-0 opacity-0"
                }`}
              >
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                  >
                    <span className="text-3xl">{value.icon}</span>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section
        id="team"
        ref={setRef("team")}
        className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Our Team & Leadership
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the passionate individuals who are driving our mission
              forward and making mentorship accessible to everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 delay-${
                  index * 150
                } ${
                  isVisible.team
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
              >
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div
                    className={`bg-gradient-to-br ${member.color} p-6 text-white text-center`}
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-white/20">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={80}
                        height={80}
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-white/90 font-medium">{member.role}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-center">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`mt-16 transform transition-all duration-1000 delay-500 ${
              isVisible.team
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Join Our Team
              </h3>
              <p className="text-gray-600 mb-6">
                We&apos;re always looking for passionate individuals who share
                our vision and want to make a difference in the world of
                mentorship.
              </p>
              <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                View Open Positions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Overview Section */}
      <section id="impact" ref={setRef("impact")} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Impact Overview
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See the real difference our mentorship programs are making in
              people&apos;s lives and communities around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 delay-${
                  index * 100
                } ${
                  isVisible.impact
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
              >
                <div
                  className={`bg-gradient-to-br ${stat.color} p-8 rounded-3xl shadow-xl text-white text-center h-full`}
                >
                  <div className="text-5xl font-bold mb-2">{stat.number}</div>
                  <div className="text-xl text-white/90">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div
              className={`transform transition-all duration-1000 delay-600 ${
                isVisible.impact
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-br from-blue-600 to-purple-700 p-8 rounded-3xl shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-6">Success Stories</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <p className="italic text-blue-100">
                      &ldquo;The mentorship program completely changed my career
                      trajectory. I went from feeling stuck to landing my dream
                      job within 6 months.&rdquo;
                    </p>
                    <p className="text-sm mt-2 text-blue-200">
                      - Sarah Johnson, Software Engineer
                    </p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <p className="italic text-blue-100">
                      &ldquo;As a mentor, I&apos;ve learned as much from my
                      mentees as they have from me. It&apos;s been an incredibly
                      rewarding experience.&rdquo;
                    </p>
                    <p className="text-sm mt-2 text-blue-200">
                      - Michael Chen, Tech Lead
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-800 ${
                isVisible.impact
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              <div className="bg-gradient-to-br from-green-600 to-teal-700 p-8 rounded-3xl shadow-xl text-white">
                <h3 className="text-2xl font-bold mb-6">Measurable Results</h3>
                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <p className="text-lg font-semibold text-green-100">
                      40% Increase
                    </p>
                    <p className="text-sm text-green-200">
                      in confidence levels among mentees
                    </p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <p className="text-lg font-semibold text-green-100">
                      60% Improvement
                    </p>
                    <p className="text-sm text-green-200">
                      in career satisfaction within first year
                    </p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl">
                    <p className="text-lg font-semibold text-green-100">
                      85% Retention
                    </p>
                    <p className="text-sm text-green-200">
                      rate for long-term mentorship relationships
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`transform transition-all duration-1000 delay-1000 ${
              isVisible.impact
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-3xl shadow-xl text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Be Part of Our Impact
              </h3>
              <p className="text-gray-600 mb-6">
                Whether you want to become a mentor, join as a mentee, or
                support our mission, you can be part of the positive change
                we&apos;re creating in the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                  Become a Mentee
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                  Become a Mentor
                </button>
              </div>
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
                  <Link href="#" className="hover:text-white transition-colors">
                    Leadership Development
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Career Guidance
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Skill Building
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Personal Growth
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
