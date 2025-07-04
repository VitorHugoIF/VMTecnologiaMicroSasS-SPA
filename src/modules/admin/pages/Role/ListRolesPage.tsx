import { useNavigate } from "react-router-dom"
import { Card } from "@/components/Card"
import { Table as TableComponent, TableActions, TablePagination } from '@/components'
import { useListRolesPage } from './hooks/useListRolesPage'
import { TableHeaderActions } from '../../../components'
import type { Role } from '../../types'
import { useTranslation } from 'react-i18next'
import { ADMIN_ROUTES } from '@/routes/routeRoles'

export function ListRolesPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
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
    search,
    setSearch,
  } = useListRolesPage();

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <TableHeaderActions
          title={t('roles.list.title')}
          search={search || ''}
          setSearch={setSearch}
          onAdd={() => navigate(ADMIN_ROUTES.roles.add)}
          addLabel={t('roles.list.add')}
          searchPlaceholder={t('roles.list.search.placeholder')}
        />
        <TableComponent
          className="rounded-none border-x-0"
          data={paginatedRoles}
          columns={columns}
          isLoading={isLoading}
          actions={role => (
            <TableActions
              row={role}
              onView={(r: Role) => navigate(ADMIN_ROUTES.roles.view(r.id!))}
              onEdit={(r: Role) => navigate(ADMIN_ROUTES.roles.edit(r.id!))}
            />
          )}
          sort={sort}
          order={order}
          onSort={(accessor) => {
            if (sort === accessor) {
              setOrder(order === 1 ? 0 : 1);
            } else {
              setSort(accessor);
              setOrder(1);
            }
          }}
        />
        <TablePagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </Card>
    </div>
  );
} 