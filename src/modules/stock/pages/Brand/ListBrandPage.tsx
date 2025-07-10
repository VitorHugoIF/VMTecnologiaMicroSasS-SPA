import { useNavigate } from 'react-router-dom'
import { Table as TableComponent, TableActions, TablePagination } from '@/components'
import { TableHeaderActions } from '@/modules/components'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components'
import { useListBrandPage } from './hooks/useListBrandPage'
import { ListBrandSkeleton } from './components/ListBrandSkeleton'
import type { Brand } from '@/modules/stock/types'
import { STOCK_ROUTES } from '@/routes/routeRoles'

export function ListBrandPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    isLoading,
    columns,
    paginatedBrands,
    page,
    totalPages,
    order,
    sort,
    search,
    setSearch,
    setSort,
    setOrder,
    setPage,
  } = useListBrandPage()

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
        title={t('brands.list.title')}
        search={search || ''}
        setSearch={handleSearchChange}
        onAdd={() => navigate(STOCK_ROUTES.brand.add)}
        addLabel={t('brands.list.add')}
        searchPlaceholder={t('brands.list.search.placeholder')}
      />
      <TableComponent
        className="px-6 pb-2"
        data={paginatedBrands}
        columns={columns}
        isLoading={isLoading}
        loadingComponent={<ListBrandSkeleton />}
        actions={(brand) => (
          <TableActions
            row={brand as Brand}
            onView={(b: Brand) => navigate(STOCK_ROUTES.brand.view(String(b.id)))}
            onEdit={(b: Brand) => navigate(STOCK_ROUTES.brand.edit(String(b.id)))}
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