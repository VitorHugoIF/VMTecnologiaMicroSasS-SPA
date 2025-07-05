import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { useCreateTenant } from '../../../hooks/tenant/useCreateTenant'
import { useGetActivePlans } from '../../../hooks/plan/useGetActivePlans'

export function useCreateTenantPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const createTenantMutation = useCreateTenant()
  const { data: activePlans, isLoading: isLoadingPlans } = useGetActivePlans()

  const createTenantSchema = z.object({
    name: z.string()
      .min(1, t('tenants.add.form.nameRequired'))
      .min(2, t('tenants.add.form.nameMinLength')),
    slug: z.string()
      .min(1, t('tenants.add.form.slugRequired'))
      .min(2, t('tenants.add.form.slugMinLength')),
    email: z.string()
      .min(1, t('tenants.add.form.emailRequired'))
      .email(t('tenants.add.form.emailInvalid')),
    planId: z.string().min(1, t('tenants.add.form.planRequired')),
  })

  type CreateTenantFormData = z.infer<typeof createTenantSchema>

  const form = useForm<CreateTenantFormData>({
    resolver: zodResolver(createTenantSchema),
    defaultValues: {
      name: '',
      slug: '',
      email: '',
      planId: '',
    },
  })

  const onSubmit = async (data: CreateTenantFormData) => {
    try {
      await createTenantMutation.mutateAsync(data)
      navigate('/app/admin/tenant')
    } catch (error) {
      console.error('Error creating tenant:', error)
    }
  }

  const handleCancel = () => {
    navigate('/app/admin/tenant')
  }

  const planOptions = activePlans?.map(plan => ({
    value: plan.id || '',
    label: plan.name || '',
    disabled: false
  })) || []

  return {
    form,
    onSubmit,
    handleCancel,
    isLoading: createTenantMutation.isPending,
    isLoadingPlans,
    planOptions,
    error: createTenantMutation.error,
  }
}
