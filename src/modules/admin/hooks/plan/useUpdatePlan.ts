import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlanHttpService } from '../../../services/http'
import type { UpdatePlanRequest } from '../../models'
import { ApiError } from '@/core/models/errorResponse'
import { Toast } from '@/components'

export function useUpdatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlanRequest }) => PlanHttpService.updatePlan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetPlans'] })
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        Toast.error(
          { title: 'Oops!', description: error.response.message },
          { id: 'update-plan-error' },
        )
      } else {
        Toast.error({ title: 'Oops!', description: error.message }, { id: 'update-plan-error' })
      }
    },
  })
}
