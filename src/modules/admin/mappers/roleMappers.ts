import type { RoleResponse } from '../models/response/roleResponse'
import type { Role } from '../types/role/role'
import type { CreateRoleRequest, UpdateRoleRequest } from '../models'
import type { PagedResponse } from '@/core/models/pagedResponse'

export function mapRoleResponseToRole(response?: RoleResponse): Role | undefined {
  if (!response) return undefined
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    active: response.active,
    code: response.code,
  }
}

export function mapPagedRoleResponseToRoles(paged?: PagedResponse<RoleResponse>) {
  return {
    items: Array.isArray(paged?.data?.items)
      ? (paged.data.items.map(mapRoleResponseToRole).filter(Boolean) as Role[])
      : [],
    totalCount: paged?.data?.totalCount ?? 0,
  }
}

export function mapRoleToCreateRoleRequest(role: Role): CreateRoleRequest {
  return {
    name: role.name,
    description: role.description,
  }
}

export function mapRoleToUpdateRoleRequest(role: Role): UpdateRoleRequest {
  return {
    id: role.id!,
    name: role.name,
    description: role.description,
  }
}
