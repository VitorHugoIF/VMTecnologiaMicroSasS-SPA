import { useNavigate } from 'react-router-dom'
import { Table as TableComponent, TableActions, TablePagination } from '@/components'
import { useListRolesPage } from './hooks/useListRolesPage'
import { TableHeaderActions, ErrorAlert } from '../../../components'
import { useTranslation } from 'react-i18next'
import { ADMIN_ROUTES } from '@/routes/routeRoles'
import { Card } from '@/components/Card'
import { Separator } from '@/components/ui/separator'

export function ListRolesPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    isLoading,
    columns,
    paginatedRoles,
    page,
    totalPages,
    order,
    sort,
    search,
    setSearch,
    setSort,
    setOrder,
    setPage,
  } = useListRolesPage()

  const handleSearchChange = (newSearch: string) => setSearch(newSearch)
  const handleSortChange = (newSort: string, newOrder: number) => {
    setSort(newSort)
    setOrder(newOrder)
    setPage(1)
  }
  const handlePageChange = (newPage: number) => setPage(newPage)

  return (
    <Card>
      <TableHeaderActions
        title={t('roles.list.title')}
        search={search || ''}
        setSearch={handleSearchChange}
        onAdd={() => navigate(ADMIN_ROUTES.roles.add)}
        addLabel={t('roles.list.add')}
        searchPlaceholder={t('roles.list.search.placeholder')}
      />
      <Separator className='dark:bg-white/10'/>
      <TableComponent
        className="px-6 pb-2"
        data={paginatedRoles}
        columns={columns}
        isLoading={isLoading}
        actions={(role) => (
          <TableActions
            row={role}
            onView={(r) => navigate(ADMIN_ROUTES.roles.view(r.id!))}
            onEdit={(r) => navigate(ADMIN_ROUTES.roles.edit(r.id!))}
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
  )
}
