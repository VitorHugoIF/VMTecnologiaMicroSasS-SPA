import { useState, useEffect } from 'react'
import { useGetUsers } from '../../../hooks'
import { mapUserListResponseToUser } from '../../../mappers'
import type { User } from '../../../types'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from 'react-i18next'
import type { TableColumn } from '@/components/Table'
import { useGetActiveRoles } from '../../../hooks/role/useGetActiveRoles'

export function useListUsersPage() {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [order, setOrder] = useState<number | undefined>(undefined)
  const [sort, setSort] = useState<string | undefined>(undefined)
  const [searchInput, setSearchInput] = useState<string | undefined>(undefined)
  const [search, setSearch] = useState<string | undefined>(undefined)
  const { data, isLoading } = useGetUsers(page, pageSize, order, sort, search)
  const { data: rolesData } = useGetActiveRoles()

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput)
    }, 900)
    return () => clearTimeout(handler)
  }, [searchInput])

  const paginatedUsers: User[] = (data?.data?.items || []).map((user) => {
    const mapped = mapUserListResponseToUser(user)
    if (mapped.roles && rolesData) {
      mapped.roles = mapped.roles.map((role) => {
        const found = rolesData.find((r) => r.id === role.name)
        return found ? { ...role, name: found.name } : role
      })
    }
    return mapped
  })
  const totalPages = data?.data ? Math.ceil(data.data.totalCount / pageSize) : 0

  const columns: TableColumn<User>[] = [
    { header: t('users.list.table.column_name'), accessor: 'name' },
    {
      header: t('users.list.table.column_active'),
      accessor: 'active',
      render: (user) =>
        user.active ? (
          <Badge variant="default">{t('users.list.table.column_active_true')}</Badge>
        ) : (
          <Badge variant="secondary">{t('users.list.table.column_active_false')}</Badge>
        ),
    },
    {
      header: t('users.list.table.column_roles'),
      accessor: 'roles',
      render: (user) =>
        user.roles && user.roles.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {user.roles.map((role: { name?: string }, index: number) => (
              <Badge key={index} variant="outline">
                {role.name}
              </Badge>
            ))}
          </div>
        ) : (
          <span className="text-muted-foreground">{t('users.view.form.noRoles')}</span>
        ),
    },
    {
      header: t('users.list.table.column_created_at'),
      accessor: 'createdAt',
      render: (user) =>
        user.createdAt ? new Date(user.createdAt).toLocaleDateString('pt-BR') : '-',
    },
  ]

  return {
    isLoading,
    columns,
    paginatedUsers,
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