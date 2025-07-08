import { useNavigate } from 'react-router-dom'
import { Table as TableComponent, TableActions, TablePagination } from '@/components'
import { useListUsersPage } from './hooks/useListUsersPage'
import { TableHeaderActions } from '../../../components'
import { useTranslation } from 'react-i18next'
import { ADMINISTRATIVE_PANEL_ROUTES } from '@/routes/routeRoles'
import { Card } from '@/components/Card'
import { ErrorAlert } from '../../../components'
import { ApiError } from '@/core/models/errorResponse'
import { formatErrors } from '@/lib/utils'

export function ListUsersPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    isLoading,
    columns,
    paginatedUsers,
    page,
    totalPages,
    order,
    sort,
    search,
    setSearch,
    setSort,
    setOrder,
    setPage,
    error,
  } = useListUsersPage()

  const handleSearchChange = (newSearch: string) => setSearch(newSearch)
  const handleSortChange = (newSort: string, newOrder: number) => {
    setSort(newSort)
    setOrder(newOrder)
    setPage(1)
  }
  const handlePageChange = (newPage: number) => setPage(newPage)

  if (error) {
    const errorMessage =
      error instanceof ApiError ? formatErrors(error.response.errors) : error.message
    return (
      <div className="flex flex-col gap-3">
        <ErrorAlert title={t('users.list.errorLoading')} description={errorMessage} />
      </div>
    )
  }

  return (
    <Card>
      <TableHeaderActions
        title={t('users.list.title')}
        search={search || ''}
        setSearch={handleSearchChange}
        onAdd={() => navigate(ADMINISTRATIVE_PANEL_ROUTES.users.add)}
        addLabel={t('users.list.add')}
        searchPlaceholder={t('users.list.search.placeholder')}
      />
      <TableComponent
        className="px-6 pb-2"
        data={paginatedUsers}
        columns={columns}
        isLoading={isLoading}
        actions={(user) => (
          <TableActions
            row={user}
            onView={(u) => navigate(ADMINISTRATIVE_PANEL_ROUTES.users.view(u.id!))}
            onEdit={(u) => navigate(ADMINISTRATIVE_PANEL_ROUTES.users.edit(u.id!))}
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
      <TablePagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </Card>
  )
}
