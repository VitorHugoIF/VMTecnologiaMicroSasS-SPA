export type User = {
  id?: string
  name?: string
  active?: boolean
  createdAt?: string
  updatedAt?: string
  roles?: Role[]
}

export type Role = {
  id?: string
  name?: string
  description?: string
  active?: boolean
  code?: string
} 