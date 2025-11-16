import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { workshops, parentWorkshops } from "../../../data/workshops";

export default async function WorkshopDetailPage({ params }) {
  const { id: workshopId } = await params;
  const workshop = workshops.find((w) => w.id === workshopId) || parentWorkshops.find((w) => w.id === workshopId);
  const workshopIndex = workshops.findIndex((w) => w.id === workshopId);
  const isParentWorkshop = parentWorkshops.some((w) => w.id === workshopId);

  if (!workshop) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Workshop Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The workshop you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/#workshops"
            className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Back to Workshops
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className={`relative py-20 lg:py-32 mt-16 ${isParentWorkshop ? 'bg-gradient-to-br from-purple-50 via-white to-pink-50' : 'bg-gradient-to-br from-yellow-50 via-white to-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 ${isParentWorkshop ? 'bg-purple-100 text-purple-800' : 'bg-yellow-100 text-yellow-800'}`}>
                <span className="text-2xl">{workshop.number}</span>
                <span>{workshop.ageGroup || 'Parent Workshop'}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                {workshop.title}
              </h1>
              {workshop.subtitle && (
                <p className="text-xl text-gray-700 mb-4 leading-relaxed font-medium">
                  {workshop.subtitle}
                </p>
              )}
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {workshop.format}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/#workshops"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-black transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Workshops
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-yellow-400 text-black border-2 border-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
                >
                  Book a Free Demo
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                {isParentWorkshop ? (
                  <Image
                    src={`/assets/parent/${16 + parentWorkshops.findIndex((w) => w.id === workshopId)}.png`}
                    alt={workshop.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={`/assets/workshop/${workshopIndex + 1}.png`}
                    alt={workshop.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            ✅ About This Workshop
          </h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            {workshop.about.map((paragraph, idx) => (
              <p key={idx} className="text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* What Kids Will Learn */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {(workshop.learnEarly || workshop.learnGrowing || workshop.learn) && (
            <div className="grid lg:grid-cols-2 gap-12">
              {workshop.learnEarly && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    📘 Early Learners (7–10): What They Learn
                  </h2>
                  <ul className="space-y-4">
                    {workshop.learnEarly.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="text-green-500 text-xl mt-1">•</span>
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.learnGrowing && (
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    📗 Growing Thinkers (11–16): What They Learn
                  </h2>
                  <ul className="space-y-4">
                    {workshop.learnGrowing.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="text-green-500 text-xl mt-1">•</span>
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.learn && !workshop.learnEarly && !workshop.learnGrowing && (
                <div className="lg:col-span-2">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    📘 What Kids Will Learn
                  </h2>
                  <ul className="space-y-4">
                    {workshop.learn.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <span className="text-green-500 text-xl mt-1">•</span>
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Perfect For & Short Caption */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {workshop.included && (
              <div className="bg-gradient-to-br from-yellow-50 to-red-50 rounded-3xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  ✅ Included
                </h2>
                <p className="text-lg text-gray-700">{workshop.included}</p>
              </div>
            )}

            <div className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-lg ${workshop.included ? '' : 'md:col-span-2'}`}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                💚 Perfect For
              </h2>
              <p className="text-lg text-gray-700">{workshop.perfectFor}</p>
            </div>

            {workshop.shortCaption && (
              <div className={`bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 shadow-lg ${workshop.included ? 'md:col-span-2' : ''}`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  ✨ Short Caption
                </h2>
                <p className="text-xl text-gray-800 font-medium italic">
                  &quot;{workshop.shortCaption}&quot;
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Book a free demo class to experience this workshop firsthand
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#workshops"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore More Workshops
            </Link>
            <Link
              href="/"
              className="bg-yellow-400 text-black border-2 border-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors inline-block text-center"
            >
              Book a Free Demo
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Generate static params for all workshop IDs (required for static export)
export async function generateStaticParams() {
  const allWorkshops = [...workshops, ...parentWorkshops];
  return allWorkshops.map((workshop) => ({
    id: workshop.id,
  }));
}

