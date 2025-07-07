import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Input, Button } from '@/components'
import { useCreateRolePage } from './hooks/useCreateRolePage'
import { ErrorAlert } from '../../../components'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function CreateRolePage() {
  const { t } = useTranslation()
  const { form, onSubmit, handleCancel, isLoading, error } = useCreateRolePage()

  const {
    register,
    handleSubmit,
  } = form

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('roles.add.title')} description={t('roles.add.description')}>
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
                placeholder={t('roles.add.form.namePlaceholder')}
                disabled={isLoading}
                {...register('name')}
                label={t('roles.add.form.name')}
                required
                error={form.formState?.errors?.name?.message}
              />
            </div>

            <div className="space-y-2">
              <Input
                id="description"
                type="text"
                placeholder={t('roles.add.form.descriptionPlaceholder')}
                disabled={isLoading}
                {...register('description')}
                label={t('roles.add.form.description')}
                required
                error={form.formState?.errors?.description?.message}
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
