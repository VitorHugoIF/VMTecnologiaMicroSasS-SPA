import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Check, X } from 'lucide-react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/Input'
import { Textarea } from '@/components/Textarea'
import { useCreatePlanPage } from './hooks/useCreatePlanPage'
import { useTranslation } from 'react-i18next'
import { ADMIN_ROUTES } from '@/routes/routeRoles'
import { ErrorAlert } from '@/modules/components/ErrorAlert'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'
import { Card } from '@/components/Card'

export function CreatePlanPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { form, isLoading, onSubmit, error } = useCreatePlanPage()

  return (
    <Card title={t('plans.add.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
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
                  <FormLabel>{t('plans.add.form.name')}</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder={t('plans.add.form.namePlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('plans.add.form.price')}</FormLabel>
                  <FormControl>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder={t('plans.add.form.pricePlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>{t('plans.add.form.description')}</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder={t('plans.add.form.descriptionPlaceholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" loading={isLoading} icon={<Check className="w-4 h-4" />}>
              {t('common.save')}
            </Button>
            <Button
              type="button"
              variant="cancel"
              onClick={() => navigate(ADMIN_ROUTES.plans.list)}
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
