import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlanHttpService } from '../../../services/http'
import type { CreatePlanRequest } from '../../models'
import { ApiError } from '@/core/models/errorResponse'
import { Toast } from '@/components'

export function useCreatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePlanRequest) => PlanHttpService.createPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      if (error instanceof ApiError && error.response.status >= 500) {
        Toast.error(
          { title: 'Oops!', description: error.response.message },
          { id: 'create-plan-error' },
        )
      }
    },
  })
}
