import { useGetPlan, useEnableDisablePlan } from '../../../hooks'
import { mapPlanResponseToPlan } from '../../../mappers/planMappers'
import type { Plan } from '../../../types'

export function useViewPlanPage(id: string) {
  const { data: axiosData, isLoading } = useGetPlan(id)
  const { enablePlan, disablePlan, isEnabling, isDisabling } = useEnableDisablePlan()

  const apiData = axiosData?.data
  const plan: Plan | undefined = mapPlanResponseToPlan(apiData)

  const handleEnable = (planId: string) => {
    enablePlan(planId)
  }

  const handleDisable = (planId: string) => {
    disablePlan(planId)
  }

  return {
    plan,
    isLoading,
    isEnabling,
    isDisabling,
    handleEnable,
    handleDisable,
  }
}
