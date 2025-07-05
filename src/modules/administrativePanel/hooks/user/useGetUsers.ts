import { useQuery } from '@tanstack/react-query'
import { UserHttpService } from '../../../services/http'

export function useGetUsers(
  page: number,
  pageSize: number,
  order?: number,
  sort?: string,
  search?: string,
) {
  return useQuery({
    queryKey: ['useGetUsers', page, pageSize, order, sort, search],
    queryFn: () => UserHttpService.getUsers(page, pageSize, order, sort, search),
    staleTime: 60 * 60 * 1000, // 1 hora
  })
} 