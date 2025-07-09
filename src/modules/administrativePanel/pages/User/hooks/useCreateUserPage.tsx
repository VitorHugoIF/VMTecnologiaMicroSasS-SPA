import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCreateUser } from '../../../hooks'
import { useGetActiveRoles } from '../../../hooks/user/useGetActiveRoles'
import { ADMINISTRATIVE_PANEL_ROUTES } from '@/routes/routeRoles'
import { mapUserToCreateUserRequest } from '../../../mappers/userMappers'

export function useCreateUserPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { mutateAsync, isPending, error } = useCreateUser()
  const { data: activeRoles, isLoading: isLoadingRoles } = useGetActiveRoles()

  const schema = z.object({
    name: z.string().min(1, t('users.add.form.nameRequired')),
    password: z.string().min(6, t('users.add.form.passwordRequired')),
    roles: z
      .array(
        z.object({
          label: z.string(),
          value: z.string().uuid(),
          disabled: z.boolean().optional(),
        }),
      )
      .min(1, t('users.add.form.rolesRequired')),
  })

  type FormSchema = z.infer<typeof schema>

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', password: '', roles: [] },
  })

  const onSubmit = async (data: FormSchema) => {
    try {
      await mutateAsync(
        mapUserToCreateUserRequest({
          ...data,
          roles: data.roles.map((r) => r.value),
        }),
      )
      form.reset()
      navigate(ADMINISTRATIVE_PANEL_ROUTES.users.list)
    } catch (err: unknown) {
      console.error(err)
    }
  }

  const handleCancel = () => {
    navigate(ADMINISTRATIVE_PANEL_ROUTES.users.list)
  }

  const roleOptions =
    activeRoles?.map((role) => ({
      value: role.id || '',
      label: role.name || '',
      disabled: false,
    })) || []

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    handleCancel,
    isLoading: isPending,
    isLoadingRoles,
    roleOptions,
    error,
  }
}
