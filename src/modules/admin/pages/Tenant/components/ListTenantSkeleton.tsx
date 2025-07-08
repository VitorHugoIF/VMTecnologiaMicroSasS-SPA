import { TableRow, TableCell } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

export function ListTenantSkeleton() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <TableRow key={i}>
          <TableCell><Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" /></TableCell>
          <TableCell><Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" /></TableCell>
          <TableCell><Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" /></TableCell>
          <TableCell><Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" /></TableCell>
          <TableCell><Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" /></TableCell>
          <TableCell><Skeleton className="h-8 w-16 bg-gray-200 dark:bg-gray-700 mx-auto" /></TableCell>
        </TableRow>
      ))}
    </>
  )
} 