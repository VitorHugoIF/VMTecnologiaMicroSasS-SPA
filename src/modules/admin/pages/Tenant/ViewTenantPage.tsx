import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button, Separator } from '@/components'
import { useViewTenantPage } from './hooks'
import { ViewTenantSkeleton } from './components/ViewTenantSkeleton'
import { Edit, ArrowLeft, Trash2, Check } from 'lucide-react'
import { Card } from '@/components'
import { TenantStatusLabels } from '../../types/tenant/tenantStatus'

export function ViewTenantPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { tenant, isLoading, error, handleEnable, handleDisable, isEnabling, isDisabling, isDeleting } =
    useViewTenantPage()

  if (isLoading) {
    return <ViewTenantSkeleton />
  }

  if (error || !tenant) {
    return (
      <Card title={t('tenants.view.title')} className="p-6">
        <div>
          <p>{t('tenants.view.notFoundDescription')}</p>
        </div>
      </Card>
    )
  }

  return (
    <Card title={t('tenants.view.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium">{t('tenants.view.form.name')}</h3>
          <p className="text-sm text-gray-500">{tenant.name}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('tenants.view.form.slug')}</h3>
          <p className="text-sm text-gray-500">{tenant.slug}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('tenants.view.form.email')}</h3>
          <p className="text-sm text-gray-500">{tenant.email}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('tenants.view.form.status')}</h3>
          <p className="text-sm text-gray-500">{t(`tenants.status.${TenantStatusLabels[tenant.status]}`)}</p>
        </div>
      </div>
      {tenant.plan && (
        <div className="mt-6">
          <Separator />
          <div className="pt-4">
            <h3 className="text-md font-semibold mb-3">{t('tenants.view.planInfo.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium">{t('tenants.view.planInfo.name')}</h4>
                <p className="text-sm text-gray-500">{tenant.plan.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">{t('tenants.view.planInfo.description')}</h4>
                <p className="text-sm text-gray-500">{tenant.plan.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">{t('tenants.view.planInfo.price')}</h4>
                <p className="text-sm text-gray-500">R$ {tenant.plan.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Separator className="mt-6" />
      <div className="flex gap-3 pt-8">
        <Button
          variant="ghost"
          onClick={() => window.history.back()}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          {t('tenants.view.back')}
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate(`/app/admin/tenant/edit/${tenant.id}`)}
          icon={<Edit className="w-4 h-4" />}
        >
          {t('tenants.view.edit')}
        </Button>
        {TenantStatusLabels[tenant.status] === 'active' ? (
          <Button
            className="ml-auto"
            variant="destructive"
            onClick={handleDisable}
            loading={isDisabling || isDeleting}
            icon={<Trash2 className="w-4 h-4" />}
          >
            {t('tenants.view.disable')}
          </Button>
        ) : (
          <Button
            className="ml-auto"
            onClick={handleEnable}
            loading={isEnabling || isDeleting}
            icon={<Check className="w-4 h-4" />}
          >
            {t('tenants.view.enable')}
          </Button>
        )}
      </div>
    </Card>
  )
}
