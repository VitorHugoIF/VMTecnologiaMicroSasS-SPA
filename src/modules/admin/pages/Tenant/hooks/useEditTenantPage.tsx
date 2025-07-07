import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from 'react-i18next'
import { useGetTenant, useUpdateTenant } from '../../../hooks/tenant'
import { useGetActivePlans } from '../../../hooks/plan/useGetActivePlans'
import { TenantStatusLabels } from '@/modules/admin/types/tenant/tenantStatus'

function getStatusCodeFromLabel(label: string) {
  return Object.entries(TenantStatusLabels).find(([, v]) => v === label)?.[0] ?? '';
}

export function useEditTenantPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { data: tenant, isLoading: isLoadingTenant, error: tenantError } = useGetTenant(id!)
  const updateTenantMutation = useUpdateTenant()
  const { data: activePlans, isLoading: isLoadingPlans } = useGetActivePlans()

  const updateTenantSchema = z.object({
    name: z.string()
      .min(1, t('tenants.edit.form.nameRequired'))
      .min(2, t('tenants.edit.form.nameMinLength')),
    slug: z.string()
      .min(1, t('tenants.edit.form.slugRequired'))
      .min(2, t('tenants.edit.form.slugMinLength')),
    email: z.string()
      .min(1, t('tenants.edit.form.emailRequired'))
      .email(t('tenants.edit.form.emailInvalid')),
    planId: z.string().min(1, t('tenants.edit.form.planRequired')),
    status: z.string().min(1, t('tenants.edit.form.statusRequired')),
  })

  type UpdateTenantFormData = z.infer<typeof updateTenantSchema>

  const form = useForm<UpdateTenantFormData>({
    resolver: zodResolver(updateTenantSchema),
    defaultValues: {
      name: '',
      slug: '',
      email: '',
      planId: '',
      status: '',
    },
  })

  useEffect(() => {
    if (tenant) {
      form.reset({
        name: tenant.name,
        slug: tenant.slug,
        email: tenant.email,
        planId: tenant.planId,
        status: getStatusCodeFromLabel(tenant.status),
      })
    }
  }, [tenant, form])

  useEffect(() => {
    if(!isLoadingPlans && !isLoadingTenant) {
      setTimeout(() => {
        form.setValue('planId', tenant?.planId ?? '')
        form.setValue('status', getStatusCodeFromLabel(tenant?.status ?? ''))
      }, 100);
    }
  }, [isLoadingPlans, isLoadingTenant, tenant])

  const onSubmit = async (data: UpdateTenantFormData) => {
    if (!id) return

    try {
      await updateTenantMutation.mutateAsync({ id, request: data })
      navigate('/app/admin/tenant')
    } catch (error) {
      console.error('Error updating tenant:', error)
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
    tenant,
    form,
    onSubmit,
    handleCancel,
    isLoading: isLoadingTenant || updateTenantMutation.isPending,
    isLoadingPlans,
    planOptions,
    error: tenantError || updateTenantMutation.error,
  }
}
