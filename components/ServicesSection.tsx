'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, MessageCircle } from 'lucide-react'

export function ServicesSection() {
  const [showDFYModal, setShowDFYModal] = useState(false)
  const [showDWYModal, setShowDWYModal] = useState(false)

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Done-For-You */}
            <button
              onClick={() => setShowDFYModal(true)}
              className="p-8 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all text-left cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-500 text-2xl">✦</span>
                <h3 className="text-2xl font-bold">Done-For-You Web Apps (DFY)</h3>
              </div>
              <p className="text-gray-600 text-lg">
                I handle everything—turning your idea into a fully built product and launching it—so you get a custom web app that gives you more revenue, without ever touching the tech.
              </p>
            </button>

            {/* Done-With-You */}
            <button
              onClick={() => setShowDWYModal(true)}
              className="p-8 rounded-xl border-2 border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all text-left cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-500 text-2xl">✦</span>
                <h3 className="text-2xl font-bold">Done-With-You Web Apps (DWY)</h3>
              </div>
              <p className="text-gray-600 text-lg">
                We co-build your web app together: I lead and manage the process of creating your app while you or your team handle parts of the implementation. Me as your Project Manager.
              </p>
            </button>

            {/* Do-It-Yourself */}
            <div className="p-8 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-500 text-2xl">✦</span>
                <h3 className="text-2xl font-bold">DIY (Free Stuff)</h3>
              </div>
              <p className="text-gray-600 text-lg">
                Blogs, breakdowns, and practical guides on web apps, automation, and systems so you can make smarter tech decisions for your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DFY Modal */}
      {showDFYModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-200">
            {/* Header */}
            <div className="relative px-6 pt-6 pb-4">
              <button
                onClick={() => setShowDFYModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-blue-500 text-lg">✦</span>
                <span className="text-blue-600 font-medium text-xs uppercase tracking-wider">How It Works</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Done-For-You Web App</h2>
            </div>

            {/* Content */}
            <div className="px-6 py-4 space-y-4">
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Book a Call</h3>
                  <p className="text-gray-600 text-sm">
                    Tell me about your business, your bottlenecks, and the web app you want.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Plan the Project</h3>
                  <p className="text-gray-600 text-sm">
                    I turn your idea into a clear scope, timeline, and price you can approve.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Design & Build</h3>
                  <p className="text-gray-600 text-sm">
                    I design and develop your custom web app while you stay focused on running the business.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Launch & Support</h3>
                  <p className="text-gray-600 text-sm">
                    We launch, onboard your team, and I provide support to make sure it runs smoothly.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 pt-2">
              <Link
                href="/contact"
                onClick={() => setShowDFYModal(false)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                <MessageCircle size={18} />
                Message Me Now
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* DWY Modal */}
      {showDWYModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-200">
            {/* Header */}
            <div className="relative px-6 pt-6 pb-4">
              <button
                onClick={() => setShowDWYModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-purple-500 text-lg">✦</span>
                <span className="text-purple-600 font-medium text-xs uppercase tracking-wider">How It Works</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Done-With-You Web Apps</h2>
            </div>

            {/* Content */}
            <div className="px-6 py-4 space-y-4">
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Strategy & Audit</h3>
                  <p className="text-gray-600 text-sm">
                    We map your processes, tools, and goals so we know exactly what to build.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Know Your Team</h3>
                  <p className="text-gray-600 text-sm">
                    We clarify who's on your team, their skills, and which parts they can own.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Implement & Review</h3>
                  <p className="text-gray-600 text-sm">
                    Your team builds with my guidance while I review, refine, and handle critical pieces.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Launch & Improve</h3>
                  <p className="text-gray-600 text-sm">
                    We launch, fix issues, and make small optimizations so the system actually works in real life.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 pt-2">
              <Link
                href="/contact"
                onClick={() => setShowDWYModal(false)}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all"
              >
                <MessageCircle size={18} />
                Message Me Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
