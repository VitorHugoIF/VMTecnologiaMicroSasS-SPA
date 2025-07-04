import type { ReactNode } from 'react'
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface SidebarGroupSectionProps {
  label: string
  children: ReactNode
  colapsable?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function SidebarGroupSection({
  label,
  children,
  colapsable,
  open,
  onOpenChange,
}: SidebarGroupSectionProps) {
  const { t } = useTranslation()
  if (colapsable) {
    return (
      <Collapsible open={open} onOpenChange={onOpenChange}>
        <SidebarGroup className="w-full">
          <SidebarGroupLabel className="px-4 text-xs text-muted-foreground mb-1 flex items-center w-full min-w-0">
            <span className="flex-1 truncate min-w-0">{t(label)}</span>
            <CollapsibleTrigger asChild>
              <button className="ml-auto p-1 rounded hover:bg-muted/60">
                {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>{children}</SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
    )
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="px-4 text-xs text-muted-foreground mb-1 flex items-center">
        {t(label)}
      </SidebarGroupLabel>
      <SidebarGroupContent>{children}</SidebarGroupContent>
    </SidebarGroup>
  )
}
