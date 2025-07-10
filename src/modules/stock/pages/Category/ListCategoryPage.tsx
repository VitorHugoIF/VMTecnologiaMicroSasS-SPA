import { useNavigate } from 'react-router-dom'
import { Table as TableComponent, TableActions, TablePagination } from '@/components'
import { TableHeaderActions } from '@/modules/components'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components'
import { useListCategoryPage } from './hooks/useListCategoryPage'
import { ListCategorySkeleton } from './components/ListCategorySkeleton'
import type { Category } from '@/modules/stock/types'
import { STOCK_ROUTES } from '@/routes/routeRoles'

export function ListCategoryPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    isLoading,
    columns,
    paginatedCategories,
    page,
    totalPages,
    order,
    sort,
    search,
    setSearch,
    setSort,
    setOrder,
    setPage,
  } = useListCategoryPage()

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
        title={t('categories.list.title')}
        search={search || ''}
        setSearch={handleSearchChange}
        onAdd={() => navigate(STOCK_ROUTES.category.add)}
        addLabel={t('categories.list.add')}
        searchPlaceholder={t('categories.list.search.placeholder')}
      />
      <TableComponent
        className="px-6 pb-2"
        data={paginatedCategories}
        columns={columns}
        isLoading={isLoading}
        loadingComponent={<ListCategorySkeleton />}
        actions={(category) => (
          <TableActions
            row={category as Category}
            onView={(c: Category) => navigate(STOCK_ROUTES.category.view(String(c.id)))}
            onEdit={(c: Category) => navigate(STOCK_ROUTES.category.edit(String(c.id)))}
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