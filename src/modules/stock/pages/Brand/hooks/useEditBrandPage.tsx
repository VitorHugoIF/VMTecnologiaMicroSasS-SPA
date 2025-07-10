import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUpdateBrand, useGetBrand } from '@/modules/stock/hooks'
import { mapBrandToUpdateBrandRequest } from '@/modules/stock/mappers'
import type { Brand } from '@/modules/stock/types'

export function useEditBrandPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { mutateAsync, isPending, error } = useUpdateBrand()
  const { data, isLoading, error: brandError } = useGetBrand(id || '')

  const schema = z.object({
    name: z.string().min(1, t('brands.list.table.column_name')),
    description: z.string().min(1, t('brands.list.table.column_description')),
  })
  type FormSchema = z.infer<typeof schema>

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', description: '' },
  })

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data?.name || '',
        description: data.data?.description || '',
      })
    }
  }, [data, form])

  const onSubmit = async (formData: FormSchema) => {
    try {
      const brand: Brand = { 
        id: id!, 
        name: formData.name, 
        description: formData.description 
      }
      const request = mapBrandToUpdateBrandRequest(brand)
      await mutateAsync(request)
      navigate(-1)
    } catch (err: unknown) {
      console.error(err)
    }
  }

  const handleCancel = () => {
    navigate(-1)
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    handleCancel,
    isLoading: isPending,
    isDataLoading: isLoading,
    error: brandError || error,
  }
} 