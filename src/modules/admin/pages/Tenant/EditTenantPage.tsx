import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Input, Button, Select } from '@/components'
import { ErrorAlert } from '../../../components'
import { useEditTenantPage } from './hooks/useEditTenantPage'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'
import { EditTenantSkeleton } from './components/EditTenantSkeleton'
import { TenantStatusLabels } from '../../types/tenant/tenantStatus'
import { Controller } from 'react-hook-form'

export function EditTenantPage() {
  const { t } = useTranslation()
  const { tenant, form, onSubmit, handleCancel, isLoading, isLoadingPlans, planOptions, error } = useEditTenantPage()

  const optionsStatus = Object.entries(TenantStatusLabels).map(([value, label]) => ({ value, label: t(`tenants.status.${label}`) }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  if (isLoading && !tenant) {
    return <EditTenantSkeleton />
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
              <Input
                id="name"
                {...register('name')}
                label={t('tenants.edit.form.name')}
                placeholder={t('tenants.edit.form.namePlaceholder')}
                disabled={isLoading}
                required
                error={errors.name?.message}
              />
            </div>
            <div className="space-y-2">
              <Input
                id="slug"
                {...register('slug')}
                label={t('tenants.edit.form.slug')}
                placeholder={t('tenants.edit.form.slugPlaceholder')}
                disabled={isLoading}
                required
                error={errors.slug?.message}
              />
            </div>
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                {...register('email')}
                label={t('tenants.edit.form.email')}
                placeholder={t('tenants.edit.form.emailPlaceholder')}
                disabled={isLoading}
                required
                error={errors.email?.message}
              />
            </div>
            <div className="space-y-2">
              <Controller
                control={form.control}
                name="planId"
                render={({ field }) => (
                  <Select
                    {...field}
                    id="planId"
                    label={t('tenants.edit.form.plan')}
                    options={planOptions}
                    value={field.value || ''}
                    onValueChange={field.onChange}
                    placeholder={t('tenants.edit.form.planPlaceholder')}
                    loading={isLoadingPlans}
                    disabled={isLoading}
                    required
                    error={errors.planId?.message || ''}
                  />
                )}
              />
            </div>
            <div className="space-y-2">
              <Controller
                control={form.control}
                name="status"
                render={({ field }) => (
                  <Select
                    {...field}
                    id="status"
                    label={t('tenants.edit.form.status')}
                    options={optionsStatus}
                    value={field.value || ''}
                    onValueChange={field.onChange}
                    placeholder={t('tenants.edit.form.statusPlaceholder')}
                    disabled={isLoading}
                    required
                    error={errors.status?.message || ''}
                  />
                )}
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
