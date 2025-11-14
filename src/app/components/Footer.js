import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
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
                  className="text-white hover:text-yellow-400 transition-colors text-sm"
                >
                  Leadership Development
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-yellow-400 transition-colors text-sm"
                >
                  Career Guidance
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-yellow-400 transition-colors text-sm"
                >
                  Skill Building
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-yellow-400 transition-colors text-sm"
                >
                  Personal Growth
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
                  className="text-white hover:text-yellow-400 transition-colors text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-yellow-400 transition-colors text-sm"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-yellow-400 transition-colors text-sm"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-yellow-400 transition-colors text-sm"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-1">
            <h4 className="text-white font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:mentorshipclubfl@gmail.com"
                  className="text-white hover:text-yellow-400 transition-colors text-sm"
                >
                  mentorshipclubfl@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="text-center">
            <p className="text-white text-sm">
              &copy; 2024 Mentorship Club. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
