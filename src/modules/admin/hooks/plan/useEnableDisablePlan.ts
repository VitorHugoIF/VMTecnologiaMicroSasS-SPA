import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlanHttpService } from '../../../services/http'
import { ApiError } from '@/core/models/errorResponse'
import { Toast } from '@/components'

export function useEnableDisablePlan() {
  const queryClient = useQueryClient()

  const enableMutation = useMutation({
    mutationFn: (id: string) => PlanHttpService.enablePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      if (error instanceof ApiError && error.response.status >= 500) {
        Toast.error(
          { title: 'Oops!', description: error.response.message },
          { id: 'enable-plan-error' },
        )
      }
    },
  })

  const disableMutation = useMutation({
    mutationFn: (id: string) => PlanHttpService.disablePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      if (error instanceof ApiError && error.response.status >= 500) {
        Toast.error(
          { title: 'Oops!', description: error.response.message },
          { id: 'disable-plan-error' },
        )
      }
    },
  })

  return {
    enablePlan: enableMutation.mutate,
    disablePlan: disableMutation.mutate,
    isEnabling: enableMutation.isPending,
    isDisabling: disableMutation.isPending,
  }
}
