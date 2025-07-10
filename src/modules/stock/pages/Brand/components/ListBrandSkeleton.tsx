import { TableRow, TableCell } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'

export function ListBrandSkeleton() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <TableRow key={i}>
          <TableCell><Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" /></TableCell>
          <TableCell><Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" /></TableCell>
          <TableCell className="text-center"><Skeleton className="h-8 w-8 bg-gray-200 dark:bg-gray-700 mx-auto rounded-full" /></TableCell>
        </TableRow>
      ))}
    </>
  )
} 