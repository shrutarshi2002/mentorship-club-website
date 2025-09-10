"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";

export default function Mentors() {
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  const mentors = [
    {
      name: "Sarah Johnson",
      role: "Marketing Expert",
      image: "/assets/mentors/1.png",
      expertise: "Digital Marketing, Brand Strategy",
      experience: "10+ years",
      rating: 4.9,
      students: 150,
    },
    {
      name: "Michael Chen",
      role: "AI & Technology Lead",
      image: "/assets/mentors/2.jpg",
      expertise: "Machine Learning, Python, AI Ethics",
      experience: "8+ years",
      rating: 4.8,
      students: 120,
    },
    {
      name: "Emily Rodriguez",
      role: "Communication Coach",
      image: "/assets/mentors/3.jpg",
      expertise: "Public Speaking, Leadership",
      experience: "12+ years",
      rating: 4.9,
      students: 200,
    },
    {
      name: "David Thompson",
      role: "Business Strategy",
      image: "/assets/mentors/4.jpg",
      expertise: "Entrepreneurship, Business Development",
      experience: "15+ years",
      rating: 4.7,
      students: 180,
    },
    {
      name: "Lisa Wang",
      role: "Creative Director",
      image: "/assets/mentors/5.jpg",
      expertise: "Design, Content Creation",
      experience: "9+ years",
      rating: 4.8,
      students: 95,
    },
    {
      name: "James Rodriguez",
      role: "Career Development",
      image: "/assets/mentors/6.jpg",
      expertise: "Career Planning, Interview Prep",
      experience: "11+ years",
      rating: 4.9,
      students: 160,
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
            Meet Our <span className="text-red-600">Mentors</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from industry experts who are passionate about sharing their
            knowledge and helping you achieve your goals.
          </p>
        </div>
      </section>

      {/* Mentors Grid */}
      <section id="mentors-grid" ref={setRef("mentors-grid")} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`transform transition-all duration-1000 ${
              isVisible["mentors-grid"]
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {mentors.map((mentor, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Mentor Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-gray-700">
                        {mentor.experience}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {mentor.name}
                    </h3>
                    <p className="text-red-600 font-semibold mb-3">
                      {mentor.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {mentor.expertise}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-semibold">
                          {mentor.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {mentor.students} students
                      </span>
                    </div>
                    <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                      Book Session
                    </button>
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
            Ready to Connect with a Mentor?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Start your journey with personalized guidance from our expert
            mentors. Book a session today and take the first step towards your
            goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Get Started Today
            </Link>
            <Link
              href="/programs"
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              View Programs
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
