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
        let statusLabel: string = 'unknown';

        if (tenant.status in TenantStatusLabels) {
          statusLabel = TenantStatusLabels[tenant.status as keyof typeof TenantStatusLabels];
        } else if (Object.values(TenantStatusLabels).includes(tenant.status as any)) {
          statusLabel = tenant.status as string;
        }

        let badgeStatus: 'success' | 'canceled' | 'default' = 'default';
        if (statusLabel === 'active') badgeStatus = 'success';
        else if (statusLabel === 'inactive') badgeStatus = 'canceled';
        return <StatusBadge status={badgeStatus}>{t(`tenants.status.${statusLabel}`)}</StatusBadge>;
      },
    },
  ]
}
