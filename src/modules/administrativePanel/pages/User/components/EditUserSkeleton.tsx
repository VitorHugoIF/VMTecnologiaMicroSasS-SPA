import { Card } from '@/components/Card'
import { Skeleton } from '@/components/ui/skeleton'

export function EditUserSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex gap-3 pt-4 md:col-span-2">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
          </div>
        </div>
      </Card>
    </div>
  )
}
