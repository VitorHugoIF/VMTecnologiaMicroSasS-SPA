import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserHttpService } from '@/modules/services/http'
import type { UpdateUserRequest } from '../../models'
import { ApiError } from '@/core/models/errorResponse'
import { Toast } from '@/components'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => UserHttpService.updateUser(data.id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      if (error instanceof ApiError && error.response.status >= 500) {
        Toast.error(
          { title: 'Oops!', description: error.response.message },
          { id: 'update-user-error' },
        )
      }
    },
  })
}
