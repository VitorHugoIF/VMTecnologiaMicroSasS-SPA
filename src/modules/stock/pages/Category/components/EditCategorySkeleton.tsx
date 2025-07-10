import { Card } from '@/components/Card'
import { Skeleton } from '@/components/ui/skeleton'

export function EditCategorySkeleton() {
  return (
    <Card title=" " className="py-6 min-h-0" contentClassName="px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-24 w-full bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      <div className="flex gap-2 pt-4">
        <Skeleton className="h-10 w-24 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-10 w-24 bg-gray-200 dark:bg-gray-700" />
      </div>
    </Card>
  )
} 