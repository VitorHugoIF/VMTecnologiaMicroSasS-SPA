import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CategoryHttpService } from '@/modules/services/http'
import { ApiError } from '@/core/models/errorResponse'
import { Toast } from '@/components'

export function useCreateCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: CategoryHttpService.createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      if (error instanceof ApiError && error.response.status >= 500) {
        Toast.error(
          { title: 'Oops!', description: error.response.message },
          { id: 'create-category-error' },
        )
      }
    },
  })
} 