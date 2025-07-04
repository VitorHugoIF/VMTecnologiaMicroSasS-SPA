import { useTranslation } from 'react-i18next'
import type { TableColumn } from '@/components/Table'
import type { Tenant } from './tenant'

export function useTenantTableColumns(): TableColumn<Tenant>[] {
  const { t } = useTranslation()
  return [
    {
      accessor: 'name',
      header: t('tenants.list.table.column_name'),
    },
    {
      accessor: 'slug',
      header: t('tenants.list.table.column_slug'),
    },
    {
      accessor: 'email',
      header: t('tenants.list.table.column_email'),
    },
    {
      accessor: 'planId',
      header: t('tenants.list.table.column_plan'),
    },
    {
      accessor: 'status',
      header: t('tenants.list.table.column_status'),
    },
  ]
}
