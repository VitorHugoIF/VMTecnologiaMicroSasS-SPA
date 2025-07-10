import type { PagedResponse } from "@/core/models/pagedResponse"
import type { ProductResponse } from "@/modules/stock/models"
import { http } from "@/services/http"

const prefix = 'api/stock/product'

export async function getProducts(
    page: number = 1,
    pageSize: number = 10,
    order?: number,
    sort?: string,
    search?: string,
) {
    const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
    })
    if (order !== undefined) params.append('order', String(order))
    if (sort) params.append('sort', sort)
    if (search) params.append('search', search)

    const { data } = await http.get<PagedResponse<ProductResponse>>(`${prefix}?${params.toString()}`)

    return data
}
