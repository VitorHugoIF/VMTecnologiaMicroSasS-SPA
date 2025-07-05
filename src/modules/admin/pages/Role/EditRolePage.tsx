import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Input, Label, Button } from '@/components'
import { ErrorAlert } from '../../../components'
import { useEditRolePage } from './hooks/useEditRolePage'
import { EditRoleSkeleton } from './components/EditRoleSkeleton'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function EditRolePage() {
  const { t } = useTranslation()
  const { form, onSubmit, handleCancel, isLoading, isDataLoading, error } = useEditRolePage()

  const {
    register,
    handleSubmit,
  } = form

  if (isDataLoading) {
    return <EditRoleSkeleton />
  }

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('roles.edit.title')} description={t('roles.edit.description')}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <ErrorAlert 
              title={t('common.error')} 
              description={error instanceof ApiError ? formatErrors(error.response.errors) : error.message} 
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {t('roles.edit.form.name')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={t('roles.edit.form.namePlaceholder')}
                disabled={isLoading}
                {...register('name')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                {t('roles.edit.form.description')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="description"
                type="text"
                placeholder={t('roles.edit.form.descriptionPlaceholder')}
                disabled={isLoading}
                {...register('description')}
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
