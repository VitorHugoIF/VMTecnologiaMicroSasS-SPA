import { useState, useEffect } from 'react'
import { useGetCategories } from '@/modules/stock/hooks'
import { useTranslation } from 'react-i18next'
import type { Category } from '@/modules/stock/types'
import type { TableColumn } from '@/components'
import { mapPagedCategoryResponseToCategories } from '@/modules/stock/mappers'

export function useListCategoryPage() {
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

  const { data, isLoading } = useGetCategories(page, pageSize, search, sort, order)
  const { items: categories, totalCount } = mapPagedCategoryResponseToCategories(data)
  const totalPages = Math.ceil(totalCount / pageSize)

  const columns: TableColumn<Category>[] = [
    { header: t('categories.list.table.column_name'), accessor: 'name' as keyof Category },
    { header: t('categories.list.table.column_description'), accessor: 'description' as keyof Category },
  ]

  return {
    isLoading,
    columns,
    paginatedCategories: categories,
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