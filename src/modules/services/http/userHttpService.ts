import { http } from '@/services/http'
import type { UserResponse, UserListResponse } from '../../administrativePanel/models'
import type { ApiResponse } from '@/core/models/apiResponse'
import type { PagedResponse } from '@/core/models/pagedResponse'
import type { CreateUserRequest } from '../../administrativePanel/models/request/createUserRequest'
import type { UpdateUserRequest } from '../../administrativePanel/models/request/updateUserRequest'

const prefix = 'api/auth/users'

export async function getUsers(
  page: number = 1,
  pageSize: number = 10,
  order?: number,
  sort?: string,
  search?: string,
) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  })
  if (order !== undefined) params.append('order', String(order))
  if (sort) params.append('sort', sort)
  if (search) params.append('search', search)

  const { data } = await http.get<PagedResponse<UserListResponse>>(`${prefix}?${params.toString()}`)

  return data
}

export async function getUser(id: string) {
  const { data } = await http.get<ApiResponse<UserResponse>>(`${prefix}/${id}`)
  return data
}

export async function createUser(dto: CreateUserRequest) {
  const { data } = await http.post<ApiResponse<UserResponse>>(`${prefix}`, dto)
  return data
}

export async function enableUser(id: string) {
  const { data } = await http.patch<ApiResponse<UserResponse>>(`${prefix}/${id}/enable`)
  return data
}

export async function disableUser(id: string) {
  const { data } = await http.patch<ApiResponse<UserResponse>>(`${prefix}/${id}/disable`)
  return data
}

export async function updateUser(id: string, dto: UpdateUserRequest) {
  const { data } = await http.put<ApiResponse<UserResponse>>(`${prefix}/${id}`, dto)
  return data
} 