import { useMutation, useQueryClient } from '@tanstack/react-query'
import { RoleHttpService } from '../../../services/http'
import { ApiError } from '@/core/models/errorResponse'
import { Toast } from '@/components'

export function useEnableDisableRole() {
  const queryClient = useQueryClient()

  const enable = useMutation({
    mutationFn: (id: string) => RoleHttpService.enableRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      if (error instanceof ApiError && error.response.status >= 500) {
        Toast.error(
          { title: 'Oops!', description: error.response.message },
          { id: 'enable-role-error' },
        )
      }
    },
  })

  const disable = useMutation({
    mutationFn: (id: string) => RoleHttpService.disableRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error) => {
      if (error instanceof ApiError && error.response.status >= 500) {
        Toast.error(
          { title: 'Oops!', description: error.response.message },
          { id: 'disable-role-error' },
        )
      }
    },
  })

  return { enable, disable }
}
