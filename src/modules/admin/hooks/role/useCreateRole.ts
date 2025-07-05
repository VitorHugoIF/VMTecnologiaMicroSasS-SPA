import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RoleHttpService } from '../../../services/http'
import type { CreateRoleRequest } from '../../models'
import { ApiError } from '@/core/models/errorResponse'
import { Toast } from '@/components'

export function useCreateRole() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateRoleRequest) => RoleHttpService.createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      if (error instanceof ApiError && error.response.status >= 500) {
        Toast.error(
          { title: 'Oops!', description: error.response.message },
          { id: 'create-role-error' },
        )
      }
    },
  })
}
