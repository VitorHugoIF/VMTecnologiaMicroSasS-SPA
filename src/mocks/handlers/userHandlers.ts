import { http, HttpResponse } from 'msw';
import type { UserResponse, UserListResponse } from '../../modules/administrativePanel/models';
import type { PagedResponse } from '../../core/models/pagedResponse';

const base = '/api/auth/users';

export const userHandlers = [
  http.get(base, ({ request }) => {
    const url = new URL(request.url, window.location.origin);
    const page = Number(url.searchParams.get('page') ?? 1);
    const pageSize = Number(url.searchParams.get('pageSize') ?? 10);
    const search = url.searchParams.get('search')?.toLowerCase() || '';
    let items = [
      { id: '1', name: 'Usuário 1', active: true, roles: ['1'] },
      { id: '2', name: 'Usuário 2', active: false, roles: ['2'] },
    ];
    if (search) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(search)
      );
    }
    const totalCount = items.length;
    const pagedItems = items.slice((page - 1) * pageSize, page * pageSize);
    const response: PagedResponse<UserListResponse> = {
      success: true,
      data: {
        items: pagedItems,
        totalCount,
        page,
        pageSize,
      },
      errors: [],
      message: '',
    };
    return HttpResponse.json<PagedResponse<UserListResponse>>(response);
  }),
  http.get(`${base}/:id`, ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? '';
    const response = {
      data: {
        id,
        name: `Usuário ${id}`,
        active: true,
        createdAt: '2023-01-01',
        updatedAt: '2023-01-10',
        roles: [{ id: '1', name: 'Admin', active: true, code: 'ADMIN' }],
      }
    };
    return HttpResponse.json(response);
  }),
  http.post(base, async ({ request }) => {
    const body = await request.json() as Omit<UserResponse, 'id'>;
    const response = {
      data: {
        id: '999',
        ...body,
      }
    };
    return HttpResponse.json(response, { status: 201 });
  }),
  http.put(`${base}/:id`, async ({ params, request }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? '';
    const body = await request.json() as Omit<UserResponse, 'id'>;
    const response = {
      data: {
        id,
        ...body,
      }
    };
    return HttpResponse.json(response);
  }),
  http.patch(`${base}/:id/enable`, ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? '';
    const response = {
      data: {
        id,
        active: true,
      }
    };
    return HttpResponse.json(response);
  }),
  http.patch(`${base}/:id/disable`, ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? '';
    const response = {
      data: {
        id,
        active: false,
      }
    };
    return HttpResponse.json(response);
  }),
]; 