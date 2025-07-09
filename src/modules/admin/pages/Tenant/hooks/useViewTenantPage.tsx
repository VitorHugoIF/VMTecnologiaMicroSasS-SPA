import { useNavigate, useParams } from 'react-router-dom'
import { useGetTenant, useEnableDisableTenant } from '../../../hooks/tenant'
import { ADMIN_ROUTES } from '@/routes/routeRoles'
import { useState } from 'react'

export function useViewTenantPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isDeleting, setIsDeleting] = useState(false)
  const { data: tenant, isLoading, error } = useGetTenant(id!)
  const { enable, disable } = useEnableDisableTenant()

  const handleEnable = async () => {
    if (!id) return
    setIsDeleting(true)
    try {
      await enable.mutateAsync(id)
      navigate(ADMIN_ROUTES.tenant.list)
    } catch (error) {
      console.error('Error enabling tenant:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDisable = async () => {
    if (!id) return
    setIsDeleting(true)
    try {
      await disable.mutateAsync(id)
      navigate(ADMIN_ROUTES.tenant.list)
    } catch (error) {
      console.error('Error disabling tenant:', error)
    } finally {
      setIsDeleting(false)
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
    isDeleting,
  }
}
