import { http, HttpResponse } from 'msw'
import type { TenantResponse } from '../../modules/admin/models/response/tenantResponse'
import type { PagedResponse } from '../../core/models/pagedResponse'

const base = '/api/admin/tenant'

export const tenantHandlers = [
  http.get(base, ({ request }) => {
    const url = new URL(request.url, window.location.origin)
    const page = Number(url.searchParams.get('page') ?? 1)
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10)
    const search = url.searchParams.get('search')?.toLowerCase() || ''
    let items = [
      {
        id: '1',
        name: 'Tenant 1',
        slug: 'tenant-1',
        email: 'tenant1@email.com',
        planId: '1',
        status: 'active',
        plan: {
          id: '1',
          name: 'Plano Básico',
          description: 'Descrição do Plano Básico',
          price: 99.99,
          active: true,
        },
      },
      {
        id: '2',
        name: 'Tenant 2',
        slug: 'tenant-2',
        email: 'tenant2@email.com',
        planId: '2',
        status: 'inactive',
        plan: {
          id: '2',
          name: 'Plano Avançado',
          description: 'Descrição do Plano Avançado',
          price: 199.99,
          active: false,
        },
      },
    ]
    if (search) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.email.toLowerCase().includes(search) ||
          item.slug.toLowerCase().includes(search),
      )
    }
    const totalCount = items.length
    const pagedItems = items.slice((page - 1) * pageSize, page * pageSize)
    const response: PagedResponse<TenantResponse> = {
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
    return HttpResponse.json<PagedResponse<TenantResponse>>(response)
  }),
  http.get(`${base}/:id`, ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')
    const response = {
      data: {
        id,
        name: `Tenant ${id}`,
        slug: `tenant-${id}`,
        email: `tenant${id}@email.com`,
        planId: '1',
        status: 'active',
        plan: {
          id: '1',
          name: 'Plano Básico',
          description: 'Descrição do Plano Básico',
          price: 99.99,
          active: true,
        },
      },
    }
    return HttpResponse.json(response)
  }),
  http.post(base, async ({ request }) => {
    const body = (await request.json()) as Partial<Omit<TenantResponse, 'id'>>
    const response: TenantResponse = {
      id: '999',
      name: body.name ?? 'Tenant 999',
      slug: body.slug ?? 'tenant-999',
      email: body.email ?? 'tenant999@email.com',
      planId: body.planId ?? '1',
      status: body.status ?? 'active',
      plan: body.plan,
    }
    return HttpResponse.json<TenantResponse>(response, { status: 201 })
  }),
  http.put(`${base}/:id`, async ({ params, request }) => {
    const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')
    const body = (await request.json()) as Partial<Omit<TenantResponse, 'id'>>
    const response: TenantResponse = {
      id,
      name: body.name ?? `Tenant ${id}`,
      slug: body.slug ?? `tenant-${id}`,
      email: body.email ?? `tenant${id}@email.com`,
      planId: body.planId ?? '1',
      status: body.status ?? 'active',
      plan: body.plan,
    }
    return HttpResponse.json<TenantResponse>(response)
  }),
  http.patch(`${base}/:id/enable`, ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')
    const response: TenantResponse = {
      id,
      name: 'Tenant Mock',
      slug: 'tenant-mock',
      email: 'tenant@email.com',
      planId: '1',
      status: 'active',
    }
    return HttpResponse.json<TenantResponse>(response)
  }),
  http.patch(`${base}/:id/disable`, ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? '')
    const response: TenantResponse = {
      id,
      name: 'Tenant Mock',
      slug: 'tenant-mock',
      email: 'tenant@email.com',
      planId: '1',
      status: 'inactive',
    }
    return HttpResponse.json<TenantResponse>(response)
  }),
]
