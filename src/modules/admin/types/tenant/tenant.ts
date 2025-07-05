export type Tenant = {
  id: string
  name: string
  slug: string
  email: string
  planId: string
  status: string
  plan?: {
    id: string
    name: string
    description: string
    price: number
    active: boolean
  }
}
