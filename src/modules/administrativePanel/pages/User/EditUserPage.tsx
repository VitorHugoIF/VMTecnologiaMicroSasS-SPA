import { useTranslation } from 'react-i18next'
import { Input, Button, MultiSelect } from '@/components'
import { ErrorAlert } from '../../../components'
import { useEditUserPage } from './hooks/useEditUserPage'
import { EditUserSkeleton } from './components/EditUserSkeleton'
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
import { Card } from '@/components/Card'

export function EditUserPage() {
  const { t } = useTranslation()
  const { form, onSubmit, handleCancel, isLoading, isDataLoading, error, roleOptions } = useEditUserPage()

  if (isDataLoading) {
    return <EditUserSkeleton />
  }

  return (
    <Card title={t('users.edit.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
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
                  <FormLabel>{t('users.edit.form.name')}</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t('users.edit.form.namePlaceholder')}
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('users.edit.form.password')}</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder={t('users.edit.form.passwordPlaceholder')}
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
              name="roles"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>{t('users.edit.form.roles')}</FormLabel>
                  <FormControl>
                    <MultiSelect
                      id="roles"
                      options={roleOptions}
                      value={field.value || []}
                      onValueChange={field.onChange}
                      placeholder={t('users.edit.form.rolesPlaceholder')}
                      disabled={isLoading}
                      error={fieldState.error?.message}
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
            <Button type="button" variant="cancel" onClick={handleCancel} disabled={isLoading} icon={<X className="w-4 h-4" />}>
              {t('common.cancel')}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
} 