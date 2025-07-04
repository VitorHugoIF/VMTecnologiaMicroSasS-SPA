import { useParams } from 'react-router-dom'
import { useGetTenant, useEnableDisableTenant } from '../../../hooks/tenant'

export function useViewTenantPage() {
  const { id } = useParams<{ id: string }>()
  const { data: tenant, isLoading, error } = useGetTenant(id!)
  const { enable, disable } = useEnableDisableTenant()

  const handleEnable = async () => {
    if (!id) return
    try {
      await enable.mutateAsync(id)
    } catch (error) {
      console.error('Error enabling tenant:', error)
    }
  }

  const handleDisable = async () => {
    if (!id) return
    try {
      await disable.mutateAsync(id)
    } catch (error) {
      console.error('Error disabling tenant:', error)
    }
  }

  return {
    tenant,
    isLoading,
    error,
    handleEnable,
    handleDisable,
    isEnabling: enable.isPending,
    isDisabling: disable.isPending,
  }
}
