import { useQuery } from '@tanstack/react-query'
import { PlanHttpService } from '../../../services/http'
import { QueryTimeConfig } from '@/config/queryTimeConfig'

export function useGetPlan(id: string) {
  return useQuery({
    queryKey: ['useGetPlan', id],
    queryFn: () => PlanHttpService.getPlan(id),
    staleTime: QueryTimeConfig.plans.staleTime,
    enabled: !!id,
  })
}
