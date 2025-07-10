import { Table as TableComponent, TableActions, TablePagination } from '@/components'
import { TableHeaderActions } from '@/modules/components'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components'
import { useListProductPage } from './hooks/useListProductPage'

export function ListProductPage() {
  const { t } = useTranslation()
  const {
    isLoading,
    columns,
    paginatedProducts,
    page,
    totalPages,
    order,
    sort,
    search,
    setSearch,
    setSort,
    setOrder,
    setPage,
  } = useListProductPage()

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
        title={t('products.list.title')}
        search={search || ''}
        setSearch={handleSearchChange}
        onAdd={() => {}} // TODO: Implement add product navigation
        addLabel={t('products.list.add')}
        searchPlaceholder={t('products.list.search.placeholder')}
      />
      <TableComponent
        className="px-6 pb-2"
        data={paginatedProducts}
        columns={columns}
        isLoading={isLoading}
        actions={(product) => (
          <TableActions
            row={product}
            // onView={(p) => navigate(`/stock/products/view/${p.id}`)}
            // onEdit={(p) => navigate(`/stock/products/edit/${p.id}`)}
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