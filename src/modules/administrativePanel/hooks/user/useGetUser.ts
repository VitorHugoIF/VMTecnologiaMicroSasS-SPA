import { useQuery } from '@tanstack/react-query'
import { UserHttpService } from '../../../services/http'
import { QueryTimeConfig } from '@/config/queryTimeConfig'

export function useGetUser(id: string) {
  return useQuery({
    queryKey: ['useGetUser', id],
    queryFn: async () => UserHttpService.getUser(id),
    enabled: !!id,
    staleTime: QueryTimeConfig.users.staleTime,
  })
}
