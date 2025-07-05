import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TenantHttpService } from '../../../services/http'

export function useEnableDisableTenant() {
  const queryClient = useQueryClient()

  const enableMutation = useMutation({
    mutationFn: (id: string) => TenantHttpService.enableTenant(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] })
      queryClient.invalidateQueries({ queryKey: ['tenant', id] })
    },
  })

  const disableMutation = useMutation({
    mutationFn: (id: string) => TenantHttpService.disableTenant(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] })
      queryClient.invalidateQueries({ queryKey: ['tenant', id] })
    },
  })

  return {
    enable: enableMutation,
    disable: disableMutation,
  }
}
