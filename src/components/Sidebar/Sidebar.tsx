import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { SidebarGroupSection } from './SidebarGroupSection'
import { sidebarMenuConfig } from './sidebarMenuConfig'
import { SidebarMenuTree } from './SidebarMenuTree'
import { SidebarUserFooter } from './SidebarUserFooter'
import { useSidebarLogic } from './hooks/useSidebar'
import logo from '@/assets/react.svg'
import { useAuth } from '@/core/hooks/useAuth'

export function Sidebar() {
  const { open, setOpen, isMobile, itemAlign, mobileOverlay } = useSidebarLogic()
  const { user } = useAuth()

  return (
    <>
      {mobileOverlay && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)} />
      )}
      <ShadcnSidebar
        className={`z-50 h-screen border-r shadow-lg flex flex-col items-center justify-between py-0 transition-all duration-300
          ${
            isMobile
              ? `fixed top-0 left-0 w-64 ${open ? 'translate-x-0' : '-translate-x-full'}`
              : open
                ? 'w-64'
                : 'w-16'
          }
        `}
        style={isMobile ? { top: 0, bottom: 0 } : undefined}
      >
        <SidebarHeader
          className={`flex flex-col 
            items-center 
            justify-center 
            w-full h-16 
            mb-2 gap-2 
            border-none ${open ? 'px-4' : 'p-0'}`}
        >
          <img
            src={logo}
            alt="Logo"
            className={`h-10 w-auto max-w-[80%] object-contain ${open ? 'self-start' : ''}`}
          />
        </SidebarHeader>
        <SidebarContent className="flex flex-col gap-2 flex-1 w-full px-0 py-0 overflow-y-auto">
          {sidebarMenuConfig.map((group) => (
            <SidebarGroupSection
              key={group.label}
              label={open ? group.label : ''}
              colapsable={open ? group.colapsable : false}
              open={open ? undefined : true}
            >
              <SidebarMenuTree items={group.items} open={open} itemAlign={itemAlign} />
            </SidebarGroupSection>
          ))}
        </SidebarContent>
        <SidebarFooter
          className={`flex items-center justify-center w-full h-16 mt-auto border-none`}
        >
          {user && <SidebarUserFooter user={user} open={open} />}
        </SidebarFooter>
      </ShadcnSidebar>
    </>
  )
}
