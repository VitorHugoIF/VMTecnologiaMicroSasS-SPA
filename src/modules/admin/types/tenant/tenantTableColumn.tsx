import { useTranslation } from 'react-i18next'
import type { TableColumn } from '@/components/Table'
import type { Tenant } from './tenant'
import { StatusBadge } from '@/components/StatusBadge'
import { TenantStatusLabels } from './tenantStatus'

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
        const statusKey = TenantStatusLabels[tenant.status]
        
        switch (statusKey) {
          case 'active':
            badgeStatus = 'success'
            break
          case 'inactive':
            badgeStatus = 'canceled'
            break
          case 'expired':
            badgeStatus = 'canceled'
            break
          default:
            badgeStatus = 'default'
        }
        
        return (
          <StatusBadge status={badgeStatus}>{t(`tenants.status.${statusKey}`)}</StatusBadge>
        )
      },
    },
  ]
}
