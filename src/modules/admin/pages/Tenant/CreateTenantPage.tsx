import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Input, Button, Select } from '@/components'
import { ErrorAlert } from '../../../components'
import { useCreateTenantPage } from './hooks/useCreateTenantPage'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'

export function CreateTenantPage() {
  const { t } = useTranslation()
  const { form, onSubmit, handleCancel, isLoading, isLoadingPlans, planOptions, error } = useCreateTenantPage()

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('tenants.add.title')} description={t('tenants.add.description')}>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <ErrorAlert 
                title={t('common.error')} 
                description={error instanceof ApiError ? formatErrors(error.response.errors) : error.message} 
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('tenants.add.form.name')}</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder={t('tenants.add.form.namePlaceholder')}
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
                    <FormLabel>{t('tenants.add.form.slug')}</FormLabel>
                    <FormControl>
                      <Input
                        id="slug"
                        placeholder={t('tenants.add.form.slugPlaceholder')}
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
                    <FormLabel>{t('tenants.add.form.email')}</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('tenants.add.form.emailPlaceholder')}
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
                    <FormLabel>{t('tenants.add.form.plan')}</FormLabel>
                    <FormControl>
                      <Select
                        id="planId"
                        options={planOptions}
                        value={field.value || ''}
                        onValueChange={field.onChange}
                        placeholder={t('tenants.add.form.planPlaceholder')}
                        loading={isLoadingPlans}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
        </Form>
      </Card>
    </div>
  )
}
