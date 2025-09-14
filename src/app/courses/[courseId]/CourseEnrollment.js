"use client";

import { useState } from "react";

export default function CourseEnrollment({ course }) {
  const [isEnrolled, setIsEnrolled] = useState(false);

  return (
    <>
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => {
            const emailData = {
              to: "mentorshipclubfl@gmail.com",
              subject: `Course Enrollment Request - ${course.title}`,
              body: `
Course Enrollment Request

I would like to enroll in:
Course: ${course.title}
Price: ${course.price}
Description: ${course.description || "N/A"}

Please contact me to complete my enrollment and payment.

---
This request was sent from the Mentorship Club course enrollment page.
              `.trim(),
            };

            const mailtoLink = `mailto:${
              emailData.to
            }?subject=${encodeURIComponent(
              emailData.subject
            )}&body=${encodeURIComponent(emailData.body)}`;
            window.location.href = mailtoLink;

            alert(
              "Your course enrollment request has been prepared for email. Your default email client should open with a pre-filled email to mentorshipclubfl@gmail.com. Please send the email to complete your enrollment request."
            );
          }}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Enroll Now - {course.price}
        </button>
        <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
          Preview Course
        </button>
      </div>

      {/* Enrollment Modal */}
      {isEnrolled && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Enrollment Successful!
            </h3>
            <p className="text-gray-600 mb-6">
              Welcome to {course.title}! You now have access to all course
              materials and can start learning immediately.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsEnrolled(false)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Start Learning
              </button>
              <button
                onClick={() => setIsEnrolled(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
