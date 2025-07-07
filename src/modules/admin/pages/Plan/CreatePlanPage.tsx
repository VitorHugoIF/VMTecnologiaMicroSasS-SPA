import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/Card'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Textarea } from '@/components/Textarea'
import { useCreatePlanPage } from './hooks/useCreatePlanPage'
import { useTranslation } from 'react-i18next'
import { ADMIN_ROUTES } from '@/routes/routeRoles'
import { ErrorAlert } from '@/modules/components/ErrorAlert'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function CreatePlanPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { form, isLoading, onSubmit, error } = useCreatePlanPage()

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('plans.add.title')}>
        <form onSubmit={onSubmit} className="space-y-4">
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
                {...form.register('name')}
                label={t('plans.add.form.name')}
                placeholder={t('plans.add.form.namePlaceholder')}
                required
                error={form.formState.errors.name?.message}
              />
            </div>

            <div className="space-y-2">
              <Input
                id="price"
                type="number"
                step="0.01"
                {...form.register('price')}
                label={t('plans.add.form.price')}
                placeholder={t('plans.add.form.pricePlaceholder')}
                required
                error={form.formState.errors.price?.message}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Textarea
                id="description"
                {...form.register('description')}
                label={t('plans.add.form.description')}
                placeholder={t('plans.add.form.descriptionPlaceholder')}
                required
                error={form.formState.errors.description?.message}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button type="submit" loading={isLoading}>
              {t('plans.add.form.submit')}
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
