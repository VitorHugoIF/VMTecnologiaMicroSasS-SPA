import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Input, Label, Button } from '@/components'
import { ErrorAlert } from '../../../components'
import { useCreateTenantPage } from './hooks/useCreateTenantPage'

export function CreateTenantPage() {
  const { t } = useTranslation()
  const { formData, handleInputChange, handleSubmit, isLoading, error } = useCreateTenantPage()

  if (error) {
    return (
      <div className="flex flex-col gap-3">
        <ErrorAlert title={t('common.error')} description={error.message} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('tenants.add.title')} description={t('tenants.add.description')}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('tenants.add.form.name')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={t('tenants.add.form.namePlaceholder')}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">{t('tenants.add.form.slug')}</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder={t('tenants.add.form.slugPlaceholder')}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('tenants.add.form.email')}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={t('tenants.add.form.emailPlaceholder')}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="planId">{t('tenants.add.form.plan')}</Label>
              <Input
                id="planId"
                value={formData.planId}
                onChange={(e) => handleInputChange('planId', e.target.value)}
                placeholder={t('tenants.add.form.planPlaceholder')}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">{t('tenants.add.form.status')}</Label>
              <Input
                id="status"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                placeholder={t('tenants.add.form.statusPlaceholder')}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" loading={isLoading}>
              {t('tenants.add.form.submit')}
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
