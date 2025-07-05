import type { ReactNode } from 'react'
import { MainHeader } from './MainHeader'
import { useSidebarLogic } from '@/components/Sidebar/hooks/useSidebar'
import { SIDEBAR_WIDTH_OPEN, SIDEBAR_WIDTH_CLOSED } from '@/config/KeyStorageConfig'

export function MainContent({ children }: { children: ReactNode; bg?: string }) {
  const { open, isMobile } = useSidebarLogic()
  const sidebarWidth = open ? SIDEBAR_WIDTH_OPEN : SIDEBAR_WIDTH_CLOSED
  const style = isMobile
    ? { width: '100vw', maxWidth: '100vw' }
    : { maxWidth: `calc(100vw - ${sidebarWidth}px)` }
  return (
    <main
      className="flex-1 w-full flex flex-col relative h-screen"
      style={style}
    >
      <div className="sticky top-0 z-20">
        <MainHeader />
      </div>
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </main>
  )
}
