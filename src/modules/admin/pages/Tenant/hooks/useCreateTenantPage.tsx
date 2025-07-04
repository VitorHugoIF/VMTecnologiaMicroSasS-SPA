import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateTenant } from '../../../hooks/tenant/useCreateTenant'
import type { CreateTenantRequest } from '../../../models'

export function useCreateTenantPage() {
  const navigate = useNavigate()
  const createTenantMutation = useCreateTenant()

  const [formData, setFormData] = useState<CreateTenantRequest>({
    name: '',
    slug: '',
    email: '',
    planId: '',
    status: '',
  })

  const handleInputChange = (field: keyof CreateTenantRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await createTenantMutation.mutateAsync(formData)
      navigate('/app/admin/tenant')
    } catch (error) {
      console.error('Error creating tenant:', error)
    }
  }

  return {
    formData,
    handleInputChange,
    handleSubmit,
    isLoading: createTenantMutation.isPending,
    error: createTenantMutation.error,
  }
}
