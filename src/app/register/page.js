"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    role: "student",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Student fields
    age: "",
    grade: "",
    school: "",
    interestedCourses: [],
    // Mentor fields
    phone: "",
    expertise: [],
    experience: "",
    education: "",
    motivation: "",
    availability: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    const currentArray = formData[name] || [];
    if (e.target.checked) {
      setFormData((prev) => ({
        ...prev,
        [name]: [...currentArray, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: currentArray.filter((item) => item !== value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/enhanced-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        if (formData.role === "mentor") {
          setSuccess(
            "Mentor application submitted successfully! Please wait for admin approval."
          );
        } else {
          // Store token and redirect for students
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          router.push("/student/dashboard");
        }
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
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
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              href="/login"
              className="font-medium text-red-600 hover:text-red-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I want to register as:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === "student"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.role === "student"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-center">
                      <svg
                        className="mx-auto h-8 w-8 text-gray-400 mb-2"
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
                      <p className="font-medium">Student</p>
                      <p className="text-sm text-gray-500">Learn and grow</p>
                    </div>
                  </div>
                </label>
                <label className="relative">
                  <input
                    type="radio"
                    name="role"
                    value="mentor"
                    checked={formData.role === "mentor"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.role === "mentor"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-center">
                      <svg
                        className="mx-auto h-8 w-8 text-gray-400 mb-2"
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
                      <p className="font-medium">Mentor</p>
                      <p className="text-sm text-gray-500">Teach and guide</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Student-specific fields */}
            {formData.role === "student" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Age *
                    </label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      required
                      min="13"
                      max="25"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="grade"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Grade Level *
                    </label>
                    <select
                      name="grade"
                      id="grade"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                      value={formData.grade}
                      onChange={handleChange}
                    >
                      <option value="">Select Grade</option>
                      <option value="8th">8th Grade</option>
                      <option value="9th">9th Grade</option>
                      <option value="10th">10th Grade</option>
                      <option value="11th">11th Grade</option>
                      <option value="12th">12th Grade</option>
                      <option value="College">College</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="school"
                    className="block text-sm font-medium text-gray-700"
                  >
                    School Name *
                  </label>
                  <input
                    type="text"
                    name="school"
                    id="school"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    value={formData.school}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Areas of Interest (Select all that apply)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      "Web Development",
                      "Data Science",
                      "Mobile Apps",
                      "AI/ML",
                      "Design",
                      "Business",
                    ].map((course) => (
                      <label key={course} className="flex items-center">
                        <input
                          type="checkbox"
                          name="interestedCourses"
                          value={course}
                          checked={formData.interestedCourses.includes(course)}
                          onChange={handleArrayChange}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {course}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Mentor-specific fields */}
            {formData.role === "mentor" && (
              <>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Areas of Expertise (Select all that apply) *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      "Web Development",
                      "Data Science",
                      "Mobile Apps",
                      "AI/ML",
                      "Design",
                      "Business",
                      "Marketing",
                      "Finance",
                    ].map((skill) => (
                      <label key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          name="expertise"
                          value={skill}
                          checked={formData.expertise.includes(skill)}
                          onChange={handleArrayChange}
                          className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {skill}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Work Experience *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    id="experience"
                    required
                    placeholder="e.g., 5+ years in software development"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="education"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Education *
                  </label>
                  <input
                    type="text"
                    name="education"
                    id="education"
                    required
                    placeholder="e.g., Bachelor's in Computer Science"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    value={formData.education}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="motivation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Why do you want to become a mentor? *
                  </label>
                  <textarea
                    name="motivation"
                    id="motivation"
                    required
                    rows={3}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    value={formData.motivation}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="availability"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Availability *
                  </label>
                  <input
                    type="text"
                    name="availability"
                    id="availability"
                    required
                    placeholder="e.g., Weekends and evenings"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                    value={formData.availability}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {/* Password fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  minLength="6"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  required
                  minLength="6"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      {success}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


