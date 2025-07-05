import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/Card'
import { Button } from '@/components'
import { useViewTenantPage } from './hooks/useViewTenantPage'
import { ViewTenantSkeleton } from './components/ViewTenantSkeleton'

export function ViewTenantPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { tenant, isLoading, error, handleEnable, handleDisable, isEnabling, isDisabling } =
    useViewTenantPage()

  if (isLoading) {
    return <ViewTenantSkeleton />
  }

  if (error || !tenant) {
    return (
      <div className="flex flex-col gap-3">
        <Card title={t('tenants.view.notFound')}>
          <p>{t('tenants.view.notFoundDescription')}</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('tenants.view.title')} description={t('tenants.view.description')}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">{t('tenants.view.form.name')}</h3>
            <p className="text-lg">{tenant.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">{t('tenants.view.form.slug')}</h3>
            <p className="text-lg">{tenant.slug}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">{t('tenants.view.form.email')}</h3>
            <p className="text-lg">{tenant.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">{t('tenants.view.form.status')}</h3>
            <p className="text-lg">{tenant.status}</p>
          </div>
        </div>
        
        {tenant.plan && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium mb-3">{t('tenants.view.planInfo.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">{t('tenants.view.planInfo.name')}</h4>
                <p className="text-lg">{tenant.plan.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">{t('tenants.view.planInfo.description')}</h4>
                <p className="text-lg">{tenant.plan.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">{t('tenants.view.planInfo.price')}</h4>
                <p className="text-lg">R$ {tenant.plan.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={() => window.history.back()}>
            {t('tenants.view.back')}
          </Button>
          <Button variant="outline" onClick={() => navigate(`/app/admin/tenant/edit/${tenant.id}`)}>
            {t('tenants.view.edit')}
          </Button>
          {tenant.status === 'active' ? (
            <Button variant="destructive" onClick={handleDisable} loading={isDisabling}>
              {t('tenants.view.disable')}
            </Button>
          ) : (
            <Button onClick={handleEnable} loading={isEnabling}>
              {t('tenants.view.enable')}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
