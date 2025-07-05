import { useMutation, useQueryClient } from '@tanstack/react-query'
import { TenantHttpService } from '../../../services/http'
import type { UpdateTenantRequest } from '../../models'

export function useUpdateTenant() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: UpdateTenantRequest }) =>
      TenantHttpService.updateTenant(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
  })
}
