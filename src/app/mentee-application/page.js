"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function MenteeApplication() {
  const [formData, setFormData] = useState({
    // Section 1: Personal & Contact Information
    fullName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    city: "",
    country: "",
    educationLevel: "",
    linkedinProfile: "",

    // Section 2: Goals & Interests
    mainGoals: "",
    mentorshipAreas: [],
    otherMentorshipArea: "",
    specificSkills: "",
    preferredMentorAge: "",

    // Section 3: Availability & Format
    mentoringFormat: [],
    sessionLength: "",
    weeklyAvailability: "",
    startDate: "",

    // Section 4: Expectations & Support
    mentoredBefore: "",
    pastExperience: "",
    howMentorshipWillHelp: "",
    specialSupport: "",

    // Section 5: Compliance & Policies
    attendSessions: false,
    respectMentor: false,
    dataPrivacy: false,

    // Section 6: Confirmation
    whySelectMe: "",
    signature: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [currentSection, setCurrentSection] = useState(1);
  const [errors, setErrors] = useState({});

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "India",
    "Japan",
    "Brazil",
    "Mexico",
    "Other",
  ];

  const educationLevels = [
    "School",
    "College",
    "Graduate",
    "Working Professional",
  ];

  const mentorshipAreas = [
    "Communication",
    "Public Speaking",
    "Career Clarity",
    "Coding/Tech",
    "Financial Literacy",
    "Marketing",
    "Graphic Design",
    "Entrepreneurship",
    "Resume/Interview Preparation",
    "Leadership Skills",
    "Other",
  ];

  const mentorAgeGroups = [
    "Student Mentor (closer to my age)",
    "Experienced Professional",
    "No preference",
  ];

  const mentoringFormats = ["1-on-1 Mentorship", "Group Sessions", "Workshops"];
  const sessionLengths = ["30 min", "45 min", "60 min"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name.includes("[]")) {
        const fieldName = name.replace("[]", "");
        setFormData((prev) => ({
          ...prev,
          [fieldName]: checked
            ? [...prev[fieldName], value]
            : prev[fieldName].filter((item) => item !== value),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateSection = (section) => {
    const newErrors = {};

    switch (section) {
      case 1:
        if (!formData.fullName) newErrors.fullName = "Full name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Email is invalid";
        }
        if (!formData.age) newErrors.age = "Age is required";
        if (formData.age && (isNaN(formData.age) || formData.age < 1)) {
          newErrors.age = "Please enter a valid age";
        }
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.educationLevel)
          newErrors.educationLevel = "Education level is required";
        if (
          formData.linkedinProfile &&
          !formData.linkedinProfile.includes("linkedin.com")
        ) {
          newErrors.linkedinProfile = "Please enter a valid LinkedIn URL";
        }
        break;
      case 2:
        if (!formData.mainGoals)
          newErrors.mainGoals = "Main goals are required";
        if (formData.mentorshipAreas.length === 0) {
          newErrors.mentorshipAreas =
            "At least one mentorship area is required";
        }
        if (!formData.specificSkills)
          newErrors.specificSkills = "Specific skills are required";
        break;
      case 3:
        if (formData.mentoringFormat.length === 0) {
          newErrors.mentoringFormat =
            "At least one mentoring format is required";
        }
        if (!formData.sessionLength)
          newErrors.sessionLength = "Session length is required";
        if (!formData.weeklyAvailability)
          newErrors.weeklyAvailability = "Weekly availability is required";
        if (!formData.startDate) newErrors.startDate = "Start date is required";
        break;
      case 4:
        if (!formData.howMentorshipWillHelp)
          newErrors.howMentorshipWillHelp = "This field is required";
        break;
      case 5:
        if (!formData.attendSessions)
          newErrors.attendSessions = "This agreement is required";
        if (!formData.respectMentor)
          newErrors.respectMentor = "This agreement is required";
        if (!formData.dataPrivacy)
          newErrors.dataPrivacy = "This consent is required";
        break;
      case 6:
        if (!formData.whySelectMe)
          newErrors.whySelectMe = "This field is required";
        if (!formData.signature) newErrors.signature = "Signature is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection((prev) => Math.min(prev + 1, 6));
    }
  };

  const prevSection = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateSection(6)) {
      // Prepare email data
      const emailData = {
        to: "mentorshipclubfl@gmail.com",
        subject: "New Mentee Application - " + formData.fullName,
        body: `
New Mentee Application Received

PERSONAL & CONTACT INFORMATION:
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Age: ${formData.age}
Gender: ${formData.gender}
City: ${formData.city}
Country: ${formData.country}
Education Level: ${formData.educationLevel}
LinkedIn Profile: ${formData.linkedinProfile}

GOALS & INTERESTS:
Main Goals: ${formData.mainGoals}
Mentorship Areas: ${formData.mentorshipAreas.join(", ")}
Other Mentorship Area: ${formData.otherMentorshipArea}
Specific Skills: ${formData.specificSkills}
Preferred Mentor Age: ${formData.preferredMentorAge}

AVAILABILITY & FORMAT:
Mentoring Format: ${formData.mentoringFormat.join(", ")}
Session Length: ${formData.sessionLength}
Weekly Availability: ${formData.weeklyAvailability}
Start Date: ${formData.startDate}

EXPECTATIONS & SUPPORT:
Mentored Before: ${formData.mentoredBefore}
Past Experience: ${formData.pastExperience}
How Mentorship Will Help: ${formData.howMentorshipWillHelp}
Special Support: ${formData.specialSupport}

COMPLIANCE & POLICIES:
Attend Sessions: ${formData.attendSessions ? "Agreed" : "Not Agreed"}
Respect Mentor: ${formData.respectMentor ? "Agreed" : "Not Agreed"}
Data Privacy: ${formData.dataPrivacy ? "Agreed" : "Not Agreed"}

CONFIRMATION:
Why Select Me: ${formData.whySelectMe}
Signature: ${formData.signature}
Date: ${formData.date}
        `.trim(),
      };

      // Create mailto link
      const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(
        emailData.subject
      )}&body=${encodeURIComponent(emailData.body)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      alert(
        "Your mentee application has been prepared for email. Your default email client should open with a pre-filled email to mentorshipclubfl@gmail.com. Please send the email to complete your application submission."
      );
    }
  };

  const renderSection1 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Personal & Contact Information
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone/WhatsApp Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
              errors.age ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your age"
            min="1"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your city"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Education Level <span className="text-red-500">*</span>
          </label>
          <select
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 ${
              errors.educationLevel ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select education level</option>
            {educationLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.educationLevel && (
            <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile (if any)
          </label>
          <input
            type="url"
            name="linkedinProfile"
            value={formData.linkedinProfile}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
              errors.linkedinProfile ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="https://linkedin.com/in/yourprofile"
          />
          {errors.linkedinProfile && (
            <p className="text-red-500 text-sm mt-1">
              {errors.linkedinProfile}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderSection2 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Goals & Interests
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What are your main goals for joining Mentorship Club?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          name="mainGoals"
          value={formData.mainGoals}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
            errors.mainGoals ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Tell us about your goals and what you hope to achieve"
        />
        {errors.mainGoals && (
          <p className="text-red-500 text-sm mt-1">{errors.mainGoals}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Areas you want mentorship in <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {mentorshipAreas.map((area) => (
            <label key={area} className="flex items-center">
              <input
                type="checkbox"
                name="mentorshipAreas[]"
                value={area}
                checked={formData.mentorshipAreas.includes(area)}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{area}</span>
            </label>
          ))}
        </div>
        {errors.mentorshipAreas && (
          <p className="text-red-500 text-sm mt-1">{errors.mentorshipAreas}</p>
        )}
        {formData.mentorshipAreas.includes("Other") && (
          <input
            type="text"
            name="otherMentorshipArea"
            value={formData.otherMentorshipArea}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 mt-2"
            placeholder="Please specify other area"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specific skills/topics you&apos;d like to learn{" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="specificSkills"
          value={formData.specificSkills}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
            errors.specificSkills ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., React, Python, Digital Marketing, Leadership, etc."
        />
        {errors.specificSkills && (
          <p className="text-red-500 text-sm mt-1">{errors.specificSkills}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Age Group of Mentor
        </label>
        <div className="space-y-2">
          {mentorAgeGroups.map((group) => (
            <label key={group} className="flex items-center">
              <input
                type="radio"
                name="preferredMentorAge"
                value={group}
                checked={formData.preferredMentorAge === group}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{group}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSection3 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Availability & Format
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Mentoring Format <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {mentoringFormats.map((format) => (
            <label key={format} className="flex items-center">
              <input
                type="checkbox"
                name="mentoringFormat[]"
                value={format}
                checked={formData.mentoringFormat.includes(format)}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{format}</span>
            </label>
          ))}
        </div>
        {errors.mentoringFormat && (
          <p className="text-red-500 text-sm mt-1">{errors.mentoringFormat}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred Session Length <span className="text-red-500">*</span>
        </label>
        <select
          name="sessionLength"
          value={formData.sessionLength}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 ${
            errors.sessionLength ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select session length</option>
          {sessionLengths.map((length) => (
            <option key={length} value={length}>
              {length}
            </option>
          ))}
        </select>
        {errors.sessionLength && (
          <p className="text-red-500 text-sm mt-1">{errors.sessionLength}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Weekly Availability <span className="text-red-500">*</span>
        </label>
        <textarea
          name="weeklyAvailability"
          value={formData.weeklyAvailability}
          onChange={handleInputChange}
          rows={3}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
            errors.weeklyAvailability ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., Mon evenings, Sat mornings, etc."
        />
        {errors.weeklyAvailability && (
          <p className="text-red-500 text-sm mt-1">
            {errors.weeklyAvailability}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Earliest Start Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.startDate ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>
        )}
      </div>
    </div>
  );

  const renderSection4 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Expectations & Support
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Have you been mentored before?
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="mentoredBefore"
              value="Yes"
              checked={formData.mentoredBefore === "Yes"}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="mentoredBefore"
              value="No"
              checked={formData.mentoredBefore === "No"}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
        {formData.mentoredBefore === "Yes" && (
          <textarea
            name="pastExperience"
            value={formData.pastExperience}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 mt-2"
            placeholder="Please describe your past mentoring experience"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How do you think mentorship will help you?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          name="howMentorshipWillHelp"
          value={formData.howMentorshipWillHelp}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
            errors.howMentorshipWillHelp ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Tell us how you believe mentorship will benefit you"
        />
        {errors.howMentorshipWillHelp && (
          <p className="text-red-500 text-sm mt-1">
            {errors.howMentorshipWillHelp}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Do you need any special support (learning accommodations,
          accessibility needs, etc.)?
        </label>
        <textarea
          name="specialSupport"
          value={formData.specialSupport}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600"
          placeholder="Please let us know if you have any special requirements"
        />
      </div>
    </div>
  );

  const renderSection5 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Compliance & Policies
      </h3>

      <div className="space-y-4">
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="attendSessions"
              checked={formData.attendSessions}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              I agree to attend sessions on time and actively participate{" "}
              <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.attendSessions && (
            <p className="text-red-500 text-sm mt-1">{errors.attendSessions}</p>
          )}
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="respectMentor"
              checked={formData.respectMentor}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              I will respect my mentor&apos;s time and follow the Code of
              Conduct <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.respectMentor && (
            <p className="text-red-500 text-sm mt-1">{errors.respectMentor}</p>
          )}
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="dataPrivacy"
              checked={formData.dataPrivacy}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              I consent to data & privacy policy{" "}
              <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.dataPrivacy && (
            <p className="text-red-500 text-sm mt-1">{errors.dataPrivacy}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderSection6 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Confirmation</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Why should we select you as a mentee?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          name="whySelectMe"
          value={formData.whySelectMe}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
            errors.whySelectMe ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Tell us why you would be a great mentee"
        />
        {errors.whySelectMe && (
          <p className="text-red-500 text-sm mt-1">{errors.whySelectMe}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Signature (type your full name){" "}
          <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="signature"
          value={formData.signature}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
            errors.signature ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Type your full name as signature"
        />
        {errors.signature && (
          <p className="text-red-500 text-sm mt-1">{errors.signature}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date
        </label>
        <input
          type="text"
          value={formData.date}
          disabled
          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Mentee Application Form
            </h1>
            <p className="text-gray-600">
              Join our community and start your learning journey with expert
              mentors
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Section {currentSection} of 6
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentSection / 6) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentSection / 6) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Sections */}
          <form onSubmit={handleSubmit}>
            <div className="min-h-[600px]">
              {currentSection === 1 && (
                <div className="animate-fade-in">{renderSection1()}</div>
              )}
              {currentSection === 2 && (
                <div className="animate-fade-in">{renderSection2()}</div>
              )}
              {currentSection === 3 && (
                <div className="animate-fade-in">{renderSection3()}</div>
              )}
              {currentSection === 4 && (
                <div className="animate-fade-in">{renderSection4()}</div>
              )}
              {currentSection === 5 && (
                <div className="animate-fade-in">{renderSection5()}</div>
              )}
              {currentSection === 6 && (
                <div className="animate-fade-in">{renderSection6()}</div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevSection}
                disabled={currentSection === 1}
                className={`px-6 py-2 rounded-md font-medium ${
                  currentSection === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>

              {currentSection < 6 ? (
                <button
                  type="button"
                  onClick={nextSection}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
                >
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Mentorship Club Branding */}
            <div className="col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/assets/logo2.png"
                  alt="MentorshipClub Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <h3 className="text-2xl font-bold">
                  <span className="text-yellow-500">Mentorship</span>
                  <span className="text-white">Club</span>
                </h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Empowering the next generation of leaders through meaningful
                mentorship and real-world skills.
              </p>
            </div>

            {/* Programs Section */}
            <div className="col-span-1">
              <h4 className="text-white font-bold text-lg mb-4">Programs</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Marketing & Branding
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    AI & Technology
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Communication Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Personal Development
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div className="col-span-1">
              <h4 className="text-white font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Success Stories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Events
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="col-span-1">
              <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
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
