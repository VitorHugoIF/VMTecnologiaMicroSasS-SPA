import type { User } from '../types'
import type { UserResponse, UserListResponse } from '../models'

export function mapUserResponseToUser(response: UserResponse): User {
  return {
    id: response.id,
    name: response.name,
    active: response.active,
    createdAt: response.createdAt,
    updatedAt: response.updatedAt,
    roles: response.roles?.map(role => ({
      id: role.id,
      name: role.name,
      description: role.description,
      active: role.active,
      code: role.code,
    })),
  }
}

export function mapUserListResponseToUser(response: UserListResponse): User {
  return {
    id: response.id,
    name: response.name,
    active: response.active,
    roles: response.roles?.map(roleName => ({
      name: roleName,
    })),
  }
} 