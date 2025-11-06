"use client";

import { useState, useEffect } from "react";

export default function AdminAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/analytics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setAnalytics(data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600 mt-2">System-wide statistics and insights</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900">{analytics?.totalUsers || 0}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Active Courses</h3>
            <p className="text-3xl font-bold text-gray-900">{analytics?.activeCourses || 0}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Enrollments</h3>
            <p className="text-3xl font-bold text-gray-900">{analytics?.totalEnrollments || 0}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Completion Rate</h3>
            <p className="text-3xl font-bold text-gray-900">{analytics?.completionRate || 0}%</p>
          </div>
        </div>
      )}
    </div>
  );
}

