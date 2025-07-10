import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCreateBrand } from '@/modules/stock/hooks'
import { mapBrandToCreateBrandRequest } from '@/modules/stock/mappers'
import type { Brand } from '@/modules/stock/types'

export function useCreateBrandPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mutateAsync, isPending, error } = useCreateBrand()

  const schema = z.object({
    name: z.string().min(1, t('brands.list.table.column_name')),
    description: z.string().min(1, t('brands.list.table.column_description')),
  })
  type FormSchema = z.infer<typeof schema>

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', description: '' },
  })

  const onSubmit = async (formData: FormSchema) => {
    const brand: Brand = { name: formData.name, description: formData.description }
    const request = mapBrandToCreateBrandRequest(brand)
    await mutateAsync(request)
    form.reset()
    navigate(-1)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    handleCancel,
    isLoading: isPending,
    error,
  }
} 