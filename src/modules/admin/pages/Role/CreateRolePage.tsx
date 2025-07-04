import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Input, Label, Button } from '@/components'
import { useCreateRolePage } from './hooks/useCreateRolePage'
import { ErrorAlert } from '../../../components'

export function CreateRolePage() {
  const { t } = useTranslation()
  const { form, onSubmit, handleCancel, isLoading } = useCreateRolePage()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('roles.add.title')} description={t('roles.add.description')}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {errors.name && (
            <ErrorAlert title={t('common.error')} description={errors.name?.message} />
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                {t('roles.add.form.name')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={t('roles.add.form.namePlaceholder')}
                disabled={isLoading}
                {...register('name')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                {t('roles.add.form.description')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="description"
                type="text"
                placeholder={t('roles.add.form.descriptionPlaceholder')}
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
