import { useParams, useNavigate } from 'react-router-dom'
import { useGetCategory, useDisableCategory } from '@/modules/stock/hooks'
import { STOCK_ROUTES } from '@/routes/routeRoles'
import { useState } from 'react'
import { mapCategoryResponseToCategory } from '@/modules/stock/mappers/categoryMapper'
import type { Category } from '@/modules/stock/types'
import { Button, ConfirmDialog, Separator } from '@/components'
import { Card } from '@/components'
import { useTranslation } from 'react-i18next'
import { ErrorAlert } from '@/modules/components'
import { StatusBadge } from '@/components/StatusBadge'
import { Edit, ArrowLeft, Trash2 } from 'lucide-react'
import { ViewCategorySkeleton } from './components/ViewCategorySkeleton'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function ViewCategoryPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isToggling, setIsToggling] = useState(false)

  const { data: axiosData, isLoading, error } = useGetCategory(id!)
  const apiData = axiosData?.data
  const category: Category | undefined = apiData ? mapCategoryResponseToCategory(apiData) : undefined

  const { disable } = useDisableCategory()

  const handleEdit = () => {
    if (category?.id) {
      navigate(STOCK_ROUTES.category.edit(category.id))
    }
  }

  const handleBack = () => {
    navigate(STOCK_ROUTES.category.list)
  }

  const handleDisable = async () => {
    if (!category?.id) return
    setIsToggling(true)
    try {
      await disable.mutateAsync(category.id)
      navigate(STOCK_ROUTES.category.list)
    } catch (error) {
      console.error(error)
    } finally {
      setIsToggling(false)
    }
  }

  if (error) {
    const errorMessage =
      error instanceof ApiError ? formatErrors(error.response.errors) : error.message

    return (
      <Card title={t('categories.list.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
        <ErrorAlert title={t('common.error')} description={errorMessage} />
      </Card>
    )
  }

  if (isLoading) {
    return <ViewCategorySkeleton />
  }

  if (!category) {
    return (
      <Card title={t('categories.list.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
        <ErrorAlert
          title={t('categories.list.title')}
          description={t('table.table_no_data')}
        />
      </Card>
    )
  }

  return (
    <Card title={t('categories.list.title')} className="py-6 min-h-0" contentClassName="p-0 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium">{t('categories.list.table.column_name')}</h3>
          <p className="text-sm text-gray-500">{category.name || '-'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('categories.list.table.column_description')}</h3>
          <p className="text-sm text-gray-500">{category.description || '-'}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t('categories.list.table.column_status')}</h3>
          <div className="mt-1">
            {category.isActive ? (
              <StatusBadge status="success">{t('categories.list.table.column_active_true')}</StatusBadge>
            ) : (
              <StatusBadge status="canceled">
                {t('categories.list.table.column_active_false')}
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
              {t('categories.edit.disable')}
            </Button>
          }
          title={t('categories.edit.disable_confirm_title')}
          description={t('categories.edit.disable_confirm_message')}
          confirmText={t('categories.edit.disable')}
          cancelText={t('common.cancel')}
          onConfirm={handleDisable}
          variant="destructive"
        />
      </div>
    </Card>
  )
} 