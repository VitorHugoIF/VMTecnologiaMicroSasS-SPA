import { useQuery } from '@tanstack/react-query'
import { UserHttpService } from '../../../services/http'
import { QueryTimeConfig } from '@/config/queryTimeConfig'

export function useGetUsers(
  page: number,
  pageSize: number,
  order?: number,
  sort?: string,
  search?: string,
) {
  return useQuery({
    queryKey: ['useGetUsers', page, pageSize, order, sort, search],
    queryFn: async () => UserHttpService.getUsers(page, pageSize, order, sort, search),
    staleTime: QueryTimeConfig.users.staleTime,
  })
} 