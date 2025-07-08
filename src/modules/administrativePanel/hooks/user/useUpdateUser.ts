import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserHttpService } from '../../../services/http'
import type { UpdateUserRequest } from '../../models'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      UserHttpService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}
