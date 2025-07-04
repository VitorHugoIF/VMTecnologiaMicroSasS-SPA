import { http } from '@/services/http'
import type { PlanResponse } from '../models'
import type { ApiResponse } from '@/core/models/apiResponse'
import type { PagedResponse } from '@/core/models/pagedResponse'
import type { CreatePlanRequest } from '../models/request/createPlanRequest'
import type { UpdatePlanRequest } from '../models/request/updatePlanRequest'

const prefix = 'api/admin/plan'

export async function getPlans(
  page: number = 1,
  pageSize: number = 10,
  order?: number,
  sort?: string,
  search?: string,
) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  })
  if (order !== undefined) params.append('order', String(order))
  if (sort) params.append('sort', sort)
  if (search) params.append('search', search)

  const { data } = await http.get<PagedResponse<PlanResponse>>(`${prefix}?${params.toString()}`)

  return data
}

export async function getPlan(id: string) {
  const { data } = await http.get<ApiResponse<PlanResponse>>(`${prefix}/${id}`)
  return data
}

export async function createPlan(dto: CreatePlanRequest) {
  const { data } = await http.post<ApiResponse<PlanResponse>>(`${prefix}`, dto)
  return data
}

export async function enablePlan(id: string) {
  const { data } = await http.patch<ApiResponse<PlanResponse>>(`${prefix}/${id}/enable`)
  return data
}

export async function disablePlan(id: string) {
  const { data } = await http.patch<ApiResponse<PlanResponse>>(`${prefix}/${id}/disable`)
  return data
}

export async function updatePlan(id: string, dto: UpdatePlanRequest) {
  const { data } = await http.put<ApiResponse<PlanResponse>>(`${prefix}/${id}`, dto)
  return data
}
