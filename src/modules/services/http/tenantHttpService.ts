import { http } from '@/services/http'
import type { ApiResponse } from '@/core/models/apiResponse'
import type { PagedResponse } from '@/core/models/pagedResponse'
import type { CreateTenantRequest, UpdateTenantRequest } from '../../admin/models'
import type { TenantResponse } from '../../admin/models/response/tenantResponse'

const prefix = 'api/admin/tenant'

export async function getTenants(
  page: number = 1,
  pageSize: number = 10,
  search?: string,
  sort?: string,
  order?: number,
) {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  })

  if (search) params.append('search', search)
  if (sort) params.append('sort', sort)
  if (order !== undefined) params.append('order', order.toString())

  const { data } = await http.get<PagedResponse<TenantResponse>>(`${prefix}?${params.toString()}`)
  return data
}

export async function getTenant(id: string) {
  const { data } = await http.get<ApiResponse<TenantResponse>>(`${prefix}/${id}`)
  return data
}

export async function createTenant(request: CreateTenantRequest) {
  const { data } = await http.post<ApiResponse<TenantResponse>>(`${prefix}`, request)
  return data
}

export async function updateTenant(id: string, request: UpdateTenantRequest) {
  const { data } = await http.put<ApiResponse<TenantResponse>>(`${prefix}/${id}`, request)
  return data
}

export async function deleteTenant(id: string) {
  const { data } = await http.delete<ApiResponse<void>>(`${prefix}/${id}`)
  return data
}

export async function enableTenant(id: string) {
  const { data } = await http.patch<ApiResponse<TenantResponse>>(`${prefix}/${id}/enable`)
  return data
}

export async function disableTenant(id: string) {
  const { data } = await http.patch<ApiResponse<TenantResponse>>(`${prefix}/${id}/disable`)
  return data
}
