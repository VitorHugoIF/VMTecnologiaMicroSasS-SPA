import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TenantHttpService } from '../../../services/http'
import type { CreateTenantRequest } from '../../models'

export function useCreateTenant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: CreateTenantRequest) => TenantHttpService.createTenant(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tenants'] })
    },
  })
}
