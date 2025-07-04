import type { RoleResponse } from '../models/response/roleResponse';
import type { Role } from '../types/role/role';
import type { PagedResponse } from '@/core/models/pagedResponse';

export function mapRoleResponseToRole(response?: RoleResponse): Role | undefined {
  if (!response) return undefined;
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    active: response.active,
    code: response.code,
  };
}

export function mapPagedRoleResponseToRoles(paged?: PagedResponse<RoleResponse>) {
  return {
    items: Array.isArray(paged?.data?.items)
      ? paged.data.items.map(mapRoleResponseToRole).filter(Boolean) as Role[]
      : [],
    totalCount: paged?.data?.totalCount ?? 0,
  };
} 