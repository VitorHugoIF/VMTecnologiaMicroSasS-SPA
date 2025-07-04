import { useMutation, useQueryClient } from '@tanstack/react-query'
import { enableTenant, disableTenant } from '../../services/tenantHttpService'

export function useEnableDisableTenant() {
  const queryClient = useQueryClient()

  const enableMutation = useMutation({
    mutationFn: (id: string) => enableTenant(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] })
      queryClient.invalidateQueries({ queryKey: ['tenant', id] })
    },
  })

  const disableMutation = useMutation({
    mutationFn: (id: string) => disableTenant(id),
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
