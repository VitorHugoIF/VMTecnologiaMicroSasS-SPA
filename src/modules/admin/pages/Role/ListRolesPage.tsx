import { useNavigate } from "react-router-dom"
import { Table as TableComponent, TableActions, TablePagination } from '@/components'
import { useListRolesPage } from './hooks/useListRolesPage'
import { ErrorAlert, TableHeaderActions } from '../../components'
import type { Role } from '../../types'
import { useTranslation } from 'react-i18next'
import { ADMIN_ROUTES } from '@/routes/routeRoles'

export function ListRolesPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    isLoading,
    error,
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

  if (error) {
    const apiResponse = (error as any)?.response?.data;
    return (
      <div className="flex justify-center items-center">
        <ErrorAlert
          title={apiResponse?.message || t('roles.list.errorLoading')}
          description={apiResponse?.errors?.join('\n') || (error as any)?.message}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-card rounded-md shadow-lg overflow-hidden">
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
      </div>
    </div>
  );
} 