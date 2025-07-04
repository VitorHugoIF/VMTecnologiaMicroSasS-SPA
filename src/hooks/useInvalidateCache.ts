import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export function useInvalidateCache() {
  const queryClient = useQueryClient()
  useEffect(() => {
    return () => {
      queryClient.invalidateQueries()
    }
  }, [queryClient])
}
