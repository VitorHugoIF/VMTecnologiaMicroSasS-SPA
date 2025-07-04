import { useNavigate } from "react-router-dom"
import { Table as TableComponent, TableActions, TablePagination } from '@/components'
import { useListPlansPage } from './hooks/useListPlansPage'
import { TableHeaderActions } from '../../../components'
import type { Plan } from '../../types'
import { useTranslation } from 'react-i18next'
import { ADMIN_ROUTES } from '@/routes/routeRoles'

export function ListPlansPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
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
    search,
    setSearch,
  } = useListPlansPage();

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-card rounded-md shadow-lg overflow-hidden">
        <TableHeaderActions
          title={t('plans.list.title')}
          search={search || ''}
          setSearch={setSearch}
          onAdd={() => navigate(ADMIN_ROUTES.plans.add)}
          addLabel={t('plans.list.add')}
          searchPlaceholder={t('plans.list.search.placeholder')}
        />
        <TableComponent
          className="rounded-none border-x-0"
          data={paginatedPlans}
          columns={columns}
          isLoading={isLoading}
          actions={plan => (
            <TableActions
              row={plan}
              onView={(p: Plan) => navigate(ADMIN_ROUTES.plans.view(p.id!))}
              onEdit={(p: Plan) => navigate(ADMIN_ROUTES.plans.edit(p.id!))}
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