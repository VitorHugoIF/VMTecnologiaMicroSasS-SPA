import { PREFIX_ROUTE } from '@/routes/routeRoles'
import { Building2, Shield, Users } from 'lucide-react'
import type { ElementType } from 'react'

export interface SidebarMenuItemConfig {
  label: string
  href?: string
  icon?: ElementType
  children?: SidebarMenuItemConfig[]
}

export interface SidebarMenuGroupConfig {
  label: string
  colapsable?: boolean
  items: SidebarMenuItemConfig[]
}

export const sidebarMenuConfig: SidebarMenuGroupConfig[] = [
  {
    label: 'sidebar.admin.title',
    colapsable: true,
    items: [
      { label: 'sidebar.admin.tenant', href: PREFIX_ROUTE + '/admin/tenant', icon: Building2 },
      { label: 'sidebar.admin.role', href: PREFIX_ROUTE + '/admin/roles', icon: Shield },
      { label: 'sidebar.admin.user', href: PREFIX_ROUTE + '/admin/user', icon: Users },
    ],
  },
] 