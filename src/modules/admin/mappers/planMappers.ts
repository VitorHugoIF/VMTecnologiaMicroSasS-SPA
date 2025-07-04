import type { Plan } from '../types'
import type { PlanResponse } from '../models'
import type { CreatePlanRequest, UpdatePlanRequest } from '../models'
import type { PagedResponse } from '@/core/models/pagedResponse'

export function mapPlanResponseToPlan(response?: PlanResponse): Plan | undefined {
  if (!response) return undefined
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    price: response.price,
    active: response.active,
  }
}

export function mapPagedPlanResponseToPlans(paged?: PagedResponse<PlanResponse>) {
  return {
    items: Array.isArray(paged?.data?.items)
      ? (paged.data.items.map(mapPlanResponseToPlan).filter(Boolean) as Plan[])
      : [],
    totalCount: paged?.data?.totalCount ?? 0,
  }
}

export function mapPlanToCreatePlanRequest(plan: Plan): CreatePlanRequest {
  return {
    name: plan.name,
    description: plan.description,
    price: plan.price,
  }
}

export function mapPlanToUpdatePlanRequest(plan: Plan): UpdatePlanRequest {
  return {
    id: plan.id!,
    name: plan.name,
    description: plan.description,
    price: plan.price,
  }
}
