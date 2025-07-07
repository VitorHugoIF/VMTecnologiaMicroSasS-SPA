import { useQuery } from '@tanstack/react-query'
import { TenantHttpService } from '../../../services/http'
import { mapTenantResponseToTenant } from '../../mappers/tenantMappers'
import type { Tenant } from '../../types'
import { QueryTimeConfig } from '@/config/queryTimeConfig'

export function useGetTenants(
  page: number = 1,
  pageSize: number = 10,
  search?: string,
  sort?: string,
  order?: number,
) {
  return useQuery({
    queryKey: ['tenants', page, pageSize, search, sort, order],
    queryFn: async () => {
      const response = await TenantHttpService.getTenants(page, pageSize, search, sort, order)
      return {
        ...response,
        data: {
          ...response.data,
          items: response.data.items.map(mapTenantResponseToTenant).filter(Boolean) as Tenant[],
        },
      }
    },
    staleTime: QueryTimeConfig.tenants.staleTime,
  })
}
