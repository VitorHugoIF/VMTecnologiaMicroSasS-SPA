import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TenantHttpService } from '@/modules/services/http'

export function useEnableDisableTenant() {
  const queryClient = useQueryClient()

  const enableMutation = useMutation({
    mutationFn: (id: string) => TenantHttpService.enableTenant(id),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  const disableMutation = useMutation({
    mutationFn: (id: string) => TenantHttpService.disableTenant(id),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })

  return {
    enable: enableMutation,
    disable: disableMutation,
  }
}
