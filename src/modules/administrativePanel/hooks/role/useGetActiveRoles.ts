import { useQuery } from '@tanstack/react-query'
import { RoleHttpService } from '../../../services/http'
import { QueryTimeConfig } from '@/config/queryTimeConfig'
import { mapPagedRoleResponseToActiveRoles } from '@/modules/admin/mappers/roleMappers'
import type { ActiveRoleResponse } from '@/modules/admin/models/response/roleResponse'

export function useGetActiveRoles() {
  return useQuery<ActiveRoleResponse[]>({
    queryKey: ['useGetActiveRoles'],
    queryFn: async () => {
      const response = await RoleHttpService.getActiveRoles()
      return mapPagedRoleResponseToActiveRoles(response)
    },
    staleTime: QueryTimeConfig.roles.staleTime
  })
} 