import type { ReactNode } from 'react'
import { Sidebar } from '..'
import { SidebarProvider } from '@/components/ui/sidebar'
import { MainContent } from './MainContent'

export function MainLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen flex-col md:flex-row">
        <Sidebar />
        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  )
}
