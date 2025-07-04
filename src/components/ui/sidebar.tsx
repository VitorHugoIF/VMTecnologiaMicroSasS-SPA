import * as React from 'react'
import { cn } from '@/lib/utils'

const SidebarContext = React.createContext<any>(null)

export function SidebarProvider({ children, ...props }: React.PropsWithChildren<any>) {
  const [open, setOpen] = React.useState(true)
  const [openMobile, setOpenMobile] = React.useState(false)
  const isMobile = false // Adapte para mobile se necessário
  const toggleSidebar = () => setOpen((o) => !o)
  return (
    <SidebarContext.Provider
      value={{ open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar }}
      {...props}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) throw new Error('useSidebar must be used within a SidebarProvider.')
  return context
}

export const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { open } = useSidebar()
    return (
      <aside
        ref={ref}
        className={cn(
          'group/sidebar flex h-screen flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300',
          open ? 'w-64' : 'w-16',
          className,
        )}
        {...props}
      />
    )
  },
)
Sidebar.displayName = 'Sidebar'

export function SidebarHeader({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn('sticky top-0 z-10 flex items-center border-b bg-sidebar px-4 py-2', className)}
    >
      {children}
    </div>
  )
}

export function SidebarFooter({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'sticky bottom-0 z-10 flex items-center border-t bg-sidebar px-4 py-2',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SidebarContent({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <div className={cn('flex-1 overflow-y-auto px-2 py-4', className)}>{children}</div>
}

export function SidebarGroup({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export function SidebarGroupLabel({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn('px-2 py-1 text-xs font-semibold uppercase text-muted-foreground', className)}
    >
      {children}
    </div>
  )
}

export function SidebarGroupContent({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <div className={cn('space-y-1', className)}>{children}</div>
}

export function SidebarMenu({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <ul className={cn('space-y-1', className)}>{children}</ul>
}

export function SidebarMenuItem({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <li className={className}>{children}</li>
}

export function SidebarMenuButton({ children, className, asChild, isActive, ...props }: any) {
  const Comp = asChild ? React.Fragment : 'button'
  return (
    <Comp
      className={cn(
        'flex w-full items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none',
        isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export function SidebarMenuAction({ children, className, ...props }: any) {
  return (
    <button
      className={cn(
        'ml-auto flex items-center rounded p-1 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function SidebarMenuSub({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <ul className={cn('ml-4 space-y-1 border-l pl-2', className)}>{children}</ul>
}

export function SidebarMenuSubItem({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <li className={className}>{children}</li>
}

export function SidebarMenuSubButton({ children, className, ...props }: any) {
  return (
    <button
      className={cn(
        'flex w-full items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export function SidebarMenuBadge({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'ml-2 rounded bg-primary px-2 py-0.5 text-xs font-semibold text-primary-foreground',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SidebarMenuSkeleton() {
  return <div className="h-6 w-full animate-pulse rounded bg-muted" />
}

export function SidebarSeparator({ className }: { className?: string }) {
  return <hr className={cn('my-2 border-t border-muted', className)} />
}

export function SidebarTrigger({ className, ...props }: any) {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      className={cn(
        'absolute -right-3 top-4 z-20 h-6 w-6 rounded-full border bg-background p-1 shadow transition hover:bg-muted focus:outline-none',
        className,
      )}
      onClick={toggleSidebar}
      {...props}
    >
      <span className="sr-only">Toggle Sidebar</span>
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

export function SidebarInset({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <div className={cn('flex-1', className)}>{children}</div>
}
