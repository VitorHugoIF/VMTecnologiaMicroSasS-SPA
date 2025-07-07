import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Input, Button } from '@/components'
import { useCreateRolePage } from './hooks/useCreateRolePage'
import { ErrorAlert } from '../../../components'
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

export function CreateRolePage() {
  const { t } = useTranslation()
  const { form, onSubmit, handleCancel, isLoading, error } = useCreateRolePage()

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('roles.add.title')} description={t('roles.add.description')}>
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
                    <FormLabel>{t('roles.add.form.name')}</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder={t('roles.add.form.namePlaceholder')}
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
                    <FormLabel>{t('roles.add.form.description')}</FormLabel>
                    <FormControl>
                      <Input
                        id="description"
                        type="text"
                        placeholder={t('roles.add.form.descriptionPlaceholder')}
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
              <Button type="submit" loading={isLoading}>
                {t('common.save')}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>
                {t('common.cancel')}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}
