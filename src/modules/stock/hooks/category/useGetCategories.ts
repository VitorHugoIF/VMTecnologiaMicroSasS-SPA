import { useQuery } from '@tanstack/react-query'
import { getCategories } from '@/modules/services/http/categoryHttpService'
import { QueryTimeConfig } from '@/config/queryTimeConfig'

export function useGetCategories(
  page: number = 1,
  pageSize: number = 10,
  search?: string,
  sort?: string,
  order?: number,
) {
  return useQuery({
    queryKey: ['categories', page, pageSize, search, sort, order],
    queryFn: async () => {
      const response = await getCategories(page, pageSize, order, sort, search)
      return response
    },
    staleTime: QueryTimeConfig.tenants.staleTime,
  })
} 