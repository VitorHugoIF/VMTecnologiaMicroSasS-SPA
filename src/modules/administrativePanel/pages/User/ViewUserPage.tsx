import { useTranslation } from 'react-i18next'
import { Button, Card, Separator } from '@/components'
import { useViewUserPage } from './hooks/useViewUserPage'
import { ErrorAlert } from '../../../components'
import { Badge } from '@/components/ui/badge'
import { Edit, ArrowLeft, Trash2, Check } from 'lucide-react'
import { ViewUserSkeleton } from './components/ViewUserSkeleton'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function ViewUserPage() {
  const { t } = useTranslation()
  const { isLoading, user, isDeleting, handleEdit, handleBack, handleToggleActive, error } =
    useViewUserPage()

  if (error) {
    const errorMessage =
      error instanceof ApiError ? formatErrors(error.response.errors) : error.message

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
    <Card title={t('users.view.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium">{t('users.view.form.name')}</h3>
          <p className="text-sm text-gray-500">{user.name || '-'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('users.view.form.status')}</h3>
          <div className="mt-1">
            {user.active ? (
              <Badge variant="default">{t('users.list.table.column_active_true')}</Badge>
            ) : (
              <Badge variant="default">{t('users.list.table.column_active_false')}</Badge>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('users.view.form.roles')}</h3>
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
              <p className="text-sm text-gray-500">{t('users.view.form.noRoles')}</p>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('users.view.form.createdAt')}</h3>
          <p className="text-sm text-gray-500">
            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : '-'}
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
        {user.active ? (
          <Button
            className="ml-auto"
            variant="destructive"
            onClick={() => handleToggleActive(false)}
            loading={isDeleting}
            icon={<Trash2 className="w-4 h-4" />}
          >
            {t('users.view.disable')}
          </Button>
        ) : (
          <Button
            className="ml-auto"
            onClick={() => handleToggleActive(true)}
            loading={isDeleting}
            icon={<Check className="w-4 h-4" />}
          >
            {t('users.view.enable')}
          </Button>
        )}
      </div>
    </Card>
  )
}
