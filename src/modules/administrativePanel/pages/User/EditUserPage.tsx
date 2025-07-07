import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Input, Button } from '@/components'
import { ErrorAlert } from '../../../components'
import { useEditUserPage } from './hooks/useEditUserPage'
import { EditUserSkeleton } from './components/EditUserSkeleton'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function EditUserPage() {
  const { t } = useTranslation()
  const { form, onSubmit, handleCancel, isLoading, isDataLoading, error } = useEditUserPage()

  const {
    register,
    handleSubmit,
  } = form

  if (isDataLoading) {
    return <EditUserSkeleton />
  }

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('users.edit.title')} description={t('users.edit.description')}>
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
                type="text"
                placeholder={t('users.edit.form.namePlaceholder')}
                disabled={isLoading}
                {...register('name')}
                label={t('users.edit.form.name')}
                required
                error={form.formState?.errors?.name?.message}
              />
            </div>

            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder={t('users.edit.form.passwordPlaceholder')}
                disabled={isLoading}
                {...register('password')}
                label={t('users.edit.form.password')}
                required
                error={form.formState?.errors?.password?.message}
              />
            </div>
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
      </Card>
    </div>
  )
} 