import type { CategoryResponse } from '../models/response/category'
import type { Category } from '../types/category/category'
import type { CreateCategoryRequest } from '../models/request/createCategoryRequest'
import type { UpdateCategoryRequest } from '../models/request/updateCategoryRequest'
import type { PagedResponse } from '@/core/models/pagedResponse'

export function mapCategoryResponseToCategory(response?: CategoryResponse): Category | undefined {
  if (!response) return undefined
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    isActive: response.isActive,
  }
}

export function mapPagedCategoryResponseToCategories(paged?: PagedResponse<CategoryResponse>) {
  return {
    items: Array.isArray(paged?.data?.items)
      ? (paged.data.items.map(mapCategoryResponseToCategory).filter(Boolean) as Category[])
      : [],
    totalCount: paged?.data?.totalCount ?? 0,
  }
}

export function mapPagedCategoryResponseToActiveCategories(paged?: PagedResponse<CategoryResponse>) {
  return Array.isArray(paged?.data?.items)
    ? (paged.data.items.map(mapCategoryResponseToCategory).filter(Boolean) as Category[])
    : []
}

export function mapCategoryToCreateCategoryRequest(category: Category): CreateCategoryRequest {
  return {
    name: category.name,
    description: category.description,
  }
}

export function mapCategoryToUpdateCategoryRequest(category: Category): UpdateCategoryRequest {
  return {
    id: category.id!,
    name: category.name,
    description: category.description,
  }
} 