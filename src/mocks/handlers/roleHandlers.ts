import { http, HttpResponse } from 'msw'
import type { RoleResponse } from '../../modules/admin/models/response/roleResponse'
import type { PagedResponse } from '../../core/models/pagedResponse'

const base = '/api/admin/role'

export const roleHandlers = [
  http.get(base, ({ request }) => {
    const url = new URL(request.url, window.location.origin)
    const page = Number(url.searchParams.get('page') ?? 1)
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10)
    const search = url.searchParams.get('search')?.toLowerCase() || ''
    let items = [
      {
        id: '1',
        name: 'Admin',
        description: 'Administrador do sistema',
        active: true,
        code: 'ADMIN',
      },
      { id: '2', name: 'User', description: 'Usuário comum', active: true, code: 'USER' },
    ]
    if (search) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search),
      )
    }
    const totalCount = items.length
    const pagedItems = items.slice((page - 1) * pageSize, page * pageSize)
    const response: PagedResponse<RoleResponse> = {
      success: true,
      data: {
        items: pagedItems,
        totalCount,
        page,
        pageSize,
      },
      errors: [],
      message: '',
    }
    return HttpResponse.json<PagedResponse<RoleResponse>>(response)
  }),
  http.get(`${base}/:id`, ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')
    const response = {
      data: {
        id,
        name: `Role ${id}`,
        description: `Descrição do Role ${id}`,
        active: true,
        code: `CODE${id}`,
      },
    }
    return HttpResponse.json(response)
  }),
  http.post(base, async ({ request }) => {
    const body = (await request.json()) as Omit<RoleResponse, 'id'>
    const response: RoleResponse = { id: '999', ...body }
    return HttpResponse.json<RoleResponse>(response, { status: 201 })
  }),
  http.put(`${base}/:id`, async ({ params, request }) => {
    const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')
    const body = (await request.json()) as Omit<RoleResponse, 'id'>
    const response: RoleResponse = { id, ...body }
    return HttpResponse.json<RoleResponse>(response)
  }),
  http.patch(`${base}/:id/enable`, ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')
    const response: RoleResponse = { id, active: true }
    return HttpResponse.json<RoleResponse>(response)
  }),
  http.patch(`${base}/:id/disable`, ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')
    const response: RoleResponse = { id, active: false }
    return HttpResponse.json<RoleResponse>(response)
  }),
]
