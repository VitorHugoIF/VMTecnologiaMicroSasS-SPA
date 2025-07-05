import { useQuery } from '@tanstack/react-query'
import { PlanHttpService } from '../../../services/http'
import { QueryTimeConfig } from '@/config/queryTimeConfig'

export function useGetPlans(
  page: number,
  pageSize: number,
  order?: number,
  sort?: string,
  search?: string,
) {
  return useQuery({
    queryKey: ['useGetPlans', page, pageSize, order, sort, search],
    queryFn: () => PlanHttpService.getPlans(page, pageSize, order, sort, search),
    staleTime: QueryTimeConfig.plans.staleTime,
  })
}
