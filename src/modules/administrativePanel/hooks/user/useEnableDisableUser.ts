import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserHttpService } from '@/modules/services/http'

export function useEnableDisableUser() {
  const queryClient = useQueryClient()

  const enableMutation = useMutation({
    mutationFn: (id: string) => UserHttpService.enableUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  const disableMutation = useMutation({
    mutationFn: (id: string) => UserHttpService.disableUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  return {
    enableUser: enableMutation.mutate,
    disableUser: disableMutation.mutate,
    isEnabling: enableMutation.isPending,
    isDisabling: disableMutation.isPending,
  }
}
