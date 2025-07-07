import type { User } from '../types'
import type { UserResponse, UserListResponse } from '../models'
import type { CreateUserRequest } from '../models/request/createUserRequest'
import type { UpdateUserRequest } from '../models/request/updateUserRequest'
import type { PagedResponse } from '@/core/models/pagedResponse'

export function mapUserResponseToUser(response: UserResponse): User {
  return {
    id: response.id,
    name: response.name,
    active: response.active,
    roles: response.roles?.map(role => ({
      id: role.id,
      name: role.name,
      description: role.description,
      active: role.active,
      code: role.code,
    })),
    createdAt: response.createdAt,
  }
}

export function mapUserListResponseToUser(response: UserListResponse): User {
  return {
    id: response.id,
    name: response.name,
    active: response.active,
    roles: response.roles?.map(roleId => ({
      id: roleId,
      name: roleId,
    })),
  }
}

export function mapUserToCreateUserRequest(user: { name: string; password: string; roles: string[] }): CreateUserRequest {
  return {
    name: user.name,
    password: user.password,
    roles: user.roles,
  }
}

export function mapUserToUpdateUserRequest(user: { id?: string; name: string; password: string; roles: string[] }): UpdateUserRequest {
  return {
    id: user.id,
    name: user.name,
    password: user.password,
    roles: user.roles,
  }
}

export function mapPagedUserListResponseToUsers(paged?: PagedResponse<UserListResponse>) {
  return {
    items: Array.isArray(paged?.data?.items)
      ? (paged.data.items.map(mapUserListResponseToUser).filter(Boolean) as User[])
      : [],
    totalCount: paged?.data?.totalCount ?? 0,
  }
} 