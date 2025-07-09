import { useQuery } from '@tanstack/react-query'
import { UserHttpService } from '@/modules/services/http'
import { QueryTimeConfig } from '@/config/queryTimeConfig'
import type { RoleResponse } from '@/modules/administrativePanel/models/response/userResponse'

export function useGetActiveRoles() {
  return useQuery<RoleResponse[]>({
    queryKey: ['useGetActiveRoles'],
    queryFn: async () => {
      const response = await UserHttpService.getActiveRoles()
      const roles: RoleResponse[] = Array.isArray(response.data) ? response.data : []
      return roles;
    },
    staleTime: QueryTimeConfig.roles.staleTime,
  })
} 