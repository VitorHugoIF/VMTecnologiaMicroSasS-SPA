export const PREFIX_ROUTE = '/app'

export const MAIN_ROUTE_AUTH0 = PREFIX_ROUTE + '/admin/tenant'

export const MAIN_ROUTE = PREFIX_ROUTE +'/sale/dashboard'

export const NOT_FOUND_ROUTE = PREFIX_ROUTE +'/notfound'

export const FORBIDDEN_ROUTE = PREFIX_ROUTE +'/forbidden'

export const ERROR_ROUTE = PREFIX_ROUTE +'/error'

export const VERIFIEDEMAIL_ROUTE = PREFIX_ROUTE +'/virifiedemail'

// Admin Routes
export const ADMIN_ROUTES = {
  tenant: PREFIX_ROUTE + '/admin/tenant',
  roles: {
    list: PREFIX_ROUTE + '/admin/roles',
    add: PREFIX_ROUTE + '/admin/roles/add',
    edit: (id: string) => PREFIX_ROUTE + `/admin/roles/edit/${id}`,
    view: (id: string) => PREFIX_ROUTE + `/admin/roles/view/${id}`
  },
  plans: {
    list: PREFIX_ROUTE + '/admin/plans',
    add: PREFIX_ROUTE + '/admin/plans/add',
    edit: (id: string) => PREFIX_ROUTE + `/admin/plans/edit/${id}`,
    view: (id: string) => PREFIX_ROUTE + `/admin/plans/view/${id}`
  },
  users: PREFIX_ROUTE + '/admin/users'
}

