export type User = {
  id?: string
  name?: string
  active?: boolean
  roles?: Role[]
  createdAt?: string
}

export type Role = {
  id?: string
  name?: string
  description?: string
  active?: boolean
  code?: string
}
