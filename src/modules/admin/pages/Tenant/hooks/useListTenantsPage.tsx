import { useState } from 'react'
import { useGetTenants } from '../../../hooks/tenant/useGetTenants'

export function useListTenantsPage() {
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [order, setOrder] = useState<number>(0)

  const { data, isLoading, error } = useGetTenants(page, size, search, sort, order)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleSizeChange = (newSize: number) => {
    setSize(newSize)
    setPage(1)
  }

  const handleSearchChange = (newSearch: string) => {
    setSearch(newSearch)
    setPage(1)
  }

  const handleSortChange = (newSort: string, newOrder: number) => {
    setSort(newSort)
    setOrder(newOrder)
    setPage(1)
  }

  return {
    data,
    isLoading,
    error,
    page,
    size,
    search,
    sort,
    order,
    handlePageChange,
    handleSizeChange,
    handleSearchChange,
    handleSortChange,
  }
}
