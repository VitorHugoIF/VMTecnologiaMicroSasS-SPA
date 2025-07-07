import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Input, Button, Select } from '@/components'
import { ErrorAlert } from '../../../components'
import { useCreateTenantPage } from './hooks/useCreateTenantPage'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'
import { Controller } from 'react-hook-form'

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
              <Input
                id="name"
                {...register('name')}
                label={t('tenants.add.form.name')}
                placeholder={t('tenants.add.form.namePlaceholder')}
                disabled={isLoading}
                required
                error={errors.name?.message}
              />
            </div>
            <div className="space-y-2">
              <Input
                id="slug"
                {...register('slug')}
                label={t('tenants.add.form.slug')}
                placeholder={t('tenants.add.form.slugPlaceholder')}
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
                label={t('tenants.add.form.email')}
                placeholder={t('tenants.add.form.emailPlaceholder')}
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
                    label={t('tenants.add.form.plan')}
                    options={planOptions}
                    value={field.value || ''}
                    onValueChange={field.onChange}
                    placeholder={t('tenants.add.form.planPlaceholder')}
                    loading={isLoadingPlans}
                    disabled={isLoading}
                    required
                    error={errors.planId?.message}
                  />
                )}
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
