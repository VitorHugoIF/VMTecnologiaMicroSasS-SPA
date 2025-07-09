import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserHttpService } from '@/modules/services/http'
import type { CreateUserRequest } from '../../models'

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUserRequest) => UserHttpService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}
