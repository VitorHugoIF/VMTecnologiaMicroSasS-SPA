import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCreatePlan } from '../../../hooks'
import { ADMIN_ROUTES } from '@/routes/routeRoles'

export function useCreatePlanPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mutateAsync, isPending, error } = useCreatePlan()

  const schema = z.object({
    name: z.string().min(1, t('plans.add.form.nameRequired')),
    description: z.string().min(1, t('plans.add.form.descriptionRequired')),
    price: z.number().min(0, t('plans.add.form.priceRequired')),
  })

  type FormSchema = z.infer<typeof schema>

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', description: '', price: 0 },
  })

  const onSubmit = async (data: FormSchema) => {
    try {
      await mutateAsync(data)
      form.reset()
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
    isLoading: isPending,
    error,
  }
}
