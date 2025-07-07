import { useQuery } from '@tanstack/react-query'
import { TenantHttpService } from '../../../services/http'
import { mapTenantResponseToTenant } from '../../mappers/tenantMappers'
import { QueryTimeConfig } from '@/config/queryTimeConfig'

export function useGetTenant(id: string) {
  return useQuery({
    queryKey: ['tenant', id],
    queryFn: async () => {
      const response = await TenantHttpService.getTenant(id)
      return mapTenantResponseToTenant(response.data)
    },
    enabled: !!id,
    staleTime: QueryTimeConfig.tenants.staleTime,
  })
}
