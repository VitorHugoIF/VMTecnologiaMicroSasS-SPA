import { Skeleton } from '@/components/ui/skeleton'

export function ViewRoleSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-card rounded-md shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-7 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-24 rounded" />
              <Skeleton className="h-10 w-24 rounded" />
              <Skeleton className="h-10 w-32 rounded" />
            </div>
          </div>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
