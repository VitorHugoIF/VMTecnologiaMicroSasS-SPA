import { Card } from '@/components/Card'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/Separator'

export function ViewRoleSkeleton() {
  return (
    <Card title=" " className="py-6 min-h-0" contentClassName="px-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Skeleton className="h-4 w-24 mb-2 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-5 w-32 bg-gray-200 dark:bg-gray-700" />
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-2 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-5 w-40 bg-gray-200 dark:bg-gray-700" />
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-2 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-5 w-24 bg-gray-200 dark:bg-gray-700" />
        </div>
        <div>
          <Skeleton className="h-4 w-24 mb-2 bg-gray-200 dark:bg-gray-700" />
          <Skeleton className="h-5 w-56 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      <Separator className="mt-6" />
      <div className="flex gap-3 pt-8">
        <Skeleton className="h-10 w-24 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-10 w-24 bg-gray-200 dark:bg-gray-700" />
        <Skeleton className="h-10 w-32 ml-auto bg-gray-200 dark:bg-gray-700" />
      </div>
    </Card>
  )
}
