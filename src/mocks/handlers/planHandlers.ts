import { http, HttpResponse } from 'msw'
import type { PlanResponse } from '../../modules/admin/models/response/planResponse'
import type { PagedResponse } from '../../core/models/pagedResponse'

const base = '/api/admin/plan'

export const planHandlers = [
  http.get(base, ({ request }) => {
    const url = new URL(request.url, window.location.origin)
    const page = Number(url.searchParams.get('page') ?? 1)
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10)
    const search = url.searchParams.get('search')?.toLowerCase() || ''
    let items = [
      {
        id: '1',
        name: 'Plano Básico',
        description: 'Descrição do Plano Básico',
        price: 99.99,
        active: true,
      },
      {
        id: '2',
        name: 'Plano Avançado',
        description: 'Descrição do Plano Avançado',
        price: 199.99,
        active: false,
      },
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
    const response: PagedResponse<PlanResponse> = {
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
    return HttpResponse.json<PagedResponse<PlanResponse>>(response)
  }),
  http.get(`${base}/:id`, ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')
    const response = {
      data: {
        id,
        name: `Plano ${id}`,
        description: `Descrição do Plano ${id}`,
        price: 123.45,
        active: true,
      },
    }
    return HttpResponse.json(response)
  }),
  http.post(base, async ({ request }) => {
    const body = (await request.json()) as Partial<Omit<PlanResponse, 'id'>>
    const response: PlanResponse = { id: '999', ...body }
    return HttpResponse.json<PlanResponse>(response, { status: 201 })
  }),
  http.put(`${base}/:id`, async ({ params, request }) => {
    const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')
    const body = (await request.json()) as Partial<Omit<PlanResponse, 'id'>>
    const response: PlanResponse = { id, ...body }
    return HttpResponse.json<PlanResponse>(response)
  }),
  http.patch(`${base}/:id/enable`, ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')
    const response: PlanResponse = { id, active: true }
    return HttpResponse.json<PlanResponse>(response)
  }),
  http.patch(`${base}/:id/disable`, ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')
    const response: PlanResponse = { id, active: false }
    return HttpResponse.json<PlanResponse>(response)
  }),
]
