import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Input, Label, Button } from '@/components'
import { ErrorAlert } from '../../../components'
import { useEditTenantPage } from './hooks/useEditTenantPage'

export function EditTenantPage() {
  const { t } = useTranslation()
  const { tenant, formData, handleInputChange, handleSubmit, isLoading, error } =
    useEditTenantPage()

  if (error) {
    return (
      <div className="flex flex-col gap-3">
        <ErrorAlert title={t('tenants.edit.errorLoading')} description={error.message} />
      </div>
    )
  }

  if (isLoading && !tenant) {
    return (
      <div className="flex flex-col gap-3">
        <Card title={t('tenants.edit.title')} description={t('tenants.edit.description')}>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('tenants.edit.title')} description={t('tenants.edit.description')}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('tenants.edit.form.name')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={t('tenants.edit.form.namePlaceholder')}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">{t('tenants.edit.form.slug')}</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder={t('tenants.edit.form.slugPlaceholder')}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('tenants.edit.form.email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={t('tenants.edit.form.emailPlaceholder')}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="planId">{t('tenants.edit.form.plan')}</Label>
              <Input
                id="planId"
                value={formData.planId}
                onChange={(e) => handleInputChange('planId', e.target.value)}
                placeholder={t('tenants.edit.form.planPlaceholder')}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">{t('tenants.edit.form.status')}</Label>
              <Input
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                placeholder={t('tenants.edit.form.statusPlaceholder')}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" loading={isLoading}>
              {t('tenants.edit.form.submit')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              disabled={isLoading}
            >
              {t('common.cancel')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
