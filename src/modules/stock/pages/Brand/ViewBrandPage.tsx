import { useParams } from 'react-router-dom'
import { useViewBrandPage } from './hooks/useViewBrandPage'
import { Button, ConfirmDialog, Separator } from '@/components'
import { Card } from '@/components'
import { useTranslation } from 'react-i18next'
import { ErrorAlert } from '@/modules/components'
import { StatusBadge } from '@/components/StatusBadge'
import { Edit, ArrowLeft, Trash2 } from 'lucide-react'
import { ViewBrandSkeleton } from './components/ViewBrandSkeleton'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function ViewBrandPage() {
  const { id } = useParams<{ id: string }>()
  const { t } = useTranslation()
  const { isLoading, brand, isToggling, handleEdit, handleBack, handleDisable, error } = useViewBrandPage(id!)

  if (error) {
    const errorMessage =
      error instanceof ApiError ? formatErrors(error.response.errors) : error.message

    return (
      <Card title={t('brands.list.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
        <ErrorAlert title={t('common.error')} description={errorMessage} />
      </Card>
    )
  }

  if (isLoading) {
    return <ViewBrandSkeleton />
  }

  if (!brand) {
    return (
      <Card title={t('brands.list.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
        <ErrorAlert
          title={t('brands.list.title')}
          description={t('table.table_no_data')}
        />
      </Card>
    )
  }

  return (
    <Card title={t('brands.list.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium">{t('brands.list.table.column_name')}</h3>
          <p className="text-sm text-gray-500">{brand.name || '-'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('brands.list.table.column_description')}</h3>
          <p className="text-sm text-gray-500">{brand.description || '-'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('brands.list.table.column_status')}</h3>
          <div className="mt-1">
            {brand.isActive ? (
              <StatusBadge status="success">{t('brands.list.table.column_active_true')}</StatusBadge>
            ) : (
              <StatusBadge status="canceled">
                {t('brands.list.table.column_active_false')}
              </StatusBadge>
            )}
          </div>
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
        <ConfirmDialog
          trigger={
            <Button
              className="ml-auto"
              variant="destructive"
              loading={isToggling}
              icon={<Trash2 className="w-4 h-4" />}
            >
              {t('brands.edit.disable')}
            </Button>
          }
          title={t('brands.edit.disable_confirm_title')}
          description={t('brands.edit.disable_confirm_message')}
          confirmText={t('brands.edit.disable')}
          cancelText={t('common.cancel')}
          onConfirm={handleDisable}
          variant="destructive"
        />
      </div>
    </Card>
  )
} 