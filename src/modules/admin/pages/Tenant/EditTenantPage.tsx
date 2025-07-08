import { useTranslation } from 'react-i18next'
import { Input, Button, Select } from '@/components'
import { ErrorAlert } from '../../../components'
import { useEditTenantPage } from './hooks/useEditTenantPage'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'
import { EditTenantSkeleton } from './components/EditTenantSkeleton'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { X, Check } from 'lucide-react'
import { Card } from '@/components/Card'

export function EditTenantPage() {
  const { t } = useTranslation()
  const {
    tenant,
    form,
    onSubmit,
    handleCancel,
    isLoading,
    isLoadingPlans,
    planOptions,
    error,
    optionsStatus,
  } = useEditTenantPage()

  if (isLoading && !tenant) {
    return <EditTenantSkeleton />
  }

  return (
    <Card title={t('tenants.edit.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <ErrorAlert
              title={t('tenants.edit.errorLoading')}
              description={
                error instanceof ApiError ? formatErrors(error.response.errors) : error.message
              }
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tenants.edit.form.name')}</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder={t('tenants.edit.form.namePlaceholder')}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tenants.edit.form.slug')}</FormLabel>
                  <FormControl>
                    <Input
                      id="slug"
                      placeholder={t('tenants.edit.form.slugPlaceholder')}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tenants.edit.form.email')}</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('tenants.edit.form.emailPlaceholder')}
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="planId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tenants.edit.form.plan')}</FormLabel>
                  <FormControl>
                    <Select
                      id="planId"
                      options={planOptions}
                      value={field.value || ''}
                      onValueChange={field.onChange}
                      placeholder={t('tenants.edit.form.planPlaceholder')}
                      loading={isLoadingPlans}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tenants.edit.form.status')}</FormLabel>
                  <FormControl>
                    <Select
                      id="status"
                      options={optionsStatus}
                      value={field.value || ''}
                      onValueChange={field.onChange}
                      placeholder={t('tenants.edit.form.statusPlaceholder')}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" loading={isLoading} icon={<Check className="w-4 h-4" />}>
              {t('common.save')}
            </Button>
            <Button
              type="button"
              variant="cancel"
              onClick={handleCancel}
              disabled={isLoading}
              icon={<X className="w-4 h-4" />}
            >
              {t('common.cancel')}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
