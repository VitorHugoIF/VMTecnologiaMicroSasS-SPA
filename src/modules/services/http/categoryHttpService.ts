import type { PagedResponse } from "@/core/models/pagedResponse";
import type { CategoryResponse } from "@/modules/stock/models/response/category";
import type { CreateCategoryRequest } from "@/modules/stock/models/request/createCategoryRequest";
import type { UpdateCategoryRequest } from "@/modules/stock/models/request/updateCategoryRequest";
import { http } from "@/services/http";
import type { ApiResponse } from "@/core/models/apiResponse";

const prefix = 'api/stock/category';

export async function getCategories(
    page: number = 1,
    pageSize: number = 10,
    order?: number,
    sort?: string,
    search?: string,
) {
    const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        active: String(true)
    });
    if (order !== undefined) params.append('order', String(order));
    if (sort) params.append('sort', sort);
    if (search) params.append('search', search);

    const { data } = await http.get<PagedResponse<CategoryResponse>>(`${prefix}?${params.toString()}`);
    return data;
}

export async function getCategory(id: string) {
    const { data } = await http.get<ApiResponse<CategoryResponse>>(`${prefix}/${id}`);
    return data;
}

export async function createCategory(request: CreateCategoryRequest) {
    const { data } = await http.post<ApiResponse<CategoryResponse>>(`${prefix}`, request);
    return data;
}

export async function updateCategory(request: UpdateCategoryRequest) {
    const { data } = await http.put<ApiResponse<CategoryResponse>>(`${prefix}/${request.id}`, request);
    return data;
}

export async function disableCategory(id: string) {
  const { data } = await http.delete(`${prefix}/${id}/deactivate`)
  return data
} 