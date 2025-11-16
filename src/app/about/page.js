"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function About() {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/assets/logo2.png",
      bio: "Former tech executive with 15+ years of experience in leadership development and mentorship programs.",
      color: "from-red-500 to-pink-600",
    },
    {
      name: "Michael Chen",
      role: "Head of Programs",
      image: "/assets/logo2.png",
      bio: "Education specialist focused on creating impactful learning experiences and career development pathways.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Emily Rodriguez",
      role: "Community Director",
      image: "/assets/logo2.png",
      bio: "Passionate about building inclusive communities and fostering meaningful connections between mentors and mentees.",
      color: "from-green-500 to-teal-600",
    },
    {
      name: "David Thompson",
      role: "Technology Lead",
      image: "/assets/logo2.png",
      bio: "Innovator in ed-tech solutions, ensuring our platform provides seamless mentorship experiences.",
      color: "from-purple-500 to-pink-600",
    },
    {
      name: "Lisa Wang",
      role: "Marketing Director",
      image: "/assets/logo2.png",
      bio: "Strategic marketing expert who helps us reach and connect with communities worldwide.",
      color: "from-yellow-500 to-orange-600",
    },
    {
      name: "James Rodriguez",
      role: "Operations Manager",
      image: "/assets/logo2.png",
      bio: "Ensures smooth operations and exceptional user experiences across all our programs.",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  const values = [
    {
      title: "Excellence",
      description:
        "We uphold a high standard of care, empathy, and intentional teaching in everything we do — because children deserve nothing less.",
      icon: "⭐",
      color: "from-yellow-400 to-orange-500",
    },
    {
      title: "Integrity",
      description:
        "We operate with honesty, clarity, and transparency. Every interaction is rooted in trust and respect for the child and their family.",
      icon: "🤝",
      color: "from-blue-400 to-indigo-500",
    },
    {
      title: "Innovation",
      description:
        "We approach learning with creativity and adaptability — blending modern methods with mindful, real-world practices that make education meaningful.",
      icon: "💡",
      color: "from-purple-400 to-pink-500",
    },
    {
      title: "Community",
      description:
        "We believe children grow best in safe, supportive communities. We create nurturing spaces where parents, mentors, and young learners grow together.",
      icon: "🌱",
      color: "from-green-400 to-teal-500",
    },
    {
      title: "Empowerment",
      description:
        "We help children, teens, and parents take ownership of their mental, emotional, and practical development — giving them tools that last a lifetime.",
      icon: "🚀",
      color: "from-red-400 to-pink-500",
    },
    {
      title: "Inclusivity",
      description:
        "We welcome learners from all backgrounds, learning styles, and abilities, ensuring every child feels seen, valued, and supported.",
      icon: "🌈",
      color: "from-indigo-400 to-purple-500",
    },
  ];

  const approachSteps = [
    {
      number: "01",
      title: "Personalized Matching",
      description:
        "We match learners with mentors based on goals, interests, personality, and comfort—so every child feels seen, understood, and supported.",
      color: "from-blue-500 to-purple-600",
    },
    {
      number: "02",
      title: "Structured Yet Flexible Programs",
      description:
        "Our workshops are designed with clarity and purpose but delivered in a warm, conversational, child-friendly way. Children learn through stories, examples, real-life scenarios, and mindful exercises—not pressure.",
      color: "from-green-500 to-teal-600",
    },
    {
      number: "03",
      title: "Community Support",
      description:
        "Mentorship is not a one-way relationship. We foster a supportive environment where parents, mentors, and kids learn together, share insights, and celebrate progress.",
      color: "from-red-500 to-pink-600",
    },
    {
      number: "04",
      title: "Continuous Learning",
      description:
        "We offer ongoing workshops, reading circles, conversations, and resources to support consistent character development and emotional growth.",
      color: "from-yellow-500 to-orange-600",
    },
    {
      number: "05",
      title: "Technology Integration (Mindfully Used)",
      description:
        "Technology is used with intention—not as distraction. We use it for visual learning, collaboration, and creativity while encouraging children to reduce screen dependency and develop focus.",
      color: "from-indigo-500 to-purple-600",
    },
    {
      number: "06",
      title: "Impact Measurement",
      description:
        "We track progress not through marks, but through confidence, communication, emotional balance, real-life application, and mindset shifts. These are the real indicators of meaningful transformation.",
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
      <Navbar />

      {/* Hero Section */}
      <section className="pt-8 pb-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            🌿 About Mentorship Club
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re on a mission to help children and youth grow beyond screens, traditional academics, and pressure-driven systems. Through mindful mentorship, real-world learning, and emotionally aware programs, we create experiences that build confidence, focus, resilience, and life skills—the things that truly shape a child&apos;s future.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
            Mentorship Club brings together parents, educators, mentors, and children in a safe, supportive learning space where curiosity, emotional safety, and connection come first.
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" ref={setRef("about")} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              🌱 Who We Are
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              A mindful learning community designed to bridge the gap between traditional education and real-world wisdom.
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We focus on what schools often miss: emotional intelligence, life skills, financial awareness, problem-solving, communication, mindfulness, and personal growth.
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
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600">
                  To democratize meaningful mentorship by connecting children with compassionate, skilled adults who help them discover confidence, clarity, and purpose—through mindful learning and guided exploration.
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
                  <span className="text-3xl">💚</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Core Belief</h3>
                <p className="text-red-50">
                  Success isn&apos;t defined by marks or degrees, but by who a child becomes—their self-belief, emotional strength, values, and the relationships that guide them along the way. We believe every child deserves a mentor who sees them, supports them, and believes in their potential.
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
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Community First
                </h3>
                <p className="text-gray-600">
                  We grow together. Our programs are built on connection—between kids, mentors, and parents—so every learner feels supported emotionally, mentally, and socially. We focus on kindness, mindfulness, collaboration, and confidence-building.
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
              🌈 Our Core Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three pillars that help children grow into confident, capable, emotionally resilient young adults.
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
                  <span className="text-3xl">1️⃣</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Hands-On Career Exploration
                </h3>
                <p className="text-blue-100 mb-4">
                  Children learn best when they experience the real world. We introduce students to different industries and skills through interactive sessions, storytelling, discussions, and simple practical exposure—helping them understand how the world works and where they fit within it.
                </p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm font-semibold mb-2">What Kids Gain:</p>
                  <ul className="text-sm text-blue-100 space-y-1">
                    <li>• Curiosity about real careers</li>
                    <li>• Confidence asking questions</li>
                    <li>• Understanding different skills</li>
                    <li>• Early direction and clarity</li>
                  </ul>
                </div>
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
                  <span className="text-3xl">2️⃣</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Life Skills & Emotional Confidence
                </h3>
                <p className="text-purple-100 mb-4">
                  Life doesn&apos;t come with a manual—but children can learn the skills that help them grow with balance, emotional maturity, and purpose. From communication to mindfulness, emotional intelligence to problem-solving, we help kids build the inner strength needed to thrive beyond academics.
                </p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm font-semibold mb-2">Focus Areas:</p>
                  <ul className="text-sm text-purple-100 space-y-1">
                    <li>• Emotional intelligence</li>
                    <li>• Mindfulness & focus</li>
                    <li>• Decision-making</li>
                    <li>• Communication & confidence</li>
                    <li>• Healthy self-esteem</li>
                    <li>• Real-world challenges & reflection</li>
                  </ul>
                </div>
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
                  <span className="text-3xl">3️⃣</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Hands-On Projects & Real-World Learning
                </h3>
                <p className="text-green-100 mb-4">
                  Children participate in simple, meaningful projects that teach initiative, teamwork, planning, leadership, and creative problem-solving. These projects build responsibility and give kids a sense of ownership and pride.
                </p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm font-semibold mb-2">What They Experience:</p>
                  <ul className="text-sm text-green-100 space-y-1">
                    <li>• Planning and completing small projects</li>
                    <li>• Practicing leadership and teamwork</li>
                    <li>• Creative thinking</li>
                    <li>• Real-world application of knowledge</li>
                    <li>• Reflection and self-awareness</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Founder Section */}
      <section
        id="founder"
        ref={setRef("founder")}
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              About the Founder
            </h2>
          </div>

          <div
            className={`transform transition-all duration-1000 ${
              isVisible.founder
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                  <span className="text-5xl text-white font-bold">K</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  Komal
                </h3>
                <p className="text-xl text-gray-600">Founder & Visionary</p>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p>
                  I&apos;ve spent more than a decade working across different industries — real estate, digital marketing, healthcare, and business strategy. In every role I took on, one thing stayed constant: I always ended up guiding people. Whether it was helping someone make a smart investment, improving a business system, or supporting a team through challenges, I naturally stepped into the space of mentorship.
                </p>

                <p>
                  Over time, I realized something important about myself — <strong>I care deeply about how people grow.</strong> Not just financially, but emotionally, mentally, and in the way they see their own potential.
                </p>

                <p>
                  My journey became even more meaningful when I became a parent.
                </p>

                <p>
                  Like many parents today, I started noticing how children are growing up in a world that moves too fast. Screens, information overload, pressure, comparison — everything is louder, quicker, and more distracting. And somewhere in between all of this, the essential life skills that shape confident, grounded human beings often get overlooked.
                </p>

                <p>
                  I saw kids struggling with focus. I saw them overwhelmed by emotions they didn&apos;t yet know how to express. I saw curiosity fading because answers came faster than questions. And I felt this gap very personally — not just as a parent, but as someone who has guided adults who often lacked these very skills.
                </p>

                <p>
                  It made me think: <strong>If adults struggle because they never learned these skills early on, why don&apos;t we start teaching them at the right age — childhood?</strong>
                </p>

                <p>
                  That question kept returning to me, again and again. And that became the foundation for Mentorship Club.
                </p>

                <p>
                  I didn&apos;t want to create another academic program. I wanted to build a space where learning is human. Where kids can discover mindfulness without feeling pressured, understand money without fear, express emotions safely, communicate with confidence, think deeply, and learn through real-world experiences.
                </p>

                <p>
                  Every part of Mentorship Club is shaped by what I&apos;ve learned from life: from managing businesses, supporting entrepreneurs, working with diverse personalities, understanding behavior, and navigating my own parenting journey. It&apos;s a blend of experience, intuition, mindfulness, and a genuine belief that children deserve more than information — they deserve guidance.
                </p>

                <p>
                  Here, kids don&apos;t just learn skills. They learn how to understand themselves, how to stay grounded in a world full of noise, how to make decisions they feel proud of, how to communicate, how to build habits, and how to grow into emotionally strong individuals.
                </p>

                <p>
                  For me, mentorship is not about teaching someone what to do. <strong>It&apos;s about awakening something inside them — clarity, awareness, curiosity, and confidence.</strong>
                </p>

                <p>
                  This work is close to my heart because I&apos;ve seen what happens when children grow with the right support. Their eyes brighten. Their questions get deeper. Their confidence blossoms. And they grow into thoughtful, strong, self-aware young adults who are ready for the real world — not just the academic one.
                </p>

                <p className="text-xl font-semibold text-gray-900 pt-6 border-t border-gray-200">
                  Mentorship Club is my way of giving children what I wish every young mind could receive: a safe, grounded, mindful space to grow, learn, explore, and feel understood.
                </p>

                <p className="text-xl font-semibold text-gray-900">
                  That is why I built this. And that is why this mission matters to me — deeply and personally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Heart of Mentorship Club Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            🌟 The Heart of Mentorship Club
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            We&apos;re here to prepare children not just for exams—but for life. For challenges, decisions, emotions, independence, confidence, compassion, and purpose. Every workshop, every session, every conversation is designed to help young minds grow with awareness, curiosity, and balance.
          </p>
        </div>
      </section>

      {/* Our Story Section - HIDDEN */}
      {/* <section id="story" ref={setRef("story")} className="py-20 bg-white">
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
      </section> */}

      {/* Our Approach Section */}
      <section
        id="approach"
        ref={setRef("approach")}
        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              🌿 Our Approach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A thoughtful blend of mentorship principles, mindful practices, and modern learning methods.
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
              🌿 Vision, Mission & Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The guiding principles that shape everything we do at Mentorship Club.
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
                  To create a world where every child and young learner receives meaningful mentorship — building the confidence, awareness, and life skills they need to thrive beyond screens, classrooms, and traditional expectations.
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
                  To democratize mentorship by connecting children, parents, and growing minds with experienced mentors who share real-world wisdom, mindful practices, and practical knowledge through simple, engaging, human-centered learning.
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
                  We exist to bridge the gap between education and real-life readiness. Our purpose is to cultivate mindful learners, stronger families, emotionally aware children, and authentic mentor-mentee relationships that inspire growth, resilience, and lifelong curiosity.
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

      {/* Our Team Section - HIDDEN */}
      {/* <section
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
      </section> */}

      {/* Impact Overview Section - HIDDEN */}
      {/* <section id="impact" ref={setRef("impact")} className="py-20 bg-white">
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
      </section> */}

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
                <li>
                  <a
                    href="mailto:mentorshipclubfl@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    mentorshipclubfl@gmail.com
                  </a>
                </li>
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
