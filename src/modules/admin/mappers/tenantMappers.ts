import type { TenantResponse } from '../models/response/tenantResponse'
import type { Tenant } from '../types'
import type { CreateTenantRequest, UpdateTenantRequest } from '../models'
import type { PagedResponse } from '@/core/models/pagedResponse'
import { TenantStatusLabels, type TenantStatus } from '../types/tenant/tenantStatus'

function mapPlanResponseToPlan(response?: TenantResponse['plan']): Tenant['plan'] | undefined {
  if (!response) return undefined
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    price: response.price,
    active: response.active,
  }
}

export function mapTenantResponseToTenant(response?: TenantResponse): Tenant | undefined {
  if (!response) return undefined
  const statusKey = typeof response.status === 'string' ? response.status.toLowerCase() : response.status
  let statusEnum: TenantStatus | undefined = undefined
  for (const [key, value] of Object.entries(TenantStatusLabels)) {
    if (value === statusKey) {
      statusEnum = key as TenantStatus
      break
    }
  }
  if (!statusEnum) statusEnum = '1'
  return {
    id: response.id,
    name: response.name,
    slug: response.slug,
    email: response.email,
    planId: response.planId,
    status: statusEnum,
    plan: mapPlanResponseToPlan(response.plan),
  }
}

export function mapPagedTenantResponseToTenants(paged?: PagedResponse<TenantResponse>) {
  return {
    items: Array.isArray(paged?.data?.items)
      ? (paged.data.items.map(mapTenantResponseToTenant).filter(Boolean) as Tenant[])
      : [],
    totalCount: paged?.data?.totalCount ?? 0,
  }
}

export function mapTenantToCreateTenantRequest(tenant: Tenant): CreateTenantRequest {
  return {
    name: tenant.name,
    slug: tenant.slug,
    email: tenant.email,
    planId: tenant.planId,
  }
}

export function mapTenantToUpdateTenantRequest(tenant: Tenant): UpdateTenantRequest {
  return {
    id: tenant.id,
    name: tenant.name,
    slug: tenant.slug,
    email: tenant.email,
    planId: tenant.planId,
    status: tenant.status,
  }
}
