import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Input, Label, Button, Select } from '@/components'
import { ErrorAlert } from '../../../components'
import { useCreateTenantPage } from './hooks/useCreateTenantPage'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function CreateTenantPage() {
  const { t } = useTranslation()
  const { form, onSubmit, handleCancel, isLoading, isLoadingPlans, planOptions, error } = useCreateTenantPage()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('tenants.add.title')} description={t('tenants.add.description')}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <ErrorAlert 
              title={t('common.error')} 
              description={error instanceof ApiError ? formatErrors(error.response.errors) : error.message} 
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {t('tenants.add.form.name')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="name"
                {...register('name')}
                placeholder={t('tenants.add.form.namePlaceholder')}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">
                {t('tenants.add.form.slug')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder={t('tenants.add.form.slugPlaceholder')}
                disabled={isLoading}
              />
              {errors.slug && (
                <p className="text-sm text-red-600">{errors.slug.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                {t('tenants.add.form.email')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder={t('tenants.add.form.emailPlaceholder')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="planId">
                {t('tenants.add.form.plan')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Select
                id="planId"
                options={planOptions}
                value={form.watch('planId') || ''}
                onValueChange={(value) => {
                  form.setValue('planId', value)
                }}
                placeholder={t('tenants.add.form.planPlaceholder')}
                loading={isLoadingPlans}
                disabled={isLoading}
                required
              />
              {errors.planId && (
                <p className="text-sm text-red-600">{errors.planId.message}</p>
              )}
              {form.watch('planId') && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('tenants.add.form.selectedPlan')}: {planOptions.find(opt => opt.value === form.watch('planId'))?.label}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" loading={isLoading}>
              {t('tenants.add.form.submit')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
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
