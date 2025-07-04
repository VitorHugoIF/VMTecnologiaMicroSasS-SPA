import type { ReactNode } from 'react'
import { MainHeader } from './MainHeader'

export function MainContent({ children }: { children: ReactNode; bg?: string }) {
  return (
    <main className="flex-1 w-full flex flex-col relative h-screen">
      <div className="sticky top-0 z-20">
        <MainHeader />
      </div>
      <div className="flex-1 overflow-auto p-4">{children}</div>
    </main>
  )
}
