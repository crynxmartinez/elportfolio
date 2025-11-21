'use client'

import { useState } from 'react'
import { ProjectCard } from './ProjectCard'
import type { Project } from '@/types/database'

interface ProjectFilterProps {
  projects: Project[]
}

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'websites', label: 'Websites' },
    { id: 'systems', label: 'Systems' },
    { id: 'games', label: 'Games' },
  ]

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter)

  return (
    <>
      {/* Filter Tabs */}
      <div className="flex justify-center gap-2 mb-12 flex-wrap">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeFilter === category.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-bold mb-2">No projects yet</h3>
          <p className="text-gray-600">
            Projects will appear here once you add them through the admin panel.
          </p>
        </div>
      )}
    </>
  )
}
