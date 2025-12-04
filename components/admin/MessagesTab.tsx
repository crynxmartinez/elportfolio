'use client'

import { MessageSquare } from 'lucide-react'

export function MessagesTab() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
        <MessageSquare className="w-10 h-10 text-blue-600 dark:text-blue-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Messages Coming Soon
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md">
        This feature is under development. You'll be able to manage contact form submissions and messages here.
      </p>
    </div>
  )
}
