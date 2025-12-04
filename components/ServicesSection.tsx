'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X, MessageCircle } from 'lucide-react'

export function ServicesSection() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Done-For-You */}
            <button
              onClick={() => setShowModal(true)}
              className="p-8 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all text-left cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-500 text-2xl">✦</span>
                <h3 className="text-2xl font-bold">Done-For-You Web Apps</h3>
              </div>
              <p className="text-gray-600 text-lg">
                I design, build, and launch your custom web app end-to-end so your business can automate operations and add more revenue—without you touching the tech.
              </p>
            </button>

            {/* Done-With-You */}
            <div className="p-8 rounded-xl border-2 border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-500 text-2xl">✦</span>
                <h3 className="text-2xl font-bold">Done-With-You Systems</h3>
              </div>
              <p className="text-gray-600 text-lg">
                We co-build your web app together: strategy sessions, architecture planning, and implementation support so your team learns the system while we set it up.
              </p>
            </div>

            {/* Do-It-Yourself */}
            <div className="p-8 rounded-xl border-2 border-gray-100 hover:border-green-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-500 text-2xl">✦</span>
                <h3 className="text-2xl font-bold">Do-It-Yourself Resources</h3>
              </div>
              <p className="text-gray-600 text-lg">
                Courses, templates, and step-by-step web app blueprints so you can plan and brief your own dev team, even if you're not technical.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold">Done-For-You Web App – How It Works</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Book a Call</h3>
                  <p className="text-gray-600">
                    Tell me about your business, your bottlenecks, and the web app you want.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Plan the Project</h3>
                  <p className="text-gray-600">
                    I turn your idea into a clear scope, timeline, and price you can approve.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Design & Build</h3>
                  <p className="text-gray-600">
                    I design and develop your custom web app while you stay focused on running the business.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Launch & Support</h3>
                  <p className="text-gray-600">
                    We launch, onboard your team, and I provide support to make sure it runs smoothly.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200">
              <Link
                href="/contact"
                onClick={() => setShowModal(false)}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                <MessageCircle size={20} />
                Message Me Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
