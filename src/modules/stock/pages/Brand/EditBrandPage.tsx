import { useTranslation } from 'react-i18next'
import { Input, Button, Textarea } from '@/components'
import { ErrorAlert } from '@/modules/components/ErrorAlert'
import { useEditBrandPage } from './hooks/useEditBrandPage'
import { EditBrandSkeleton } from './components/EditBrandSkeleton'
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
import { X, Check } from 'lucide-react'
import { Card } from '@/components'

export function EditBrandPage() {
  const { t } = useTranslation()
  const { form, onSubmit, handleCancel, isLoading, isDataLoading, error } = useEditBrandPage()

  if (isDataLoading) {
    return <EditBrandSkeleton />
  }

  return (
    <Card title={t('brands.edit.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
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
                  <FormLabel>{t('brands.list.table.column_name')}</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t('brands.list.table.column_name')}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('brands.list.table.column_description')}</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder={t('brands.list.table.column_description')}
                      disabled={isLoading}
                      {...field}
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