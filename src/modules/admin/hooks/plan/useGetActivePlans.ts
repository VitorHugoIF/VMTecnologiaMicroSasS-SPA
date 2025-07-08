import { useQuery } from '@tanstack/react-query'
import { PlanHttpService } from '../../../services/http'
import { QueryTimeConfig } from '@/config/queryTimeConfig'
import { mapPagedPlanResponseToActivePlans } from '@/modules/admin/mappers/planMappers'
import type { Plan } from '@/modules/admin/types'

export function useGetActivePlans() {
  return useQuery<Plan[]>({
    queryKey: ['useGetActivePlans'],
    queryFn: async () => {
      const response = await PlanHttpService.getActivePlans()
      return mapPagedPlanResponseToActivePlans(response)
    },
    staleTime: QueryTimeConfig.plans.staleTime,
  })
}
