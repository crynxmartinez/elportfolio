import Link from 'next/link'
import { ArrowRight, BookOpen, FileText, Video } from 'lucide-react'

export default function FreeStuffPage() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
            ✦ Free Resources
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            DIY (Free Stuff)
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Blogs, breakdowns, and practical guides on web apps, automation, and systems so you can make smarter tech decisions for your business.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-50 rounded-2xl p-12 border-2 border-dashed border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Coming Soon!</h2>
            <p className="text-gray-600 mb-8">
              I'm working on creating valuable free content to help you understand web apps, automation, and systems better. Check back soon!
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white rounded-xl border border-gray-200">
                <BookOpen className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Blog Posts</h3>
                <p className="text-sm text-gray-500">In-depth articles</p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-gray-200">
                <FileText className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Guides & PDFs</h3>
                <p className="text-sm text-gray-500">Downloadable resources</p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-gray-200">
                <Video className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">Video Breakdowns</h3>
                <p className="text-sm text-gray-500">Visual explanations</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
            >
              Get Notified When Ready
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
