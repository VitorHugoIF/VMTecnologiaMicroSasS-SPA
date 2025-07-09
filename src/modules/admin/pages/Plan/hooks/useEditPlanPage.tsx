import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUpdatePlan, useGetPlan } from '../../../hooks'
import { ADMIN_ROUTES } from '@/routes/routeRoles'

export function useEditPlanPage(id: string) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mutateAsync, isPending, error } = useUpdatePlan()
  const { data, isLoading, error: planError } = useGetPlan(id)

  const schema = z.object({
    name: z.string().min(1, t('plans.edit.form.nameRequired')),
    description: z.string().min(1, t('plans.edit.form.descriptionRequired')),
    price: z.coerce.number().min(0, t('plans.edit.form.priceRequired')),
  })

  type FormSchema = z.infer<typeof schema>

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', description: '', price: 0 },
  })

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data?.name || '',
        description: data.data?.description || '',
        price: data.data?.price || 0,
      })
    }
  }, [data, form])

  const onSubmit = async (formData: FormSchema) => {
    try {
      await mutateAsync({ ...formData, id })
      navigate(ADMIN_ROUTES.plans.list)
    } catch (err: unknown) {
      console.error(err)
    }
  }

  const handleCancel = () => {
    navigate(ADMIN_ROUTES.plans.list)
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    handleCancel,
    isLoading: isPending || isLoading,
    error: planError || error,
  }
}
