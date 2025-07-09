import { PREFIX_ROUTE } from '@/routes/routeRoles'
import { Building2, Shield, CreditCard, Users, Home } from 'lucide-react'
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
    label: 'sidebar.global.title',
    colapsable: true,
    items: [
      { label: 'sidebar.global.home', href: PREFIX_ROUTE + '/global', icon: Home },
    ],
  },
  {
    label: 'sidebar.admin.title',
    colapsable: true,
    items: [
      { label: 'sidebar.admin.tenant', href: PREFIX_ROUTE + '/admin/tenant', icon: Building2 },
      { label: 'sidebar.admin.role', href: PREFIX_ROUTE + '/admin/roles', icon: Shield },
      { label: 'sidebar.admin.plan', href: PREFIX_ROUTE + '/admin/plans', icon: CreditCard },
    ],
  },
  {
    label: 'sidebar.administrativePanel.title',
    colapsable: true,
    items: [
      {
        label: 'sidebar.administrativePanel.users',
        href: PREFIX_ROUTE + '/administrative-panel/user',
        icon: Users,
      },
    ],
  },
]
