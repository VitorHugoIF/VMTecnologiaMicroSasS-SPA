import { useNavigate } from 'react-router-dom'
import { Button, Input, Textarea, Card } from '@/components'
import { Check, X } from 'lucide-react'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { useCreateCategoryPage } from './hooks/useCreateCategoryPage'
import { useTranslation } from 'react-i18next'
import { ErrorAlert } from '@/modules/components/ErrorAlert'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function CreateCategoryPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { form, isLoading, onSubmit, error } = useCreateCategoryPage()

  return (
    <Card title={t('categories.list.add')} className="py-6 min-h-0" contentClassName="p-0 px-6">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <ErrorAlert
              title={t('common.error')}
              description={
                error instanceof ApiError ? formatErrors(error.response.errors) : error.message
              }
            />
          )}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('categories.list.table.column_name')}</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder={t('categories.list.table.column_name')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('categories.list.table.column_description')}</FormLabel>
                  <FormControl>
                    <Textarea id="description" placeholder={t('categories.list.table.column_description')} {...field} />
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
              onClick={() => navigate(-1)}
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