import { useParams, useNavigate } from "react-router-dom"
import { Card } from "@/components/Card"
import { Button } from "@/components/Button"
import { Badge } from "@/components/ui/badge"
import { useViewPlanPage } from './hooks/useViewPlanPage.tsx'
import { useTranslation } from 'react-i18next'
import { ADMIN_ROUTES } from '@/routes/routeRoles'
import { ViewPlanSkeleton } from './components/ViewPlanSkeleton'
import { ErrorAlert } from '@/modules/components/ErrorAlert'

export function ViewPlanPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    plan,
    isLoading,
    isEnabling,
    isDisabling,
    handleEnable,
    handleDisable,
  } = useViewPlanPage(id!)

  if (isLoading) {
    return <ViewPlanSkeleton />
  }

  if (!plan) {
    return (
      <div className="flex flex-col gap-3">
        <ErrorAlert
          title={t('plans.view.notFound')}
          description={t('plans.view.notFoundDescription')}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Card title={t('plans.view.title')}>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">{t('plans.view.form.name')}</h3>
            <p className="text-lg">{plan.name}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">{t('plans.view.form.description')}</h3>
            <p className="text-lg">{plan.description || t('plans.view.form.noDescription')}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">{t('plans.view.form.price')}</h3>
            <p className="text-lg">{plan.price ? `R$ ${plan.price.toFixed(2)}` : '-'}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">{t('plans.view.form.status')}</h3>
            <div className="mt-1">
              {plan.active ? (
                <Badge variant="default">{t('common.active')}</Badge>
              ) : (
                <Badge variant="secondary">{t('common.inactive')}</Badge>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              onClick={() => navigate(ADMIN_ROUTES.plans.edit(plan.id!))}
            >
              {t('plans.view.edit')}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(ADMIN_ROUTES.plans.list)}
            >
              {t('plans.view.back')}
            </Button>
            {plan.active ? (
              <Button
                variant="destructive"
                onClick={() => handleDisable(plan.id!)}
                loading={isDisabling}
              >
                {t('plans.view.disable')}
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={() => handleEnable(plan.id!)}
                loading={isEnabling}
              >
                {t('plans.view.enable')}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
} 