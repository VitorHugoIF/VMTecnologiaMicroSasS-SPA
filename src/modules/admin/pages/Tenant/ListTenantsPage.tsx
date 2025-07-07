import { useNavigate } from 'react-router-dom'
import { Card } from '@/components/Card'
import { Table as TableComponent, TableActions, TablePagination } from '@/components'
import { useListTenantsPage } from './hooks/useListTenantsPage'
import { TableHeaderActions, ErrorAlert } from '../../../components'
import { useTenantTableColumns } from '../../types/tenant/tenantTableColumn'
import { useTranslation } from 'react-i18next'
import { ADMIN_ROUTES } from '@/routes/routeRoles'
import { formatErrors } from '@/lib/utils'
import { ApiError } from '@/core/models/errorResponse'

export function ListTenantsPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    tenants,
    isLoading,
    error,
    page,
    totalPages,
    search,
    sort,
    order,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
  } = useListTenantsPage()

  const columns = useTenantTableColumns()

  if (error) {
    const errorMessage = error instanceof ApiError 
      ? formatErrors(error.response.errors)
      : error.message
      
    return (
      <div className="flex flex-col gap-3">
        <ErrorAlert title={t('tenants.list.errorLoading')} description={errorMessage} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <Card className="w-full">
        <TableHeaderActions
          title={t('tenants.list.title')}
          search={search || ''}
          setSearch={handleSearchChange}
          onAdd={() => navigate(ADMIN_ROUTES.tenant.add)}
          addLabel={t('tenants.list.add')}
          searchPlaceholder={t('tenants.list.search.placeholder')}
        />
        <TableComponent
          className="rounded-none border-x-0"
          data={tenants}
          columns={columns}
          isLoading={isLoading}
          actions={(tenant) => (
            <TableActions
              row={tenant}
              onView={(t) => navigate(ADMIN_ROUTES.tenant.view(t.id))}
              onEdit={(t) => navigate(ADMIN_ROUTES.tenant.edit(t.id))}
            />
          )}
          sort={sort}
          order={order}
          onSort={(accessor) => {
            if (sort === accessor) {
              handleSortChange(accessor, order === 1 ? 0 : 1)
            } else {
              handleSortChange(accessor, 1)
            }
          }}
        />
        <TablePagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Card>
    </div>
  )
}
