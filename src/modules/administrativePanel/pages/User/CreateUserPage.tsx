import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Input, Label, Button, Select } from '@/components'
import { useCreateUserPage } from './hooks/useCreateUserPage'
import { ErrorAlert } from '../../../components'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function CreateUserPage() {
  const { t } = useTranslation()
  const { form, onSubmit, handleCancel, isLoading, isLoadingRoles, roleOptions, error } = useCreateUserPage()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('users.add.title')} description={t('users.add.description')}>
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
                {t('users.add.form.name')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={t('users.add.form.namePlaceholder')}
                disabled={isLoading}
                {...register('name')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                {t('users.add.form.password')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder={t('users.add.form.passwordPlaceholder')}
                disabled={isLoading}
                {...register('password')}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="roles">
                {t('users.add.form.roles')} <span style={{ color: 'red' }}>*</span>
              </Label>
              <Select
                id="roles"
                options={roleOptions}
                value={form.watch('roles')?.[0] || ''}
                onValueChange={(value) => {
                  form.setValue('roles', [value])
                }}
                placeholder={t('users.add.form.rolesPlaceholder')}
                loading={isLoadingRoles}
                disabled={isLoading}
                required
              />
              {form.watch('roles')?.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('users.add.form.selectedRole')}: {roleOptions.find(opt => opt.value === form.watch('roles')?.[0])?.label}
                  </p>
                </div>
              )}
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