import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { ServicesSection } from '@/components/ServicesSection'

export default async function Home() {
  const supabase = await createClient()
  
  // Fetch featured projects
  const { data: featuredProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('featured', true)
    .order('order_index', { ascending: true })
    .limit(9)

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            👋 Your Local Full Stack Developer
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 max-w-4xl mx-auto leading-tight">
            I help small and startup businesses turn their web app ideas into reality and add at least <span className="text-green-600">₱300k</span> in revenue within <span className="text-blue-600">6 months</span>.
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/projects"
              className="group px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              View My Work
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
            >
              Let's Collaborate
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Featured Projects */}
      {featuredProjects && featuredProjects.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-gray-600 text-lg">Check out some of my best work</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group"
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                    >
                      View Project
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                View All Projects
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to work with a local full stack developer?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's bring your ideas to life with modern full stack solutions
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-xl transition-all"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </main>
  )
}
