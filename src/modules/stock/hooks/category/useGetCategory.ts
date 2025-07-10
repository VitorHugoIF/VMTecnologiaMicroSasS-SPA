import { useQuery } from '@tanstack/react-query'
import { CategoryHttpService } from '@/modules/services/http'

export function useGetCategory(id: string) {
  return useQuery({
    queryKey: ['useGetCategory', id],
    queryFn: () => CategoryHttpService.getCategory(id),
    enabled: !!id,
  })
} 