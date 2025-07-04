import { useState, useEffect } from 'react'
import { useGetRoles } from '../../../hooks'
import type { RoleTableColumn } from '../../../types'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from 'react-i18next'
import { mapPagedRoleResponseToRoles } from '@/modules/admin/mappers/roleMappers';

export function useListRolesPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [order, setOrder] = useState<number|undefined>(undefined);
  const [sort, setSort] = useState<string|undefined>(undefined);
  const [searchInput, setSearchInput] = useState<string|undefined>(undefined);
  const [search, setSearch] = useState<string|undefined>(undefined);
  const { data, isLoading } = useGetRoles(page, pageSize, order, sort, search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
    }, 900);
    return () => clearTimeout(handler);
  }, [searchInput]);

  const { items, totalCount } = mapPagedRoleResponseToRoles(data);
  const totalPages = Math.ceil(totalCount / pageSize);
  const paginatedRoles = items;

  const columns: RoleTableColumn[] = [
    { header: t('roles.list.table.column_name'), accessor: 'name' },
    { header: t('roles.list.table.column_description'), accessor: 'description' },
    { header: t('roles.list.table.column_active'), accessor: 'active', render: (role) => (
      role.active ? (
        <Badge variant="default">{t('roles.list.table.column_active_true')}</Badge>
      ) : (
        <Badge variant="secondary">{t('roles.list.table.column_active_false')}</Badge>
      )
    ) },
  ];

  return {
    isLoading,
    columns,
    paginatedRoles,
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