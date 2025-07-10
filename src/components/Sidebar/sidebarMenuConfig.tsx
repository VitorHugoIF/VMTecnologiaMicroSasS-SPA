import { PREFIX_ROUTE } from '@/routes/routeRoles'
import { Building2, Shield, CreditCard, Users, Home, Box, LogIn, LogOut, Layers, Tag } from 'lucide-react'
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
      { label: 'sidebar.global.home', href: PREFIX_ROUTE + '/dashboard', icon: Home },
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
  {
    label: 'sidebar.stock.title',
    colapsable: true,
    items: [
      {
        label: 'sidebar.stock.product',
        href: PREFIX_ROUTE + '/stock/product',
        icon: Box,
      },
      {
        label: 'sidebar.stock.category',
        href: PREFIX_ROUTE + '/stock/category',
        icon: Layers,
      },
      {
        label: 'sidebar.stock.brand',
        href: PREFIX_ROUTE + '/stock/brand',
        icon: Tag,
      },
      {
        label: 'sidebar.stock.entry',
        href: PREFIX_ROUTE + '/stock/entry',
        icon: LogIn,
      },
      {
        label: 'sidebar.stock.exit',
        href: PREFIX_ROUTE + '/stock/exit',
        icon: LogOut,
      },
    ],
  },
]
