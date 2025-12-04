'use client'

import { FolderKanban, MessageSquare, LogOut, Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

type Tab = 'projects' | 'messages'

interface SidebarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  onLogout: () => void
  userEmail: string
}

export function Sidebar({ activeTab, onTabChange, onLogout, userEmail }: SidebarProps) {
  const { theme, toggleTheme } = useTheme()

  const menuItems = [
    { id: 'projects' as Tab, label: 'Projects', icon: FolderKanban },
    { id: 'messages' as Tab, label: 'Messages', icon: MessageSquare },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col z-40">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <img 
            src="https://storage.googleapis.com/msgsndr/xzA6eU8kOYmBuwFdr3CF/media/6930ef1ae0f0927bf677b2a8.png" 
            alt="EL Portfolio"
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h1 className="font-bold text-gray-900 dark:text-white">Admin Panel</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[140px]">{userEmail}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  )
}
