import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Input, Label, Button, Select } from '@/components'
import { ErrorAlert } from '../../../components'
import { useEditTenantPage } from './hooks/useEditTenantPage'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function EditTenantPage() {
  const { t } = useTranslation()
  const { tenant, form, onSubmit, handleCancel, isLoading, isLoadingPlans, planOptions, error } = useEditTenantPage()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  if (isLoading && !tenant) {
    return (
      <div className="flex flex-col gap-3">
        <Card title={t('tenants.edit.title')} description={t('tenants.edit.description')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <ErrorAlert 
              title={t('tenants.edit.errorLoading')} 
              description={error instanceof ApiError ? formatErrors(error.response.errors) : error.message} 
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {t('tenants.edit.form.name')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="name"
                {...register('name')}
                placeholder={t('tenants.edit.form.namePlaceholder')}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">
                {t('tenants.edit.form.slug')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="slug"
                {...register('slug')}
                placeholder={t('tenants.edit.form.slugPlaceholder')}
                disabled={isLoading}
              />
              {errors.slug && (
                <p className="text-sm text-red-600">{errors.slug.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">
                {t('tenants.edit.form.email')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder={t('tenants.edit.form.emailPlaceholder')}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="planId">
                {t('tenants.edit.form.plan')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Select
                id="planId"
                options={planOptions}
                value={form.watch('planId') || ''}
                onValueChange={(value) => {
                  form.setValue('planId', value)
                }}
                placeholder={t('tenants.edit.form.planPlaceholder')}
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
                    {t('tenants.edit.form.selectedPlan')}: {planOptions.find(opt => opt.value === form.watch('planId'))?.label}
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">
                {t('tenants.edit.form.status')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="status"
                {...register('status')}
                placeholder={t('tenants.edit.form.statusPlaceholder')}
                disabled={isLoading}
              />
              {errors.status && (
                <p className="text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" loading={isLoading}>
              {t('tenants.edit.form.submit')}
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
