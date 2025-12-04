'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Project } from '@/types/database'
import type { User } from '@supabase/supabase-js'
import { ThemeProvider } from './ThemeProvider'
import { Sidebar } from './Sidebar'
import { ProjectsTab } from './ProjectsTab'
import { MessagesTab } from './MessagesTab'

type Tab = 'projects' | 'messages'

interface AdminDashboardProps {
  projects: Project[]
  user: User
}

export function AdminDashboard({ projects: initialProjects, user }: AdminDashboardProps) {
  const [projects, setProjects] = useState(initialProjects)
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
          userEmail={user.email || ''}
        />

        {/* Main Content */}
        <main className="ml-64 p-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
              {activeTab}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {activeTab === 'projects' && 'Manage your portfolio projects'}
              {activeTab === 'messages' && 'View and respond to messages'}
            </p>
          </div>

          {/* Tab Content */}
          {activeTab === 'projects' && (
            <ProjectsTab
              projects={projects}
              onProjectsChange={setProjects}
            />
          )}
          {activeTab === 'messages' && <MessagesTab />}
        </main>
      </div>
    </ThemeProvider>
  )
}
