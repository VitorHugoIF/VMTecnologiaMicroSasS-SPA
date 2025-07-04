import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTenant } from '../../services/tenantHttpService'
import type { CreateTenantRequest } from '../../models'

export function useCreateTenant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: CreateTenantRequest) => createTenant(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] })
    },
  })
}
