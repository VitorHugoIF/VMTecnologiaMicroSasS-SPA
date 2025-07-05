import { useQuery } from '@tanstack/react-query'
import { RoleHttpService } from '../../../services/http'
import { QueryTimeConfig } from '@/config/queryTimeConfig'

export function useGetRoles(
  page: number,
  pageSize: number,
  order?: number,
  sort?: string,
  search?: string,
) {
  return useQuery({
    queryKey: ['useGetRoles', page, pageSize, order, sort, search],
    queryFn: () => RoleHttpService.getRoles(page, pageSize, order, sort, search),
    staleTime: QueryTimeConfig.roles.staleTime,
  })
}
