import { useParams, useNavigate } from 'react-router-dom'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Label } from '@/components/Label'
import { Textarea } from '@/components/Textarea'
import { useEditPlanPage } from './hooks/useEditPlanPage'
import { useTranslation } from 'react-i18next'
import { ADMIN_ROUTES } from '@/routes/routeRoles'
import { ErrorAlert } from '@/modules/components/ErrorAlert'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function EditPlanPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { form, isLoading, onSubmit, error } = useEditPlanPage(id!)

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('plans.edit.title')}>
        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <ErrorAlert 
              title={t('common.error')} 
              description={error instanceof ApiError ? formatErrors(error.response.errors) : error.message} 
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('plans.edit.form.name')}</Label>
              <Input
                id="name"
                {...form.register('name')}
                placeholder={t('plans.edit.form.namePlaceholder')}
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">{t('plans.edit.form.price')}</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                {...form.register('price')}
                placeholder={t('plans.edit.form.pricePlaceholder')}
              />
              {form.formState.errors.price && (
                <p className="text-sm text-red-600">{form.formState.errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">{t('plans.edit.form.description')}</Label>
              <Textarea
                id="description"
                {...form.register('description')}
                placeholder={t('plans.edit.form.descriptionPlaceholder')}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-600">{form.formState.errors.description.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" loading={isLoading}>
              {t('plans.edit.form.submit')}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(ADMIN_ROUTES.plans.list)}
            >
              {t('common.cancel')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
