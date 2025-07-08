import { useNavigate } from 'react-router-dom'
import { Table as TableComponent, TableActions, TablePagination } from '@/components'
import { useListPlansPage } from './hooks/useListPlansPage'
import { TableHeaderActions } from '../../../components'
import { useTranslation } from 'react-i18next'
import { ADMIN_ROUTES } from '@/routes/routeRoles'
import { Card } from '@/components/Card'

export function ListPlansPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    isLoading,
    columns,
    paginatedPlans,
    page,
    totalPages,
    order,
    sort,
    search,
    setSearch,
    setSort,
    setOrder,
    setPage,
  } = useListPlansPage()

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
        title={t('plans.list.title')}
        search={search || ''}
        setSearch={handleSearchChange}
        onAdd={() => navigate(ADMIN_ROUTES.plans.add)}
        addLabel={t('plans.list.add')}
        searchPlaceholder={t('plans.list.search.placeholder')}
      />
      <TableComponent
        className="px-6 pb-2"
        data={paginatedPlans}
        columns={columns}
        isLoading={isLoading}
        actions={(plan) => (
          <TableActions
            row={plan}
            onView={(p) => navigate(ADMIN_ROUTES.plans.view(p.id!))}
            onEdit={(p) => navigate(ADMIN_ROUTES.plans.edit(p.id!))}
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
