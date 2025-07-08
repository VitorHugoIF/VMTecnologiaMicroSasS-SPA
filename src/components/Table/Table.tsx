import {
  Table as UITable,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Skeleton } from '@/components/ui/skeleton'

export interface TableColumn<T> {
  header: React.ReactNode
  accessor?: keyof T
  render?: (row: T) => React.ReactNode
  className?: string
}

interface TableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  isLoading?: boolean
  actions?: (row: T) => React.ReactNode
  className?: string
  sort?: string
  order?: number
  onSort?: (accessor: string) => void
}

export function Table<T>({
  data,
  columns,
  isLoading,
  actions,
  className,
  sort,
  order,
  onSort,
}: TableProps<T>) {
  const { t } = useTranslation()

  return (
    <div className={`overflow-hidden ${className ?? ''}`}>
      <UITable className="min-w-full">
        <TableHeader>
          <TableRow className="sticky top-0 z-10 hover:bg-transparent dark:border-white/10">
            {columns.map((col, idx) => (
              <TableHead
                key={idx}
                className={`px-4 py-2 font-bold text-xs text-foreground uppercase tracking-wider ${col.className ?? ''}`}
                style={col.accessor ? { cursor: 'pointer', userSelect: 'none' } : {}}
                onClick={col.accessor && onSort ? () => onSort(col.accessor as string) : undefined}
              >
                <span className="flex items-center gap-1">
                  {col.header}
                  {col.accessor &&
                    sort === col.accessor &&
                    order !== undefined &&
                    (order === 1 ? <span>▲</span> : <span>▼</span>)}
                  {col.accessor && sort !== col.accessor && <span className="opacity-30">⇅</span>}
                </span>
              </TableHead>
            ))}
            {actions && (
              <TableHead className="px-4 py-2 font-semibold text-xs text-foreground uppercase tracking-wider">
                {t('table.table_column_actions')}
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {columns.map((_col, idx) => (
                  <TableCell key={idx} className={`px-4 py-2`}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
                {actions && (
                  <TableCell className="px-4 py-2">
                    <Skeleton className="h-4 w-8 mx-auto" />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions ? 1 : 0)}
                className="text-center px-4 py-2 text-muted-foreground"
              >
                {t('table.table_no_data')}
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, i) => (
              <TableRow key={i} className="transition hover:bg-transparent dark:border-white/10">
                {columns.map((col, idx) => (
                  <TableCell
                    key={idx}
                    className={`px-4 py-2 text-gray-600 dark:text-gray-400 ${col.className ?? ''}`}
                  >
                    {col.render
                      ? col.render(row)
                      : col.accessor
                        ? String(row[col.accessor] ?? '')
                        : null}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell className="px-4 py-2 text-gray-600 dark:text-gray-400">
                    {actions(row)}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </UITable>
    </div>
  )
}
