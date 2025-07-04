import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createPlan } from '../../services/planHttpService'
import type { CreatePlanRequest } from '../../models'
import { ApiError } from '@/core/models/errorResponse'
import { Toast } from '@/components'

export function useCreatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePlanRequest) => createPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetPlans'] })
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        Toast.error(
          { title: 'Oops!', description: error.response.message },
          { id: 'create-plan-error' },
        )
      } else {
        Toast.error({ title: 'Oops!', description: error.message }, { id: 'create-plan-error' })
      }
    },
  })
}
