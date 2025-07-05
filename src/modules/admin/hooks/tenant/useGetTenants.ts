import { useQuery } from '@tanstack/react-query'
import { TenantHttpService } from '../../../services/http'
import { mapTenantResponseToTenant } from '../../mappers/tenantMappers'
import type { Tenant } from '../../types'

export function useGetTenants(
  page: number = 1,
  size: number = 10,
  search?: string,
  sort?: string,
  order?: number,
) {
  return useQuery({
    queryKey: ['tenants', page, size, search, sort, order],
    queryFn: async () => {
      const response = await TenantHttpService.getTenants(page, size, search, sort, order)
      return {
        ...response,
        data: {
          ...response.data,
          items: response.data.items.map(mapTenantResponseToTenant).filter(Boolean) as Tenant[],
        },
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
