import { useQuery } from '@tanstack/react-query'
import { BrandHttpService } from '@/modules/services/http'

export function useGetBrand(id: string) {
  return useQuery({
    queryKey: ['useGetBrand', id],
    queryFn: () => BrandHttpService.getBrand(id),
    enabled: !!id,
  })
} 