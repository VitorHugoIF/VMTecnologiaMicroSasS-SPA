import { useQuery } from '@tanstack/react-query'
import { getTenant } from '../../services/tenantHttpService'
import { mapTenantResponseToTenant } from '../../mappers/tenantMappers'

export function useGetTenant(id: string) {
  return useQuery({
    queryKey: ['tenant', id],
    queryFn: async () => {
      const response = await getTenant(id)
      return mapTenantResponseToTenant(response.data)
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
