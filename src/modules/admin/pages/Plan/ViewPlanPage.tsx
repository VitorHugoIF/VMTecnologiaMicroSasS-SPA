import { useParams, useNavigate } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { useViewPlanPage } from './hooks/useViewPlanPage.tsx'
import { useTranslation } from 'react-i18next'
import { ADMIN_ROUTES } from '@/routes/routeRoles'
import { ViewPlanSkeleton } from './components/ViewPlanSkeleton'
import { ErrorAlert } from '@/modules/components/ErrorAlert'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'
import { Edit, ArrowLeft, Trash2, Check } from 'lucide-react'
import { Button, Card, Separator } from '@/components'

export function ViewPlanPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { plan, isLoading, isEnabling, isDisabling, handleEnable, handleDisable, error } = useViewPlanPage(
    id!,
  )

  if (error) {
    const errorMessage = error instanceof ApiError 
      ? formatErrors(error.response.errors)
      : error.message
      
    return (
      <Card title={t('plans.view.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
        <ErrorAlert title={t('common.error')} description={errorMessage} />
      </Card>
    )
  }

  if (isLoading) {
    return <ViewPlanSkeleton />
  }

  if (!plan) {
    return (
      <Card title={t('plans.view.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
        <ErrorAlert
          title={t('plans.view.notFound')}
          description={t('plans.view.notFoundDescription')}
        />
      </Card>
    )
  }

  return (
    <Card title={t('plans.view.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium">{t('plans.view.form.name')}</h3>
          <p className="text-sm text-gray-500">{plan.name}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('plans.view.form.price')}</h3>
          <p className="text-sm text-gray-500">{plan.price ? `R$ ${plan.price.toFixed(2)}` : '-'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('plans.view.form.status')}</h3>
          <div className="mt-1">
            {plan.active ? (
              <Badge variant="default">{t('common.active')}</Badge>
            ) : (
              <Badge variant="default">{t('common.inactive')}</Badge>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('plans.view.form.description')}</h3>
          <p className="text-sm text-gray-500">{plan.description || t('plans.view.form.noDescription')}</p>
        </div>
      </div>
      <Separator className='mt-6'/>
      <div className="flex gap-3 pt-8">
        <Button variant="ghost" className='hover:bg-primary' onClick={() => navigate(ADMIN_ROUTES.plans.list)} icon={<ArrowLeft className="w-4 h-4" />}>
          {t('plans.view.back')}
        </Button>
        <Button variant="ghost" className='hover:bg-primary' onClick={() => navigate(ADMIN_ROUTES.plans.edit(plan.id!))} icon={<Edit className="w-4 h-4" />}>
          {t('plans.view.edit')}
        </Button>
        {plan.active ? (
          <Button
            className="ml-auto"
            variant="destructive"
            onClick={() => handleDisable(plan.id!)}
            loading={isDisabling}
            icon={<Trash2 className="w-4 h-4" />}
          >
            {t('plans.view.disable')}
          </Button>
        ) : (
          <Button className="ml-auto" variant="default" onClick={() => handleEnable(plan.id!)} loading={isEnabling} icon={<Check className="w-4 h-4" />}>
            {t('plans.view.enable')}
          </Button>
        )}
      </div>
    </Card>
  )
}
