import { useState, useEffect } from 'react'
import type { PagedResponse } from '@/core/models/pagedResponse'
import type { ProductResponse } from '@/modules/stock/models/response/productResponse'
import { getProducts } from '@/modules/services/http/productHttpService'
import { mapPagedProductResponseToProducts } from '@/modules/stock/mappers'
import { StatusBadge } from '@/components/StatusBadge'
import { useTranslation } from 'react-i18next'
import type { ProductList } from '@/modules/stock/types'
import type { TableColumn } from '@/components'

export function useListProductPage() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [order, setOrder] = useState<number | undefined>(undefined)
  const [sort, setSort] = useState<string | undefined>(undefined)
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined)
  const [search, setSearch] = useState<string | undefined>(undefined)
  const [data, setData] = useState<PagedResponse<ProductResponse> | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput)
    }, 900)
    return () => clearTimeout(handler)
  }, [searchInput])

  useEffect(() => {
    setIsLoading(true)
    getProducts(page, pageSize, order, sort, search)
      .then((res) => setData(res))
      .finally(() => setIsLoading(false))
  }, [page, pageSize, order, sort, search])

  const { items, totalCount } = mapPagedProductResponseToProducts(data ?? undefined)
  const totalPages = Math.ceil(totalCount / pageSize)
  const paginatedProducts = items

  const columns: TableColumn<ProductList>[] = [
    { header: t('products.list.table.column_name'), accessor: 'name' as keyof ProductList },
    { header: t('products.list.table.column_sku'), accessor: 'sku' as keyof ProductList },
    { header: t('products.list.table.column_category'), accessor: 'categoryName' as keyof ProductList },
    { header: t('products.list.table.column_band'), accessor: 'bandName' as keyof ProductList },
    {
      header: t('products.list.table.column_active'),
      accessor: 'isActive' as keyof ProductList,
      render: (product: ProductList) =>
        product.isActive ? (
          <StatusBadge status="success">{t('products.list.table.column_active_true')}</StatusBadge>
        ) : (
          <StatusBadge status="canceled">{t('products.list.table.column_active_false')}</StatusBadge>
        ),
    },
  ]

  return {
    isLoading,
    columns,
    paginatedProducts,
    page,
    setPage,
    totalPages,
    order,
    setOrder,
    sort,
    setSort,
    search: searchInput,
    setSearch: setSearchInput,
  }
} 