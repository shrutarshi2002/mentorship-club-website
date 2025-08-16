"use client";

import { useState, useEffect, useRef } from "react";

export default function Contact() {
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRefs = useRef({});

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/company/mentorshipclub",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "Twitter",
      url: "https://twitter.com/mentorshipclub",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
      color: "from-blue-400 to-blue-500",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/mentorshipclub",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z" />
        </svg>
      ),
      color: "from-pink-500 to-purple-600",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@mentorshipclub",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
      color: "from-red-500 to-red-600",
    },
    {
      name: "Facebook",
      url: "https://facebook.com/mentorshipclub",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "Discord",
      url: "https://discord.gg/mentorshipclub",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.2462.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1568 2.4189Z" />
        </svg>
      ),
      color: "from-indigo-500 to-purple-600",
    },
  ];

  const contactInfo = [
    {
      title: "Email Us",
      value: "info@mentorshipclub.com",
      subtitle: "We'll respond within 24 hours",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "from-blue-500 to-indigo-600",
      action: "mailto:info@mentorshipclub.com",
    },
    {
      title: "Call Us",
      value: "+1 (555) 123-4567",
      subtitle: "Mon-Fri 9AM-6PM EST",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      color: "from-green-500 to-teal-600",
      action: "tel:+15551234567",
    },
    {
      title: "Visit Us",
      value: "123 Mentorship Ave",
      subtitle: "City, State 12345",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      color: "from-purple-500 to-pink-600",
      action: "https://maps.google.com",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success
    setSubmitStatus("success");
    setIsSubmitting(false);

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    // Reset status after 5 seconds
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-3">
                <img
                  src="/assets/logo.png"
                  alt="MentorshipClub Logo"
                  className="h-10 w-10 object-contain"
                />
                <h1 className="text-2xl font-bold">
                  <span className="text-yellow-500">Mentorship</span>
                  <span className="text-black">Club</span>
                </h1>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a
                  href="/"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Programs
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Mentors
                </a>
                <a
                  href="/about"
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in <span className="text-red-600">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our mentorship programs? Want to join our
            community? We'd love to hear from you and help you get started on
            your journey.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section id="contact-info" ref={setRef("contact-info")} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Contact Information
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us. Choose what works best for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 delay-${
                  index * 200
                } ${
                  isVisible["contact-info"]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
              >
                <a
                  href={info.action}
                  className="block group"
                  target={info.action.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    info.action.startsWith("http") ? "noopener noreferrer" : ""
                  }
                >
                  <div
                    className={`bg-gradient-to-br ${info.color} p-8 rounded-3xl shadow-xl text-white h-full group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2`}
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                      {info.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{info.title}</h3>
                    <p className="text-2xl font-semibold mb-2">{info.value}</p>
                    <p className="text-white/80">{info.subtitle}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact-form"
        ref={setRef("contact-form")}
        className="py-20 bg-white"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Send Us a Message
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>

          <div
            className={`transform transition-all duration-1000 ${
              isVisible["contact-form"]
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-3xl shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>

                {submitStatus === "success" && (
                  <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-xl text-center">
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-sm">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section
        id="social-media"
        ref={setRef("social-media")}
        className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Connect With Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow us on social media for the latest updates, success stories,
              and mentorship insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {socialLinks.map((social, index) => (
              <div
                key={index}
                className={`transform transition-all duration-1000 delay-${
                  index * 100
                } ${
                  isVisible["social-media"]
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div
                    className={`bg-gradient-to-br ${social.color} p-4 rounded-xl shadow-md text-white text-center group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 hover:scale-105`}
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <div className="w-5 h-5">{social.icon}</div>
                    </div>
                    <h3 className="text-sm font-semibold">{social.name}</h3>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" ref={setRef("faq")} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about our mentorship programs.
            </p>
          </div>

          <div
            className={`transform transition-all duration-1000 ${
              isVisible.faq
                ? "translate-y-0 opacity-100"
                : "translate-y-20 opacity-0"
            }`}
          >
            <div className="space-y-6">
              {[
                {
                  question: "How quickly will I hear back from you?",
                  answer:
                    "We typically respond to all inquiries within 24 hours during business days. For urgent matters, you can also call us directly.",
                },
                {
                  question: "What information should I include in my message?",
                  answer:
                    "Please include your name, contact information, specific questions or concerns, and any relevant background about your mentorship needs.",
                },
                {
                  question: "Can I schedule a consultation call?",
                  answer:
                    "Absolutely! We offer free 30-minute consultation calls to discuss your specific needs and how our programs can help you.",
                },
                {
                  question: "Do you offer international mentorship programs?",
                  answer:
                    "Yes! Our platform connects mentors and mentees globally, and we have programs available in multiple time zones and languages.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
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
                  <a href="#" className="hover:text-white transition-colors">
                    Leadership Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Career Guidance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Skill Building
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Personal Growth
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Success Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
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
