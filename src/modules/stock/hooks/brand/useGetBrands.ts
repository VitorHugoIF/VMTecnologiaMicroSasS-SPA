import { useQuery } from '@tanstack/react-query'
import { getBrands } from '@/modules/services/http/brandHttpService'
import { QueryTimeConfig } from '@/config/queryTimeConfig'

export function useGetBrands(
  page: number = 1,
  pageSize: number = 10,
  search?: string,
  sort?: string,
  order?: number,
) {
  return useQuery({
    queryKey: ['brands', page, pageSize, search, sort, order],
    queryFn: async () => getBrands(page, pageSize, order, sort, search),
    staleTime: QueryTimeConfig.tenants.staleTime,
  })
} 