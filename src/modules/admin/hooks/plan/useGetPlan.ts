import { useQuery } from '@tanstack/react-query'
import { planHttpService } from '../../services'
import { QueryTimeConfig } from '@/config/queryTimeConfig'

export function useGetPlan(id: string) {
  return useQuery({
    queryKey: ['useGetPlan', id],
    queryFn: () => planHttpService.getPlan(id),
    staleTime: QueryTimeConfig.plans.staleTime,
    enabled: !!id,
  })
}
