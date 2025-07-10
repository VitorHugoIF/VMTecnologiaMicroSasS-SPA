import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BrandHttpService } from '@/modules/services/http'
import { ApiError } from '@/core/models/errorResponse'
import { Toast } from '@/components'

export function useUpdateBrand() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: BrandHttpService.updateBrand,
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      if (error instanceof ApiError && error.response.status >= 500) {
        Toast.error(
          { title: 'Oops!', description: error.response.message },
          { id: 'update-brand-error' },
        )
      }
    },
  })
} 