import { useMutation, useQueryClient } from '@tanstack/react-query'
import { BrandHttpService } from '@/modules/services/http'
import { Toast } from '@/components'

export function useDisableBrand() {
  const queryClient = useQueryClient()

  const disable = useMutation({
    mutationFn: (id: string) => BrandHttpService.disableBrand(id),
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    onError: (error: any) => {
      Toast.error({ title: 'Erro', description: error?.message || 'Erro ao desativar marca.' })
    },
  })

  return { disable }
} 