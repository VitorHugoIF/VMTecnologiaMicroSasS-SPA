import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUpdateUser, useGetUser } from '../../../hooks'
import { useGetActiveRoles } from '../../../hooks/role/useGetActiveRoles'
import { ADMINISTRATIVE_PANEL_ROUTES } from '@/routes/routeRoles'
import { mapUserResponseToUser } from '../../../mappers/userMappers'

export function useEditUserPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { mutateAsync, isPending, error } = useUpdateUser()
  const { data, isLoading, error: userError } = useGetUser(id || '')
  const { data: activeRoles, isLoading: isLoadingRoles } = useGetActiveRoles()

  const schema = z.object({
    name: z.string().min(1, t('users.edit.form.nameRequired')),
    password: z.string().min(6, t('users.edit.form.passwordRequired')),
    roles: z.array(z.string().uuid()).min(1, t('users.edit.form.rolesRequired')),
    createdAt: z.string().optional(),
  })

  type FormSchema = z.infer<typeof schema>

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', password: '', roles: [], createdAt: '' },
  })

  useEffect(() => {
    if (data?.data) {
      const mapped = mapUserResponseToUser(data.data)
      form.reset({
        name: mapped.name || '',
        password: '',
        roles: mapped.roles?.map(role => role.id ?? '') || [],
        createdAt: mapped.createdAt || '',
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

  const roleOptions = activeRoles?.map(role => ({
    value: role.id || '',
    label: role.name || '',
    disabled: false
  })) || []

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    handleCancel,
    isLoading: isPending,
    isDataLoading: isLoading || isLoadingRoles,
    error: userError || error,
    roleOptions,
  }
} 