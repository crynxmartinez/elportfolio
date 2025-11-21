import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true })

  return <AdminDashboard projects={projects || []} user={user} />
}
