import type { ReactNode } from 'react'
import { SidebarMenuItem } from '@/components/ui/sidebar'
import { Link } from 'react-router-dom'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { useTranslation } from 'react-i18next'

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
  return (
    <SidebarMenuItem className="list-none px-2">
      {open ? (
        <Link
          to={href}
          className={`flex items-center ${gapClass} px-4 py-2 rounded-lg hover:bg-muted/60 transition text-xs ${isActive ? 'bg-muted/60 text-sidebar-accent-foreground' : ''} ${className || ''}`}
        >
          {icon}
          <span>{t(label)}</span>
        </Link>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={href}
              className={`flex items-center ${gapClass} px-4 py-2 rounded-lg hover:bg-muted/60 transition text-xs ${isActive ? 'bg-muted/60 text-sidebar-accent-foreground' : ''} ${className || ''}`}
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
