import type { TenantResponse } from '../models/response/tenantResponse'
import type { Tenant } from '../types/tenant/tenant'
import type { CreateTenantRequest, UpdateTenantRequest } from '../models'
import type { PagedResponse } from '@/core/models/pagedResponse'

export function mapTenantResponseToTenant(response?: TenantResponse): Tenant | undefined {
  if (!response) return undefined
  return {
    id: response.id,
    name: response.name,
    slug: response.slug,
    email: response.email,
    planId: response.planId,
    status: response.status,
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
    name: tenant.name,
    slug: tenant.slug,
    email: tenant.email,
    planId: tenant.planId,
    status: tenant.status,
  }
}
