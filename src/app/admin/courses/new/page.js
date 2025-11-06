"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    duration: "",
    price: "",
    published: false,
    mentorId: "",
    syllabus: "",
    requirements: "",
    imageUrl: "",
    ageGroup: "",
    schedule: "",
    maxStudents: 20,
  });
  const [mentors, setMentors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Fetch approved mentors
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/admin/users?role=mentor&status=approved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setMentors(data.users || []);
        }
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      }
    };
    fetchMentors();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      
      // Transform form data to match API expectations
      const courseData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        difficulty: formData.level, // Map level to difficulty
        ageGroup: formData.ageGroup,
        mentorId: formData.mentorId ? parseInt(formData.mentorId) : undefined,
        syllabus: formData.syllabus,
        schedule: formData.schedule,
        bannerImage: formData.imageUrl || undefined, // Map imageUrl to bannerImage
        maxStudents: parseInt(formData.maxStudents) || 20,
        price: formData.price ? parseFloat(formData.price) : 0,
      };

      const response = await fetch("/api/admin/courses", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();
      if (data.success) {
        router.push("/admin/courses");
      } else {
        setError(data.message || "Failed to create course");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
        <p className="text-gray-600 mt-2">Add a new course to the system</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Title *
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Web Development"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Level/Difficulty *
            </label>
            <select
              name="level"
              required
              value={formData.level}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Group *
            </label>
            <select
              name="ageGroup"
              required
              value={formData.ageGroup}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Select age group</option>
              <option value="10-13">10-13</option>
              <option value="14-18">14-18</option>
              <option value="16-18">16-18</option>
              <option value="18+">18+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mentor
            </label>
            <select
              name="mentorId"
              value={formData.mentorId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">Select a mentor (optional)</option>
              {mentors.map((mentor) => (
                <option key={mentor.id} value={mentor.id}>
                  {mentor.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (hours)
            </label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Students
            </label>
            <input
              type="number"
              name="maxStudents"
              value={formData.maxStudents || 20}
              onChange={handleChange}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL (Banner)
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.png"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Schedule *
            </label>
            <input
              type="text"
              name="schedule"
              required
              value={formData.schedule}
              onChange={handleChange}
              placeholder="e.g., Tuesdays & Thursdays, 4:00 PM - 5:30 PM"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Syllabus
            </label>
            <textarea
              name="syllabus"
              rows={6}
              value={formData.syllabus}
              onChange={handleChange}
              placeholder="Enter course syllabus or curriculum..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Requirements
            </label>
            <textarea
              name="requirements"
              rows={4}
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Enter course prerequisites..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Publish immediately
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? "Creating..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
}

