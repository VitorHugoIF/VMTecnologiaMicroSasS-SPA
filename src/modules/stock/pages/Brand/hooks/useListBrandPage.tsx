import { useState, useEffect } from 'react'
import { useGetBrands } from '@/modules/stock/hooks'
import { useTranslation } from 'react-i18next'
import type { Brand } from '@/modules/stock/types'
import type { TableColumn } from '@/components'
import { mapPagedBrandResponseToBrands } from '@/modules/stock/mappers'

export function useListBrandPage() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [order, setOrder] = useState<number | undefined>(undefined)
  const [sort, setSort] = useState<string | undefined>(undefined)
  const [searchInput, setSearchInput] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput)
    }, 900)
    return () => clearTimeout(handler)
  }, [searchInput])

  const { data, isLoading } = useGetBrands(page, pageSize, search, sort, order)
  const { items: brands, totalCount } = mapPagedBrandResponseToBrands(data)
  const totalPages = Math.ceil(totalCount / pageSize)

  const columns: TableColumn<Brand>[] = [
    { header: t('brands.list.table.column_name'), accessor: 'name' as keyof Brand },
    { header: t('brands.list.table.column_description'), accessor: 'description' as keyof Brand },
  ]

  return {
    isLoading,
    columns,
    paginatedBrands: brands,
    page,
    totalPages,
    order,
    sort,
    search: searchInput,
    setSearch: setSearchInput,
    setSort,
    setOrder,
    setPage,
  }
} 