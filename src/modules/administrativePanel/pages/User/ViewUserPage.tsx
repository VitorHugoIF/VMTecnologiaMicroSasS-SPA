import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { Button, ConfirmDialog } from '@/components'
import { useViewUserPage } from './hooks/useViewUserPage'
import { ErrorAlert } from '../../../components'
import { Badge } from '@/components/ui/badge'
import { Edit, ArrowLeft, Trash2 } from 'lucide-react'
import { ViewUserSkeleton } from './components/ViewUserSkeleton'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function ViewUserPage() {
  const { t } = useTranslation()
  const { isLoading, user, isDeleting, handleEdit, handleBack, handleToggleActive, error } =
    useViewUserPage()

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
    return <ViewUserSkeleton />
  }

  if (!user) {
    return (
      <div className="flex flex-col gap-3">
        <ErrorAlert
          title={t('users.view.notFound')}
          description={t('users.view.notFoundDescription')}
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Card
        title={t('users.view.title')}
        description={t('users.view.description')}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleBack} icon={<ArrowLeft className="w-4 h-4" />}>
              {t('common.back')}
            </Button>
            <Button onClick={handleEdit} icon={<Edit className="w-4 h-4" />}>
              {t('common.edit')}
            </Button>
            {user.active ? (
              <ConfirmDialog
                trigger={
                  <Button
                    variant="destructive"
                    loading={isDeleting}
                    icon={<Trash2 className="w-4 h-4" />}
                  >
                    {t('users.view.disable')}
                  </Button>
                }
                title={t('users.delete.title')}
                description={t('users.delete.description')}
                confirmText={t('users.view.disable')}
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
                    {t('users.view.enable')}
                  </Button>
                }
                title={t('common.enable')}
                description={t('common.enable')}
                confirmText={t('users.view.enable')}
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
              <h3 className="text-sm font-medium text-gray-500">{t('users.view.form.name')}</h3>
              <p className="text-lg">{user.name || '-'}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">{t('users.view.form.status')}</h3>
              <div className="mt-1">
                {user.active ? (
                  <Badge variant="default">{t('users.list.table.column_active_true')}</Badge>
                ) : (
                  <Badge variant="secondary">{t('users.list.table.column_active_false')}</Badge>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">{t('users.view.form.roles')}</h3>
              <div className="mt-1">
                {user.roles && user.roles.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                                    {user.roles.map((role: { name?: string }, index: number) => (
                  <Badge key={index} variant="outline">
                    {role.name}
                  </Badge>
                ))}
                  </div>
                ) : (
                  <p className="text-lg">{t('users.view.form.noRoles')}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">{t('users.view.form.createdAt')}</h3>
              <p className="text-lg">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : '-'}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 