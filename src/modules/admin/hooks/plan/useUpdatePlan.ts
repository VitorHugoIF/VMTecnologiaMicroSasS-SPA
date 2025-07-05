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
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      if (error instanceof ApiError && error.response.status >= 500) {
        Toast.error(
          { title: 'Oops!', description: error.response.message },
          { id: 'update-plan-error' },
        )
      }
    },
  })
}
