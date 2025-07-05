import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RoleHttpService } from '../../../services/http'
import type { UpdateRoleRequest } from '../../models/request/updateRoleRequest'
import { ApiError } from '@/core/models/errorResponse'
import { Toast } from '@/components'

export function useUpdateRole() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateRoleRequest) => RoleHttpService.updateRole(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      if (error instanceof ApiError && error.response.status >= 500) {
        Toast.error(
          { title: 'Oops!', description: error.response.message },
          { id: 'update-role-error' },
        )
      }
    },
  })
}
