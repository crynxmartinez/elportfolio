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
                <h3 className="text-2xl font-bold">Done-For-You Web Apps (DFY)</h3>
              </div>
              <p className="text-gray-600 text-lg">
                I handle everything—turning your idea into a fully built product and launching it—so you get a custom web app that automates your operations and helps you add more revenue, without ever touching the tech.
              </p>
            </button>

            {/* Done-With-You */}
            <div className="p-8 rounded-xl border-2 border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-500 text-2xl">✦</span>
                <h3 className="text-2xl font-bold">Done-With-You Web Apps (DWY)</h3>
              </div>
              <p className="text-gray-600 text-lg">
                We co-build your web app together: I lead the strategy, structure, and key tech decisions while you or your team handle parts of the implementation, so you learn the system and keep control in-house.
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            {/* Header */}
            <div className="relative p-8 pb-4">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-400 text-2xl">✦</span>
                <span className="text-blue-400 font-medium text-sm uppercase tracking-wider">How It Works</span>
              </div>
              <h2 className="text-3xl font-bold text-white">Done-For-You Web App</h2>
            </div>

            {/* Content */}
            <div className="px-8 py-6">
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-green-500"></div>
                
                <div className="space-y-8">
                  {/* Step 1 */}
                  <div className="flex gap-6 relative">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-blue-500/30 z-10">
                      1
                    </div>
                    <div className="flex-1 bg-white/5 rounded-xl p-5 border border-white/10 hover:border-blue-500/50 transition-colors">
                      <h3 className="text-xl font-bold text-white mb-2">Book a Call</h3>
                      <p className="text-gray-400">
                        Tell me about your business, your bottlenecks, and the web app you want.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-6 relative">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/30 z-10">
                      2
                    </div>
                    <div className="flex-1 bg-white/5 rounded-xl p-5 border border-white/10 hover:border-purple-500/50 transition-colors">
                      <h3 className="text-xl font-bold text-white mb-2">Plan the Project</h3>
                      <p className="text-gray-400">
                        I turn your idea into a clear scope, timeline, and price you can approve.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-6 relative">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/30 z-10">
                      3
                    </div>
                    <div className="flex-1 bg-white/5 rounded-xl p-5 border border-white/10 hover:border-indigo-500/50 transition-colors">
                      <h3 className="text-xl font-bold text-white mb-2">Design & Build</h3>
                      <p className="text-gray-400">
                        I design and develop your custom web app while you stay focused on running the business.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-6 relative">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg shadow-green-500/30 z-10">
                      4
                    </div>
                    <div className="flex-1 bg-white/5 rounded-xl p-5 border border-white/10 hover:border-green-500/50 transition-colors">
                      <h3 className="text-xl font-bold text-white mb-2">Launch & Support</h3>
                      <p className="text-gray-400">
                        We launch, onboard your team, and I provide support to make sure it runs smoothly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 pt-4">
              <Link
                href="/contact"
                onClick={() => setShowModal(false)}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5"
              >
                <MessageCircle size={22} />
                Message Me Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
