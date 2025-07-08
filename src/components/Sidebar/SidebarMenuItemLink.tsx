import type { ReactNode } from 'react'
import { SidebarMenuItem } from '@/components/ui/sidebar'
import { Link } from 'react-router-dom'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface SidebarMenuItemLinkProps {
  href: string
  icon: ReactNode
  label: string
  open: boolean
  isActive?: boolean
  className?: string
}

export function SidebarMenuItemLink({
  href,
  icon,
  label,
  open,
  isActive,
  className,
}: SidebarMenuItemLinkProps) {
  const { t } = useTranslation()
  const gapClass = open ? 'gap-3' : 'gap-0'
  const baseClasses =
    'flex items-center px-4 py-2 rounded-lg transition-colors text-xs font-medium cursor-pointer select-none border border-transparent'
  const activeClasses =
    'bg-primary text-primary-foreground shadow-sm dark:shadow-md'
  const hoverClasses =
    'hover:bg-[#f0f2f8] hover:text-foreground hover:shadow-md dark:hover:bg-[#232b3a] dark:hover:text-foreground dark:hover:shadow-lg'
  const inactiveClasses =
    'bg-transparent text-sidebar-foreground'

  return (
    <SidebarMenuItem className="list-none px-2">
      {open ? (
        <Link
          to={href}
          className={cn(
            baseClasses,
            gapClass,
            isActive ? activeClasses : inactiveClasses,
            hoverClasses,
            className
          )}
          aria-current={isActive ? 'page' : undefined}
        >
          {icon}
          <span>{t(label)}</span>
        </Link>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={href}
              className={cn(
                baseClasses,
                gapClass,
                isActive ? activeClasses : inactiveClasses,
                hoverClasses,
                className
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              {icon}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={8}>
            <span>{t(label)}</span>
          </TooltipContent>
        </Tooltip>
      )}
    </SidebarMenuItem>
  )
}
