import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCreateCategory } from '@/modules/stock/hooks'
import { mapCategoryToCreateCategoryRequest } from '@/modules/stock/mappers'
import type { Category } from '@/modules/stock/types'

export function useCreateCategoryPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mutateAsync, isPending, error } = useCreateCategory()

  const schema = z.object({
    name: z.string().min(1, t('categories.list.table.column_name')),
    description: z.string().min(1, t('categories.list.table.column_description')),
  })
  type FormSchema = z.infer<typeof schema>

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', description: '' },
  })

  const onSubmit = async (formData: FormSchema) => {
    const category: Category = { name: formData.name, description: formData.description }
    const request = mapCategoryToCreateCategoryRequest(category)
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