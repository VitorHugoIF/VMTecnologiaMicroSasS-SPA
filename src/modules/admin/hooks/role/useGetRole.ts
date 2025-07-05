import { useQuery } from '@tanstack/react-query'
import { RoleHttpService } from '../../../services/http'
import { QueryTimeConfig } from '@/config/queryTimeConfig'
import { isNullOrWhiteSpace } from '@/lib/utils'

type UseGetRolePropos = {
  id: string
}

export function useGetRole({ id }: UseGetRolePropos) {
  return useQuery({
    queryKey: ['useGetRole', id],
    queryFn: () => RoleHttpService.getRole(id),
    staleTime: QueryTimeConfig.roles.staleTime,
    enabled: !isNullOrWhiteSpace(id),
  })
}
