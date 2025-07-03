import { SidebarMenuItemLink } from './SidebarMenuItemLink'
import { SidebarGroupSection } from './SidebarGroupSection'
import { SidebarMenu } from '@/components/ui/sidebar'
import type { SidebarMenuItemConfig } from './sidebarMenuConfig'
import { Circle } from 'lucide-react'
import { useLocation } from 'react-router-dom'

interface SidebarMenuTreeProps {
  items: SidebarMenuItemConfig[]
  open: boolean
  itemAlign: string
}

export function SidebarMenuTree({ items, open, itemAlign }: SidebarMenuTreeProps) {
  const location = useLocation();
  function renderMenuItems(items: SidebarMenuItemConfig[]) {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        if (open) {
          return (
            <SidebarGroupSection
              key={item.label}
              label={item.label}
              colapsable={true}
            >
              <SidebarMenu>
                {renderMenuItems(item.children)}
              </SidebarMenu>
            </SidebarGroupSection>
          )
        } 
        else {
          return (
            <SidebarMenu key={item.label}>
              {item.children.map((child) => {
                const Icon = child.icon || Circle
                return (
                  <SidebarMenuItemLink
                    key={child.label}
                    href={child.href || '#'}
                    icon={<Icon className="w-4 h-4" />}
                    label={child.label}
                    open={open}
                    isActive={typeof window !== 'undefined' ? location.pathname.startsWith(child.href || '') : false}
                    className={itemAlign}
                  />
                )
              })}
            </SidebarMenu>
          )
        }
      }
      const Icon = item.icon || Circle
      return (
        <SidebarMenuItemLink
          key={item.label}
          href={item.href || '#'}
          icon={<Icon className="w-4 h-4" />}
          label={item.label}
          open={open}
          isActive={typeof window !== 'undefined' ? location.pathname.startsWith(item.href || '') : false}
          className={itemAlign}
        />
      )
    })
  }
  return <>{renderMenuItems(items)}</>
} 