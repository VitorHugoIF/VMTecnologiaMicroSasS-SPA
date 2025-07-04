import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateTenant } from '../../services/tenantHttpService'
import type { UpdateTenantRequest } from '../../models'

export function useUpdateTenant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: UpdateTenantRequest }) =>
      updateTenant(id, request),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] })
      queryClient.invalidateQueries({ queryKey: ['tenant', id] })
    },
  })
}
