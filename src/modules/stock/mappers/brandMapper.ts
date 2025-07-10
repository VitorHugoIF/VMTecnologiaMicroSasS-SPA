import type { BrandResponse } from '../models/response/brand'
import type { Brand } from '../types/brand/brand'
import type { CreateBrandRequest } from '../models/request/createBrandRequest'
import type { UpdateBrandRequest } from '../models/request/updateBrandRequest'
import type { PagedResponse } from '@/core/models/pagedResponse'

export function mapBrandResponseToBrand(response?: BrandResponse): Brand | undefined {
  if (!response) return undefined
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    isActive: response.isActive,
  }
}

export function mapPagedBrandResponseToBrands(paged?: PagedResponse<BrandResponse>) {
  return {
    items: Array.isArray(paged?.data?.items)
      ? (paged.data.items.map(mapBrandResponseToBrand).filter(Boolean) as Brand[])
      : [],
    totalCount: paged?.data?.totalCount ?? 0,
  }
}

export function mapPagedBrandResponseToActiveBrands(paged?: PagedResponse<BrandResponse>) {
  return Array.isArray(paged?.data?.items)
    ? (paged.data.items.map(mapBrandResponseToBrand).filter(Boolean) as Brand[])
    : []
}

export function mapBrandToCreateBrandRequest(brand: Brand): CreateBrandRequest {
  return {
    name: brand.name,
    description: brand.description,
  }
}

export function mapBrandToUpdateBrandRequest(brand: Brand): UpdateBrandRequest {
  return {
    id: brand.id!,
    name: brand.name,
    description: brand.description,
  }
} 