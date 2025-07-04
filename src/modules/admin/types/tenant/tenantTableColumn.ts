import type { TableColumn } from '@/components/Table'
import type { Tenant } from './tenant'

export const tenantTableColumns: TableColumn<Tenant>[] = [
  {
    accessor: 'name',
    header: 'tenants.list.table.column_name',
  },
  {
    accessor: 'slug',
    header: 'tenants.list.table.column_slug',
  },
  {
    accessor: 'email',
    header: 'tenants.list.table.column_email',
  },
  {
    accessor: 'planId',
    header: 'tenants.list.table.column_plan',
  },
  {
    accessor: 'status',
    header: 'tenants.list.table.column_status',
  },
]
