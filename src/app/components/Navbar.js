"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Image
                  src="/assets/logo.png"
                  alt="MentorshipClub Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </Link>
              <Link href="/">
                <h1 className="text-2xl font-bold">
                  <span className="text-yellow-500">Mentorship</span>
                  <span className="text-black">Club</span>
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/programs"
                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Programs
              </Link>
              {/* Mentors link hidden */}
              {/* <Link
                href="/mentors"
                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Mentors
              </Link> */}
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
              <Link
                href="/mentor-application"
                className="bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-yellow-500 transition-colors"
              >
                Become a Mentor
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative p-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen
                        ? "rotate-45 translate-y-1.5"
                        : "-translate-y-1"
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen
                        ? "-rotate-45 -translate-y-1.5"
                        : "translate-y-1"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-50" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute inset-y-0 right-0 w-80 max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-yellow-50 to-blue-50">
            <div className="flex items-center space-x-3">
              <Image
                src="/assets/logo.png"
                alt="MentorshipClub Logo"
                width={36}
                height={36}
                className="object-contain"
              />
              <h1 className="text-xl font-bold">
                <span className="text-yellow-500">Mentorship</span>
                <span className="text-black">Club</span>
              </h1>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              aria-label="Close menu"
            >
              <svg
                className="h-5 w-5"
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

          {/* Navigation Links */}
          <div className="px-6 py-8 space-y-2">
            <Link
              href="/"
              className="flex items-center px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl text-base font-medium transition-all duration-200 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="w-5 h-5 mr-3 text-gray-400 group-hover:text-red-500 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>
            <Link
              href="/about"
              className="flex items-center px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl text-base font-medium transition-all duration-200 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="w-5 h-5 mr-3 text-gray-400 group-hover:text-red-500 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About
            </Link>
            <Link
              href="/programs"
              className="flex items-center px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl text-base font-medium transition-all duration-200 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="w-5 h-5 mr-3 text-gray-400 group-hover:text-red-500 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Programs
            </Link>
            {/* Mentors mobile link hidden */}
            {/* <Link
              href="/mentors"
              className="flex items-center px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl text-base font-medium transition-all duration-200 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="w-5 h-5 mr-3 text-gray-400 group-hover:text-red-500 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                />
              </svg>
              Mentors
            </Link> */}
            <Link
              href="/contact"
              className="flex items-center px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl text-base font-medium transition-all duration-200 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="w-5 h-5 mr-3 text-gray-400 group-hover:text-red-500 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-8">
            <div className="pt-6 border-t border-gray-100 space-y-3">
              {/* Authentication Buttons */}
              <Link
                href="/login"
                className="flex items-center justify-center w-full bg-white text-red-600 border-2 border-red-600 px-6 py-3 rounded-xl text-base font-semibold hover:bg-red-50 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center w-full bg-red-600 text-white px-6 py-3 rounded-xl text-base font-semibold hover:bg-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Sign Up
              </Link>
              <Link
                href="/mentor-application"
                className="flex items-center justify-center w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl text-base font-semibold hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
                Become a Mentor
              </Link>
              <Link
                href="/mentee-application"
                className="flex items-center justify-center w-full bg-white text-black border-2 border-gray-300 px-6 py-3 rounded-xl text-base font-semibold hover:bg-yellow-50 hover:border-yellow-400 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Become a Mentee
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
