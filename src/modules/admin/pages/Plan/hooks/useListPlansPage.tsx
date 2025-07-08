import { useState, useEffect } from 'react'
import { useGetPlans } from '../../../hooks'
import type { PlanTableColumn } from '../../../types'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from 'react-i18next'
import { mapPagedPlanResponseToPlans } from '../../../mappers/planMappers'

export function useListPlansPage() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [order, setOrder] = useState<number | undefined>(undefined)
  const [sort, setSort] = useState<string | undefined>(undefined)
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined)
  const [search, setSearch] = useState<string | undefined>(undefined)
  const { data, isLoading } = useGetPlans(page, pageSize, order, sort, search)

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput)
    }, 900)
    return () => clearTimeout(handler)
  }, [searchInput])

  const { items, totalCount } = mapPagedPlanResponseToPlans(data)
  const totalPages = Math.ceil(totalCount / pageSize)
  const paginatedPlans = items

  const columns: PlanTableColumn[] = [
    { header: t('plans.list.table.column_name'), accessor: 'name' },
    { header: t('plans.list.table.column_description'), accessor: 'description' },
    {
      header: t('plans.list.table.column_price'),
      accessor: 'price',
      render: (plan) => (plan.price ? `R$ ${plan.price.toFixed(2)}` : '-'),
    },
    {
      header: t('plans.list.table.column_active'),
      accessor: 'active',
      render: (plan) =>
        plan.active ? (
          <Badge variant="default">{t('plans.list.table.column_active_true')}</Badge>
        ) : (
          <Badge variant="default">{t('plans.list.table.column_active_false')}</Badge>
        ),
    },
  ]

  return {
    isLoading,
    columns,
    paginatedPlans,
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
