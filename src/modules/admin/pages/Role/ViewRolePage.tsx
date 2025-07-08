import { useTranslation } from 'react-i18next'
import { Button, ConfirmDialog, Separator } from '@/components'
import { useViewRolePage } from './hooks/useViewRolePage'
import { ErrorAlert } from '../../../components'
import { StatusBadge } from '@/components/StatusBadge'
import { Edit, ArrowLeft, Trash2, Check } from 'lucide-react'
import { ViewRoleSkeleton } from './components/ViewRoleSkeleton'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'
import { Card } from '@/components/Card'

export function ViewRolePage() {
  const { t } = useTranslation()
  const { isLoading, role, isDeleting, handleEdit, handleBack, handleToggleActive, error } =
    useViewRolePage()

  if (error) {
    const errorMessage =
      error instanceof ApiError ? formatErrors(error.response.errors) : error.message

    return (
      <Card title={t('roles.view.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
        <ErrorAlert title={t('common.error')} description={errorMessage} />
      </Card>
    )
  }

  if (isLoading) {
    return <ViewRoleSkeleton />
  }

  if (!role) {
    return (
      <Card title={t('roles.view.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
        <ErrorAlert
          title={t('roles.view.notFound')}
          description={t('roles.view.notFoundDescription')}
        />
      </Card>
    )
  }

  return (
    <Card title={t('roles.view.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium">{t('roles.view.form.code')}</h3>
          <p className="text-sm text-gray-500">{role.code || '-'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('roles.view.form.name')}</h3>
          <p className="text-sm text-gray-500">{role.name || '-'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('roles.view.form.status')}</h3>
          <div className="mt-1">
            {role.active ? (
              <StatusBadge status="success">{t('roles.list.table.column_active_true')}</StatusBadge>
            ) : (
              <StatusBadge status="canceled">
                {t('roles.list.table.column_active_false')}
              </StatusBadge>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('roles.view.form.description')}</h3>
          <p className="text-sm text-gray-500">
            {role.description || t('roles.view.form.noDescription')}
          </p>
        </div>
      </div>
      <Separator className="mt-6" />
      <div className="flex gap-3 pt-8">
        <Button variant="ghost" onClick={handleBack} icon={<ArrowLeft className="w-4 h-4" />}>
          {t('common.back')}
        </Button>
        <Button variant="ghost" onClick={handleEdit} icon={<Edit className="w-4 h-4" />}>
          {t('common.edit')}
        </Button>
        {role.active ? (
          <ConfirmDialog
            trigger={
              <Button
                className="ml-auto"
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
                className="ml-auto"
                variant="default"
                loading={isDeleting}
                icon={<Check className="w-4 h-4" />}
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
    </Card>
  )
}
