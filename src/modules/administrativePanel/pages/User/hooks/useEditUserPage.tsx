import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUpdateUser, useGetUser } from '../../../hooks'
import { ADMINISTRATIVE_PANEL_ROUTES } from '@/routes/routeRoles'

export function useEditUserPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { mutateAsync, isPending, error } = useUpdateUser()
  const { data, isLoading, error: userError } = useGetUser(id || '')

  const schema = z.object({
    name: z.string().min(1, t('users.edit.form.nameRequired')),
    password: z.string().min(6, t('users.edit.form.passwordRequired')),
  })

  type FormSchema = z.infer<typeof schema>

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', password: '' },
  })

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data?.name || '',
        password: '',
      })
    }
  }, [data, form])

  const onSubmit = async (formData: FormSchema) => {
    try {
      await mutateAsync({ id: id!, data: formData })
      navigate(ADMINISTRATIVE_PANEL_ROUTES.users.list)
    } catch (err: unknown) {
      console.error(err)
    }
  }

  const handleCancel = () => {
    navigate(ADMINISTRATIVE_PANEL_ROUTES.users.list)
  }

  return {
    form,
    onSubmit,
    handleCancel,
    isLoading: isPending,
    isDataLoading: isLoading,
    error: userError || error,
  }
} 