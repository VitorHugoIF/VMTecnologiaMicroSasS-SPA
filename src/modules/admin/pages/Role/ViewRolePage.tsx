import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Button, ConfirmDialog } from '@/components'
import { useViewRolePage } from './hooks/useViewRolePage'
import { ErrorAlert } from '../../../components'
import { Badge } from '@/components/ui/badge'
import { Edit, ArrowLeft, Trash2 } from 'lucide-react'
import { ViewRoleSkeleton } from './components/ViewRoleSkeleton'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function ViewRolePage() {
  const { t } = useTranslation()
  const { isLoading, role, isDeleting, handleEdit, handleBack, handleToggleActive, error } =
    useViewRolePage()

  if (error) {
    const errorMessage = error instanceof ApiError 
      ? formatErrors(error.response.errors)
      : error.message
      
    return (
      <div className="flex flex-col gap-3">
        <ErrorAlert title={t('common.error')} description={errorMessage} />
      </div>
    )
  }

  if (isLoading) {
    return <ViewRoleSkeleton />
  }

  if (!role) {
    return (
      <div className="flex flex-col gap-3">
        <ErrorAlert
          title={t('roles.view.notFound')}
          description={t('roles.view.notFoundDescription')}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Card
        title={t('roles.view.title')}
        description={t('roles.view.description')}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleBack} icon={<ArrowLeft className="w-4 h-4" />}>
              {t('common.back')}
            </Button>
            <Button onClick={handleEdit} icon={<Edit className="w-4 h-4" />}>
              {t('common.edit')}
            </Button>
            {role.active ? (
              <ConfirmDialog
                trigger={
                  <Button
                    variant="destructive"
                    loading={isDeleting}
                    icon={<Trash2 className="w-4 h-4" />}
                  >
                    {t('roles.view.disable')}
                  </Button>
                }
                title={t('roles.delete.title')}
                description={t('roles.delete.description')}
                confirmText={t('roles.view.disable')}
                cancelText={t('common.cancel')}
                onConfirm={() => handleToggleActive(false)}
                variant="destructive"
              />
            ) : (
              <ConfirmDialog
                trigger={
                  <Button
                    variant="default"
                    loading={isDeleting}
                    icon={<Edit className="w-4 h-4" />}
                  >
                    {t('roles.view.enable')}
                  </Button>
                }
                title={t('common.enable')}
                description={t('common.enable')}
                confirmText={t('roles.view.enable')}
                cancelText={t('common.cancel')}
                onConfirm={() => handleToggleActive(true)}
                variant="default"
              />
            )}
          </div>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">{t('roles.view.form.code')}</h3>
              <p className="text-lg">{role.code || '-'}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">{t('roles.view.form.name')}</h3>
              <p className="text-lg">{role.name || '-'}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">{t('roles.view.form.status')}</h3>
              <div className="mt-1">
                {role.active ? (
                  <Badge variant="default">{t('roles.list.table.column_active_true')}</Badge>
                ) : (
                  <Badge variant="secondary">{t('roles.list.table.column_active_false')}</Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">
              {t('roles.view.form.description')}
            </h3>
            <p className="text-lg">{role.description || t('roles.view.form.noDescription')}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
