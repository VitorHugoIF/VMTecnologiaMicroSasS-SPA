import { useNavigate, useParams } from 'react-router-dom'
import { useGetUser } from '../../../hooks'
import { ADMINISTRATIVE_PANEL_ROUTES } from '@/routes/routeRoles'
import { useState } from 'react'
import { mapUserResponseToUser } from '../../../mappers'
import type { User } from '../../../types'
import { useEnableDisableUser } from '../../../hooks'

export function useViewUserPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [isDeleting, setIsDeleting] = useState(false)

  const { data: axiosData, isLoading, error } = useGetUser(id || '')

  const apiData = axiosData?.data
  const user: User | undefined = apiData ? mapUserResponseToUser(apiData) : undefined

  const { enableUser, disableUser } = useEnableDisableUser()

  const handleEdit = () => {
    if (user?.id) {
      navigate(ADMINISTRATIVE_PANEL_ROUTES.users.edit(user.id))
    }
  }

  const handleBack = () => {
    navigate(ADMINISTRATIVE_PANEL_ROUTES.users.list)
  }

  const handleToggleActive = async (active: boolean) => {
    if (!user?.id) return
    setIsDeleting(true)
    try {
      if (active) {
        await enableUser(user.id)
      } else {
        await disableUser(user.id)
      }
      navigate(ADMINISTRATIVE_PANEL_ROUTES.users.list)
    } catch (error) {
      console.error(error)
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    isLoading,
    user,
    isDeleting,
    handleEdit,
    handleBack,
    handleToggleActive,
    error,
  }
}
