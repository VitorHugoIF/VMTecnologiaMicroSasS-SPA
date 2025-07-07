export type UserResponse = {
  id?: string
  name?: string
  active?: boolean
  roles?: RoleResponse[]
  createdAt?: string
}

export type UserListResponse = {
  id?: string
  name?: string
  active?: boolean
  roles?: string[]
}

export type RoleResponse = {
  id?: string
  name?: string
  description?: string
  active?: boolean
  code?: string
} 