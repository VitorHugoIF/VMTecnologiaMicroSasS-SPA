import { useState, useEffect } from 'react'
import { useGetTenants } from '../../../hooks/tenant/useGetTenants'

export function useListTenantsPage() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<string | undefined>(undefined)
  const [order, setOrder] = useState<number | undefined>(undefined)

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput)
    }, 900)
    return () => clearTimeout(handler)
  }, [searchInput])

  const { data, isLoading, error } = useGetTenants(page, pageSize, search, sort, order)
  const tenants = data?.data?.items || []
  const totalCount = data?.data?.totalCount || 0
  const totalPages = Math.ceil(totalCount / pageSize)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setPage(1)
  }

  const handleSearchChange = (newSearch: string) => {
    setSearchInput(newSearch)
  }

  const handleSortChange = (newSort: string, newOrder: number) => {
    setSort(newSort)
    setOrder(newOrder)
    setPage(1)
  }

  return {
    isLoading,
    tenants,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    order,
    setOrder,
    sort,
    setSort,
    search: searchInput,
    setSearch: setSearchInput,
    error,
    handlePageChange,
    handleSizeChange,
    handleSearchChange,
    handleSortChange,
  }
}
