import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CategoryHttpService } from '@/modules/services/http'
import { Toast } from '@/components'

export function useDisableCategory() {
  const queryClient = useQueryClient()

  const disable = useMutation({
    mutationFn: (id: string) => CategoryHttpService.disableCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error: any) => {
      Toast.error({ title: 'Erro', description: error?.message || 'Erro ao desativar categoria.' })
    },
  })

  return { disable }
} 