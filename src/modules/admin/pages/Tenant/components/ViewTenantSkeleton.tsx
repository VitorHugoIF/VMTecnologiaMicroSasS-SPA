import { Card } from '@/components/Card'
import { Skeleton } from '@/components/ui/skeleton'

export function ViewTenantSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <div className="space-y-4">
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-6 w-64" />
          </div>
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-6 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex gap-2 pt-4">
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-20" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </Card>
    </div>
  )
}
