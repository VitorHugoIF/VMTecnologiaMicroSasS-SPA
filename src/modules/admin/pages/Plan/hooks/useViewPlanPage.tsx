import { useNavigate } from 'react-router-dom'
import { useGetPlan, useEnableDisablePlan } from '../../../hooks'
import { mapPlanResponseToPlan } from '../../../mappers/planMappers'
import type { Plan } from '../../../types'
import { ADMIN_ROUTES } from '@/routes/routeRoles'
import { useState } from 'react'

export function useViewPlanPage(id: string) {
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)
  const { data: axiosData, isLoading, error } = useGetPlan(id)
  const { enablePlan, disablePlan, isEnabling, isDisabling } = useEnableDisablePlan()

  const apiData = axiosData?.data
  const plan: Plan | undefined = mapPlanResponseToPlan(apiData)

  const handleEnable = (planId: string) => {
    setIsDeleting(true)
    enablePlan(planId)
    navigate(ADMIN_ROUTES.plans.list)
  }

  const handleDisable = (planId: string) => {
    setIsDeleting(true)
    disablePlan(planId)
    navigate(ADMIN_ROUTES.plans.list)
  }

  return {
    plan,
    isLoading,
    isEnabling,
    isDisabling,
    handleEnable,
    handleDisable,
    error,
    isDeleting,
  }
}
