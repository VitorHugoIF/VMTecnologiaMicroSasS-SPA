import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetTenant, useUpdateTenant } from '../../../hooks/tenant'
import type { UpdateTenantRequest } from '../../../models'

export function useEditTenantPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: tenant, isLoading: isLoadingTenant, error: tenantError } = useGetTenant(id!)
  const updateTenantMutation = useUpdateTenant()

  const [formData, setFormData] = useState<UpdateTenantRequest>({
    name: '',
    slug: '',
    email: '',
    planId: '',
    status: '',
  })

  useEffect(() => {
    if (tenant) {
      setFormData({
        name: tenant.name,
        slug: tenant.slug,
        email: tenant.email,
        planId: tenant.planId,
        status: tenant.status,
      })
    }
  }, [tenant])

  const handleInputChange = (field: keyof UpdateTenantRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!id) return

    try {
      await updateTenantMutation.mutateAsync({ id, request: formData })
      navigate('/app/admin/tenant')
    } catch (error) {
      console.error('Error updating tenant:', error)
    }
  }

  return {
    tenant,
    formData,
    handleInputChange,
    handleSubmit,
    isLoading: isLoadingTenant || updateTenantMutation.isPending,
    error: tenantError || updateTenantMutation.error,
  }
}
