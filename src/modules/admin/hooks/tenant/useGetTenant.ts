import { useQuery } from '@tanstack/react-query'
import { TenantHttpService } from '../../../services/http'
import { mapTenantResponseToTenant } from '../../mappers/tenantMappers'

export function useGetTenant(id: string) {
  return useQuery({
    queryKey: ['tenant', id],
    queryFn: async () => {
      const response = await TenantHttpService.getTenant(id)
      return mapTenantResponseToTenant(response.data)
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
