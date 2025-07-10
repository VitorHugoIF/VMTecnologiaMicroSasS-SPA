export const PREFIX_ROUTE = '/app'

export const MAIN_ROUTE_AUTH0 = PREFIX_ROUTE + '/dashboard'

export const MAIN_ROUTE = PREFIX_ROUTE + '/dashboard'

export const NOT_FOUND_ROUTE = PREFIX_ROUTE + '/notfound'

export const FORBIDDEN_ROUTE = PREFIX_ROUTE + '/forbidden'

export const ERROR_ROUTE = PREFIX_ROUTE + '/error'

export const VERIFIEDEMAIL_ROUTE = PREFIX_ROUTE + '/virifiedemail'

export const LOGIN_ROUTE = PREFIX_ROUTE + '/login'

export const ADMIN_ROUTES = {
  tenant: {
    list: PREFIX_ROUTE + '/admin/tenant',
    add: PREFIX_ROUTE + '/admin/tenant/add',
    edit: (id: string) => PREFIX_ROUTE + `/admin/tenant/edit/${id}`,
    view: (id: string) => PREFIX_ROUTE + `/admin/tenant/view/${id}`,
  },
  roles: {
    list: PREFIX_ROUTE + '/admin/roles',
    add: PREFIX_ROUTE + '/admin/roles/add',
    edit: (id: string) => PREFIX_ROUTE + `/admin/roles/edit/${id}`,
    view: (id: string) => PREFIX_ROUTE + `/admin/roles/view/${id}`,
  },
  plans: {
    list: PREFIX_ROUTE + '/admin/plans',
    add: PREFIX_ROUTE + '/admin/plans/add',
    edit: (id: string) => PREFIX_ROUTE + `/admin/plans/edit/${id}`,
    view: (id: string) => PREFIX_ROUTE + `/admin/plans/view/${id}`,
  },
  users: PREFIX_ROUTE + '/admin/users',
}

export const ADMINISTRATIVE_PANEL_ROUTES = {
  users: {
    list: PREFIX_ROUTE + '/administrative-panel/user',
    add: PREFIX_ROUTE + '/administrative-panel/user/add',
    edit: (id: string) => PREFIX_ROUTE + `/administrative-panel/user/edit/${id}`,
    view: (id: string) => PREFIX_ROUTE + `/administrative-panel/user/view/${id}`,
  },
}

export const STOCK_ROUTES = {
  brand: {
    list: PREFIX_ROUTE + '/stock/brand',
    add: PREFIX_ROUTE + '/stock/brand/add',
    edit: (id: string) => PREFIX_ROUTE + `/stock/brand/edit/${id}`,
    view: (id: string) => PREFIX_ROUTE + `/stock/brand/view/${id}`,
  },
  category: {
    list: PREFIX_ROUTE + '/stock/category',
    add: PREFIX_ROUTE + '/stock/category/add',
    edit: (id: string) => PREFIX_ROUTE + `/stock/category/edit/${id}`,
    view: (id: string) => PREFIX_ROUTE + `/stock/category/view/${id}`,
  },
}
