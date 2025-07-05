import { useQuery } from '@tanstack/react-query'
import { UserHttpService } from '../../../services/http'

export function useGetUser(id: string) {
  return useQuery({
    queryKey: ['useGetUser', id],
    queryFn: () => UserHttpService.getUser(id),
    enabled: !!id,
  })
} 