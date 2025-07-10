import { useGetCategory } from '@/modules/stock/hooks'

export function useViewCategoryPage(id: string) {
  const { data, isLoading, error } = useGetCategory(id)
  const category = data
  return { category, isLoading, error }
} 