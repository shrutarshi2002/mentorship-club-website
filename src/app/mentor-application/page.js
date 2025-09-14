"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function MentorApplication() {
  const [formData, setFormData] = useState({
    // Section 1: Personal & Contact Information
    fullName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    timeZone: "",
    linkedinProfile: "",
    website: "",
    languages: [],
    hearAboutUs: "",
    hearAboutUsOther: "",

    // Section 2: Expertise & Fit
    yearsExperience: "",
    highestEducation: "",
    currentRole: "",
    employer: "",
    shortBio: "",
    primaryDomains: [],
    industryExpertise: [],
    specificSkills: "",
    ageGroups: [],
    mentoringFormat: [],
    sessionMedium: [],
    inPersonCity: "",
    pastExperience: "",
    pastExperienceDescription: "",

    // Section 3: Availability & Logistics
    weeklyAvailability: "",
    timeCommitment: "",
    startDate: "",
    sessionLength: "",
    groupCapacity: "",
    curriculumMaterials: "",
    techRequirements: [],

    // Section 4: Compliance & Policies
    mentorMinors: "",
    backgroundCheckConsent: false,
    backgroundCheckUpload: null,
    countryEligibility: "",
    codeOfConduct: false,
    dataPrivacy: false,
    nonSolicitation: false,

    // Section 5: Confirmation
    whyMentor: "",
    conflictOfInterest: "",
    signature: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [currentSection, setCurrentSection] = useState(1);
  const [errors, setErrors] = useState({});
  const [openFAQ, setOpenFAQ] = useState(null);

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

  const timeZones = [
    "UTC-12",
    "UTC-11",
    "UTC-10",
    "UTC-9",
    "UTC-8",
    "UTC-7",
    "UTC-6",
    "UTC-5",
    "UTC-4",
    "UTC-3",
    "UTC-2",
    "UTC-1",
    "UTC+0",
    "UTC+1",
    "UTC+2",
    "UTC+3",
    "UTC+4",
    "UTC+5",
    "UTC+6",
    "UTC+7",
    "UTC+8",
    "UTC+9",
    "UTC+10",
    "UTC+11",
    "UTC+12",
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Chinese",
    "Japanese",
    "Korean",
    "Arabic",
    "Hindi",
    "Other",
  ];

  const educationLevels = [
    "High School",
    "Associate&apos;s Degree",
    "Bachelor&apos;s Degree",
    "Master&apos;s Degree",
    "Doctorate",
    "Professional Certification",
    "Other",
  ];

  const mentoringDomains = [
    "Communication",
    "Coding",
    "Financial Literacy",
    "Marketing",
    "Design",
    "Entrepreneurship",
    "Leadership",
    "Career Development",
    "Public Speaking",
    "Project Management",
    "Data Analysis",
    "Other",
  ];

  const industries = [
    "Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Marketing",
    "Design",
    "Engineering",
    "Consulting",
    "Non-profit",
    "Government",
    "Other",
  ];

  const ageGroups = [
    "Elementary (6-11)",
    "Middle School (12-14)",
    "High School (15-18)",
    "College (18-22)",
    "Young Adult (22-30)",
    "Adult (30+)",
  ];

  const mentoringFormats = ["1-on-1", "Group", "Workshop"];
  const sessionMediums = ["Zoom", "Google Meet", "Teams", "In-person"];
  const timeCommitments = [
    "1-2 hrs/week",
    "2-4 hrs/week",
    "4-6 hrs/week",
    "Flexible",
  ];
  const sessionLengths = ["30 mins", "45 mins", "60 mins", "90 mins"];
  const hearAboutUsOptions = [
    "Social Media",
    "Website",
    "Referral",
    "Event",
    "Search Engine",
    "Other",
  ];

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
    } else if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.files[0],
      }));
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
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.timeZone) newErrors.timeZone = "Time zone is required";
        if (!formData.linkedinProfile)
          newErrors.linkedinProfile = "LinkedIn profile is required";
        if (formData.languages.length === 0)
          newErrors.languages = "At least one language is required";
        if (!formData.hearAboutUs)
          newErrors.hearAboutUs = "Please tell us how you heard about us";
        break;
      case 2:
        if (!formData.yearsExperience)
          newErrors.yearsExperience = "Years of experience is required";
        if (!formData.currentRole)
          newErrors.currentRole = "Current role is required";
        if (!formData.shortBio) newErrors.shortBio = "Short bio is required";
        if (formData.shortBio) {
          const wordCount = formData.shortBio.trim().split(/\s+/).length;
          if (wordCount < 80 || wordCount > 200) {
            newErrors.shortBio = "Bio must be between 80-200 words";
          }
        }
        if (formData.primaryDomains.length === 0)
          newErrors.primaryDomains =
            "At least one mentoring domain is required";
        if (!formData.specificSkills)
          newErrors.specificSkills = "Specific skills are required";
        if (formData.ageGroups.length === 0)
          newErrors.ageGroups = "At least one age group is required";
        if (formData.mentoringFormat.length === 0)
          newErrors.mentoringFormat =
            "At least one mentoring format is required";
        if (formData.sessionMedium.length === 0)
          newErrors.sessionMedium = "At least one session medium is required";
        break;
      case 3:
        if (!formData.weeklyAvailability)
          newErrors.weeklyAvailability = "Weekly availability is required";
        if (!formData.timeCommitment)
          newErrors.timeCommitment = "Time commitment is required";
        if (!formData.startDate) newErrors.startDate = "Start date is required";
        if (!formData.sessionLength)
          newErrors.sessionLength = "Session length is required";
        break;
      case 4:
        if (!formData.mentorMinors)
          newErrors.mentorMinors =
            "Please specify if you&apos;re willing to mentor minors";
        if (
          formData.mentorMinors === "Yes" &&
          !formData.backgroundCheckConsent
        ) {
          newErrors.backgroundCheckConsent =
            "Background check consent is required for mentoring minors";
        }
        if (!formData.countryEligibility)
          newErrors.countryEligibility = "Country eligibility is required";
        if (!formData.codeOfConduct)
          newErrors.codeOfConduct = "Code of conduct agreement is required";
        if (!formData.dataPrivacy)
          newErrors.dataPrivacy = "Data privacy consent is required";
        if (!formData.nonSolicitation)
          newErrors.nonSolicitation = "Non-solicitation agreement is required";
        break;
      case 5:
        if (!formData.whyMentor)
          newErrors.whyMentor = "Please tell us why you want to be a mentor";
        if (!formData.signature) newErrors.signature = "Signature is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevSection = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateSection(5)) {
      // Prepare email data
      const emailData = {
        to: "mentorshipclubfl@gmail.com",
        subject: "New Mentor Application - " + formData.fullName,
        body: `
New Mentor Application Received

PERSONAL & CONTACT INFORMATION:
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
City: ${formData.city}
Country: ${formData.country}
Time Zone: ${formData.timeZone}
LinkedIn Profile: ${formData.linkedinProfile}
Website: ${formData.website}
Languages: ${formData.languages.join(", ")}
How did you hear about us: ${formData.hearAboutUs} ${
          formData.hearAboutUsOther ? `- ${formData.hearAboutUsOther}` : ""
        }

EXPERTISE & FIT:
Years of Experience: ${formData.yearsExperience}
Highest Education: ${formData.highestEducation}
Current Role: ${formData.currentRole}
Employer: ${formData.employer}
Short Bio: ${formData.shortBio}
Primary Domains: ${formData.primaryDomains.join(", ")}
Industry Expertise: ${formData.industryExpertise.join(", ")}
Specific Skills: ${formData.specificSkills}
Age Groups: ${formData.ageGroups.join(", ")}
Mentoring Format: ${formData.mentoringFormat.join(", ")}
Session Medium: ${formData.sessionMedium.join(", ")}
In-Person City: ${formData.inPersonCity}
Past Experience: ${formData.pastExperience}
Past Experience Description: ${formData.pastExperienceDescription}

AVAILABILITY & LOGISTICS:
Weekly Availability: ${formData.weeklyAvailability}
Time Commitment: ${formData.timeCommitment}
Start Date: ${formData.startDate}
Session Length: ${formData.sessionLength}
Group Capacity: ${formData.groupCapacity}
Curriculum Materials: ${formData.curriculumMaterials}
Tech Requirements: ${formData.techRequirements.join(", ")}

COMPLIANCE & POLICIES:
Mentor Minors: ${formData.mentorMinors}
Background Check Consent: ${formData.backgroundCheckConsent ? "Yes" : "No"}
Country Eligibility: ${formData.countryEligibility}
Code of Conduct: ${formData.codeOfConduct ? "Agreed" : "Not Agreed"}
Data Privacy: ${formData.dataPrivacy ? "Agreed" : "Not Agreed"}
Non-Solicitation: ${formData.nonSolicitation ? "Agreed" : "Not Agreed"}

CONFIRMATION:
Why do you want to mentor: ${formData.whyMentor}
Conflict of Interest: ${formData.conflictOfInterest}
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
        "Your mentor application has been prepared for email. Your default email client should open with a pre-filled email to mentorshipclubfl@gmail.com. Please send the email to complete your application submission."
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
            Phone/WhatsApp
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
            Time Zone <span className="text-red-500">*</span>
          </label>
          <select
            name="timeZone"
            value={formData.timeZone}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 ${
              errors.timeZone ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select your time zone</option>
            {timeZones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
          {errors.timeZone && (
            <p className="text-red-500 text-sm mt-1">{errors.timeZone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            LinkedIn Profile <span className="text-red-500">*</span>
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website/Portfolio
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600"
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Resume/CV
        </label>
        <input
          type="file"
          name="resume"
          onChange={handleInputChange}
          accept=".pdf,.doc,.docx"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Photo
        </label>
        <input
          type="file"
          name="profilePhoto"
          onChange={handleInputChange}
          accept="image/*"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Languages you can mentor in <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {languages.map((lang) => (
            <label key={lang} className="flex items-center">
              <input
                type="checkbox"
                name="languages[]"
                value={lang}
                checked={formData.languages.includes(lang)}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{lang}</span>
            </label>
          ))}
        </div>
        {errors.languages && (
          <p className="text-red-500 text-sm mt-1">{errors.languages}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How did you hear about us? <span className="text-red-500">*</span>
        </label>
        <select
          name="hearAboutUs"
          value={formData.hearAboutUs}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 ${
            errors.hearAboutUs ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select an option</option>
          {hearAboutUsOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.hearAboutUs && (
          <p className="text-red-500 text-sm mt-1">{errors.hearAboutUs}</p>
        )}
        {formData.hearAboutUs === "Other" && (
          <input
            type="text"
            name="hearAboutUsOther"
            value={formData.hearAboutUsOther}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 mt-2"
            placeholder="Please specify"
          />
        )}
      </div>
    </div>
  );

  const renderSection2 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Expertise & Fit</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Years of Professional Experience{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="yearsExperience"
            value={formData.yearsExperience}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
              errors.yearsExperience ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter years of experience"
            min="0"
          />
          {errors.yearsExperience && (
            <p className="text-red-500 text-sm mt-1">
              {errors.yearsExperience}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Highest Education
          </label>
          <select
            name="highestEducation"
            value={formData.highestEducation}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="">Select education level</option>
            {educationLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Role/Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="currentRole"
            value={formData.currentRole}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
              errors.currentRole ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your current role"
          />
          {errors.currentRole && (
            <p className="text-red-500 text-sm mt-1">{errors.currentRole}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employer/Organization
          </label>
          <input
            type="text"
            name="employer"
            value={formData.employer}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600"
            placeholder="Enter your employer"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short Bio <span className="text-red-500">*</span> (80-200 words)
        </label>
        <textarea
          name="shortBio"
          value={formData.shortBio}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
            errors.shortBio ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Tell us about yourself, your experience, and what makes you a great mentor"
        />
        <div className="text-sm text-gray-500 mt-1">
          {formData.shortBio ? formData.shortBio.trim().split(/\s+/).length : 0}
          /200 words
        </div>
        {errors.shortBio && (
          <p className="text-red-500 text-sm mt-1">{errors.shortBio}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Mentoring Domains <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {mentoringDomains.map((domain) => (
            <label key={domain} className="flex items-center">
              <input
                type="checkbox"
                name="primaryDomains[]"
                value={domain}
                checked={formData.primaryDomains.includes(domain)}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{domain}</span>
            </label>
          ))}
        </div>
        {errors.primaryDomains && (
          <p className="text-red-500 text-sm mt-1">{errors.primaryDomains}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Industry Expertise
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {industries.map((industry) => (
            <label key={industry} className="flex items-center">
              <input
                type="checkbox"
                name="industryExpertise[]"
                value={industry}
                checked={formData.industryExpertise.includes(industry)}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{industry}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specific Skills/Topics <span className="text-red-500">*</span>
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
          Age Groups Comfortable Mentoring{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {ageGroups.map((group) => (
            <label key={group} className="flex items-center">
              <input
                type="checkbox"
                name="ageGroups[]"
                value={group}
                checked={formData.ageGroups.includes(group)}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{group}</span>
            </label>
          ))}
        </div>
        {errors.ageGroups && (
          <p className="text-red-500 text-sm mt-1">{errors.ageGroups}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mentoring Format <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-3 gap-2">
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
          Session Medium <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {sessionMediums.map((medium) => (
            <label key={medium} className="flex items-center">
              <input
                type="checkbox"
                name="sessionMedium[]"
                value={medium}
                checked={formData.sessionMedium.includes(medium)}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{medium}</span>
            </label>
          ))}
        </div>
        {errors.sessionMedium && (
          <p className="text-red-500 text-sm mt-1">{errors.sessionMedium}</p>
        )}
        {formData.sessionMedium.includes("In-person") && (
          <div className="mt-2">
            <input
              type="text"
              name="inPersonCity"
              value={formData.inPersonCity}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600"
              placeholder="Enter city name for in-person sessions"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Past Mentoring/Teaching Experience
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="pastExperience"
              value="Yes"
              checked={formData.pastExperience === "Yes"}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="pastExperience"
              value="No"
              checked={formData.pastExperience === "No"}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>No</span>
          </label>
        </div>
        {formData.pastExperience === "Yes" && (
          <textarea
            name="pastExperienceDescription"
            value={formData.pastExperienceDescription}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 mt-2"
            placeholder="Please describe your past mentoring or teaching experience"
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Certifications
        </label>
        <input
          type="file"
          name="certifications"
          onChange={handleInputChange}
          accept=".pdf,.doc,.docx"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );

  const renderSection3 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Availability & Logistics
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Weekly Availability <span className="text-red-500">*</span>
        </label>
        <textarea
          name="weeklyAvailability"
          value={formData.weeklyAvailability}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
            errors.weeklyAvailability ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., Monday-Friday 6-8 PM, Saturday 10 AM-2 PM, etc."
        />
        {errors.weeklyAvailability && (
          <p className="text-red-500 text-sm mt-1">
            {errors.weeklyAvailability}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Expected Time Commitment <span className="text-red-500">*</span>
        </label>
        <select
          name="timeCommitment"
          value={formData.timeCommitment}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 ${
            errors.timeCommitment ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select time commitment</option>
          {timeCommitments.map((commitment) => (
            <option key={commitment} value={commitment}>
              {commitment}
            </option>
          ))}
        </select>
        {errors.timeCommitment && (
          <p className="text-red-500 text-sm mt-1">{errors.timeCommitment}</p>
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
          Group Capacity (if group mentoring)
        </label>
        <input
          type="number"
          name="groupCapacity"
          value={formData.groupCapacity}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600"
          placeholder="Maximum number of mentees per group"
          min="1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Curriculum/Materials
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="curriculumMaterials"
              value="I have my own"
              checked={formData.curriculumMaterials === "I have my own"}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>I have my own</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="curriculumMaterials"
              value="Need help"
              checked={formData.curriculumMaterials === "Need help"}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>Need help</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="curriculumMaterials"
              value="Either"
              checked={formData.curriculumMaterials === "Either"}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>Either</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tech Requirements
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {["Stable internet", "Webcam", "Headset", "Quiet space"].map(
            (req) => (
              <label key={req} className="flex items-center">
                <input
                  type="checkbox"
                  name="techRequirements[]"
                  value={req}
                  checked={formData.techRequirements.includes(req)}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">{req}</span>
              </label>
            )
          )}
        </div>
      </div>
    </div>
  );

  const renderSection4 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Compliance & Policies
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Willing to Mentor Minors (under 18)?{" "}
          <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="radio"
              name="mentorMinors"
              value="Yes"
              checked={formData.mentorMinors === "Yes"}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="mentorMinors"
              value="No"
              checked={formData.mentorMinors === "No"}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span>No</span>
          </label>
        </div>
        {errors.mentorMinors && (
          <p className="text-red-500 text-sm mt-1">{errors.mentorMinors}</p>
        )}
      </div>

      {formData.mentorMinors === "Yes" && (
        <>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="backgroundCheckConsent"
                checked={formData.backgroundCheckConsent}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">
                Consent for Background Check{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.backgroundCheckConsent && (
              <p className="text-red-500 text-sm mt-1">
                {errors.backgroundCheckConsent}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Existing Background Check
            </label>
            <input
              type="file"
              name="backgroundCheckUpload"
              onChange={handleInputChange}
              accept=".pdf,.doc,.docx"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Country-Specific Eligibility (legal to work with minors){" "}
          <span className="text-red-500">*</span>
        </label>
        <select
          name="countryEligibility"
          value={formData.countryEligibility}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 ${
            errors.countryEligibility ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select your country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.countryEligibility && (
          <p className="text-red-500 text-sm mt-1">
            {errors.countryEligibility}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="codeOfConduct"
              checked={formData.codeOfConduct}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              Agree to Code of Conduct <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.codeOfConduct && (
            <p className="text-red-500 text-sm mt-1">{errors.codeOfConduct}</p>
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
              Data & Privacy Consent <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.dataPrivacy && (
            <p className="text-red-500 text-sm mt-1">{errors.dataPrivacy}</p>
          )}
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="nonSolicitation"
              checked={formData.nonSolicitation}
              onChange={handleInputChange}
              className="mr-2"
            />
            <span className="text-sm font-medium text-gray-700">
              Non-solicitation / No direct fees from mentees{" "}
              <span className="text-red-500">*</span>
            </span>
          </label>
          {errors.nonSolicitation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nonSolicitation}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderSection5 = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Confirmation</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Why do you want to be a mentor?{" "}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          name="whyMentor"
          value={formData.whyMentor}
          onChange={handleInputChange}
          rows={4}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600 ${
            errors.whyMentor ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Tell us about your motivation to become a mentor"
        />
        {errors.whyMentor && (
          <p className="text-red-500 text-sm mt-1">{errors.whyMentor}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Conflict of Interest (if any)
        </label>
        <textarea
          name="conflictOfInterest"
          value={formData.conflictOfInterest}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-600"
          placeholder="Please disclose any potential conflicts of interest"
        />
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
              Mentor Application Form
            </h1>
            <p className="text-gray-600">
              Join our community of mentors and help shape the next generation
            </p>
          </div>

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
                      application form below.
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

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Section {currentSection} of 5
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((currentSection / 5) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentSection / 5) * 100}%` }}
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

              {currentSection < 5 ? (
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
                      Our NGO team reviews mentee profiles and matches them with
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

              {/* FAQ Item 11 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 11 ? null : 11)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q11. What tools are used for sessions?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 11 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 11 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      Mentors usually use Zoom, Google Meet, or similar
                      platforms. Our team helps with setup so the focus remains
                      on teaching, not technical issues.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 12 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 12 ? null : 12)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q12. Can I focus only on one-to-one mentoring?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 12 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 12 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      Yes, you may prefer one-to-one guidance, and that option
                      is available. We allow mentors to choose the style they
                      are most comfortable with.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 13 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 13 ? null : 13)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q13. Can I provide internships?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 13 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 13 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      Yes. If you&apos;re a business owner or professional with
                      capacity, you can offer internships. These will be managed
                      separately and matched carefully with mentees.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 14 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 14 ? null : 14)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q14. Will I get recognition?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 14 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 14 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      Yes. We provide appreciation certificates and showcase
                      mentor contributions on our platform. This builds
                      credibility and strengthens your professional profile.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 15 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 15 ? null : 15)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q15. Can I pause mentoring if busy?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 15 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 15 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      Yes. Mentors can take breaks and resume later. We
                      understand professional and personal priorities may
                      change.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 16 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 16 ? null : 16)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q16. Is mentor training provided?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 16 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 16 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      Yes. We provide a basic orientation to help you engage
                      mentees effectively and make the sessions impactful.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 17 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 17 ? null : 17)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q17. How does mentoring benefit me?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 17 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 17 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      Mentorship improves your leadership, communication, and
                      networking skills. It&apos;s also deeply fulfilling to
                      give back and shape the future generation.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 18 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 18 ? null : 18)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q18. Do I need to commit long-term?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 18 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 18 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      No, you can choose to mentor occasionally or regularly.
                      There&apos;s complete flexibility in how you contribute.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 19 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 19 ? null : 19)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q19. Can international mentors join?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 19 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 19 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      Yes. Since everything is online, mentors from anywhere in
                      the world can join and contribute.
                    </p>
                  </div>
                )}
              </div>

              {/* FAQ Item 20 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFAQ(openFAQ === 20 ? null : 20)}
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    Q20. How do I apply?
                  </h3>
                  <span
                    className={`text-2xl transition-transform duration-200 ${
                      openFAQ === 20 ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFAQ === 20 && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      You can register on our website, submit your profile, and
                      once reviewed, our team will connect you with suitable
                      mentees.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

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
