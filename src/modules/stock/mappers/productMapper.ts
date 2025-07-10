import type { PagedResponse } from '@/core/models/pagedResponse'
import type { ProductResponse } from '../models';
import type { ProductList } from '../types';

export function mapPagedProductResponseToProducts(
  response?: PagedResponse<ProductResponse>
): { items: ProductList[]; totalCount: number } {
  if (!response || !response.data) return { items: [], totalCount: 0 }
  const items = (response.data.items || []).map((product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    categoryName: product.category?.name,
    bandName: product.band?.name,
    isActive: product.isActive,
  }))
  return { items, totalCount: response.data.totalCount }
}
