import { useNavigate } from 'react-router-dom'
import { useGetBrand, useDisableBrand } from '@/modules/stock/hooks'
import { STOCK_ROUTES } from '@/routes/routeRoles'
import { useState } from 'react'
import { mapBrandResponseToBrand } from '@/modules/stock/mappers/brandMapper'
import type { Brand } from '@/modules/stock/types'

export function useViewBrandPage(id: string) {
  const navigate = useNavigate()
  const [isToggling, setIsToggling] = useState(false)

  const { data: axiosData, isLoading, error } = useGetBrand(id)
  const apiData = axiosData?.data
  const brand: Brand | undefined = apiData ? mapBrandResponseToBrand(apiData) : undefined

  const { disable } = useDisableBrand()

  const handleEdit = () => {
    if (brand?.id) {
      navigate(STOCK_ROUTES.brand.edit(brand.id))
    }
  }

  const handleBack = () => {
    navigate(STOCK_ROUTES.brand.list)
  }

  const handleDisable = async () => {
    if (!brand?.id) return
    setIsToggling(true)
    try {
      await disable.mutateAsync(brand.id)
      navigate(STOCK_ROUTES.brand.list)
    } catch (error) {
      console.error(error)
    } finally {
      setIsToggling(false)
    }
  }

  return {
    isLoading,
    brand,
    isToggling,
    handleEdit,
    handleBack,
    handleDisable,
    error,
  }
} 