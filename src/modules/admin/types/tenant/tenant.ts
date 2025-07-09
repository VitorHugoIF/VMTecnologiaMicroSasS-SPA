import type { TenantStatus } from './tenantStatus'

export type Tenant = {
  id: string
  name: string
  slug: string
  email: string
  planId: string
  status: TenantStatus
  plan?: {
    id: string
    name: string
    description: string
    price: number
    active: boolean
  }
}
