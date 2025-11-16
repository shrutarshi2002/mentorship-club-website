"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Mentors() {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-8 pb-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Become a <span className="text-red-600">Mentor</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our community of mentors and help shape the next generation
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Mentor Application Instructions */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 mb-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Become a Mentor at Mentorship Club
            </h2>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                At Mentorship Club, mentors are the backbone of our mission. You
                bring knowledge, guidance, and encouragement to learners and
                entrepreneurs who are ready to grow. Whether you&apos;re an
                experienced professional, a business owner, or someone with
                unique life skills, your mentorship can make a lasting impact.
              </p>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">✨</span>
                  Who Can Become a Mentor?
                </h3>
                <p className="mb-4">
                  We welcome individuals from diverse backgrounds who are
                  passionate about sharing and giving back:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      <strong>Industry Experts</strong> – Professionals with
                      years of experience in their field who can guide others on
                      career and skill-building paths.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      <strong>Business Owners & Entrepreneurs</strong> – Those
                      who have built, managed, or scaled a business and want to
                      help others avoid common pitfalls.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      <strong>Educators & Trainers</strong> – Teachers, coaches,
                      or facilitators skilled in communication, public speaking,
                      leadership, or other life skills.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      <strong>Young Professionals</strong> – Even early-career
                      individuals can mentor in areas like coding, social media,
                      or emerging digital skills.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>
                      <strong>Anyone Willing to Give Time</strong> – If
                      you&apos;re passionate about empowering youth, students,
                      or small business owners, you&apos;re welcome.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">📌</span>
                  What Does a Mentor Do?
                </h3>
                <p className="mb-4">
                  Being a mentor at Mentorship Club is about guiding, not
                  lecturing. You will:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>
                      <strong>Inspire & Guide</strong> – Share your journey,
                      experiences, and practical tips with mentees.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>
                      <strong>Skill Development</strong> – Teach real-world
                      skills such as communication, financial literacy,
                      marketing, design, coding, fitness, or entrepreneurship.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>
                      <strong>Support Career Growth</strong> – Help students and
                      professionals explore opportunities, prepare for
                      interviews, or plan their career paths.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>
                      <strong>Encourage Businesses</strong> – Advise
                      entrepreneurs on marketing, operations, customer service,
                      and growth strategies.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>
                      <strong>Offer Opportunities</strong> – If possible,
                      provide internships, projects, or exposure to your work
                      environment.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🛠️</span>
                  How You Can Contribute
                </h3>
                <p className="mb-4">
                  Your role as a mentor is flexible. You can choose how you give
                  back:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      1:1 Mentorship Sessions
                    </h4>
                    <p className="text-sm text-gray-600">
                      Personal guidance to help mentees with their challenges.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Group Workshops
                    </h4>
                    <p className="text-sm text-gray-600">
                      Share your knowledge with a wider audience in structured
                      online classes.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Internship Offers
                    </h4>
                    <p className="text-sm text-gray-600">
                      Provide hands-on exposure to students or young
                      professionals.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Skill-Specific Training
                    </h4>
                    <p className="text-sm text-gray-600">
                      Conduct sessions on your area of expertise.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">🌍</span>
                  Why Mentor with Us?
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>
                      <strong>Impact Lives Directly</strong> – Every session you
                      take can open a door for someone&apos;s future.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>
                      <strong>Flexibility</strong> – Choose when and how often
                      you mentor; sessions are online and convenient.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>
                      <strong>Community</strong> – Join a supportive network of
                      mentors who believe in empowering the next generation.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>
                      <strong>Recognition</strong> – Your contribution will be
                      valued and celebrated as part of our growing community.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="text-2xl mr-2">✅</span>
                  How to Get Started
                </h3>
                <ol className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      1
                    </span>
                    <span>
                      <strong>Apply Online</strong> – Fill out our mentor
                      application form.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      2
                    </span>
                    <span>
                      <strong>Meet Our Team</strong> – We&apos;ll connect with
                      you to understand your skills and interests.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      3
                    </span>
                    <span>
                      <strong>Get Onboarded</strong> – Simple orientation to
                      help you begin.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      4
                    </span>
                    <span>
                      <strong>Start Mentoring</strong> – Begin making an impact
                      by guiding mentees!
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8">
            <Link
              href="/mentor-application"
              className="inline-block bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            >
              Apply to Become a Mentor
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section for Mentors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="text-red-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about becoming a mentor
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
                    Q1. Who can become a mentor?
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
                      Any professional, entrepreneur, or expert with knowledge,
                      skills, or experience can join. The key requirement is a
                      willingness to guide and share insights with mentees.
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
                    Q2. Do I need teaching experience?
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
                      No teaching background is necessary. What matters is your
                      real-world experience, and we&apos;ll support you with
                      orientation and teaching guidelines if needed.
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
                    Q3. What knowledge can I share?
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
                      Mentors can share technical skills, business strategies,
                      leadership insights, or even life lessons. From coding and
                      marketing to people management and financial literacy, all
                      expertise is valuable.
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
                    Q4. How much time is required?
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
                      It&apos;s flexible. Some mentors commit just a couple of
                      hours a month, while others run structured weekly
                      workshops. You choose what fits your schedule.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 5 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 5 ? null : 5)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q5. Can I choose my audience?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 5 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 5 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      Yes. You can specify whether you&apos;d prefer to mentor
                      school students, college learners, working professionals,
                      or entrepreneurs.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 6 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 6 ? null : 6)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q6. Can I create my own workshop?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 6 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 6 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      Yes. Many mentors design their own programs or sessions
                      based on their strengths and passion areas, which makes
                      the learning experience richer for mentees.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 7 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 7 ? null : 7)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q7. How are mentees assigned to me?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 7 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 7 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      Our team reviews mentee profiles and matches them with
                      mentors whose expertise aligns with their goals. This
                      ensures productive mentoring for both sides.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 8 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 8 ? null : 8)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q8. Do mentors get paid?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 8 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 8 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      No, this is voluntary. However, mentors receive
                      recognition, certificates, and visibility through our
                      platform as a token of appreciation.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 9 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 9 ? null : 9)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q9. Can I mentor multiple mentees?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 9 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 9 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      Yes. You can choose to run group sessions, or opt for
                      focused one-to-one mentoring if that suits you better.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 10 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 10 ? null : 10)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q10. What support will I get?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 10 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 10 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      We provide technical support for online sessions,
                      communication assistance, and guidance to structure your
                      workshops effectively.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
