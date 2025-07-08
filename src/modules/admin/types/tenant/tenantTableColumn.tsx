import { useTranslation } from 'react-i18next'
import type { TableColumn } from '@/components/Table'
import type { Tenant } from './tenant'
import { StatusBadge } from '@/components/StatusBadge'

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
      render: (tenant: Tenant) => tenant.plan?.name || tenant.planId,
    },
    {
      accessor: 'status',
      header: t('tenants.list.table.column_status'),
      render: (tenant: Tenant) => {
        let badgeStatus: 'success' | 'canceled' | 'default' = 'default'
        if (tenant.status === 'active') badgeStatus = 'success'
        else if (tenant.status === 'inactive') badgeStatus = 'canceled'
        return (
          <StatusBadge status={badgeStatus}>{t(`tenants.status.${tenant.status}`)}</StatusBadge>
        )
      },
    },
  ]
}
