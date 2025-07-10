import type { PagedResponse } from "@/core/models/pagedResponse";
import type { BrandResponse } from "@/modules/stock/models/response/brand";
import type { CreateBrandRequest } from "@/modules/stock/models/request/createBrandRequest";
import type { UpdateBrandRequest } from "@/modules/stock/models/request/updateBrandRequest";
import { http } from "@/services/http";
import type { ApiResponse } from "@/core/models/apiResponse";

const prefix = 'api/stock/brand';

export async function getBrands(
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

    const { data } = await http.get<PagedResponse<BrandResponse>>(`${prefix}?${params.toString()}`);
    return data;
}

export async function getBrand(id: string) {
    const { data } = await http.get<ApiResponse<BrandResponse>>(`${prefix}/${id}`);
    return data;
}

export async function createBrand(request: CreateBrandRequest) {
    const { data } = await http.post<ApiResponse<BrandResponse>>(`${prefix}`, request);
    return data;
}

export async function updateBrand(request: UpdateBrandRequest) {
    const { data } = await http.put<ApiResponse<BrandResponse>>(`${prefix}/${request.id}`, request);
    return data;
}

export async function disableBrand(id: string) {
  const { data } = await http.delete(`${prefix}/${id}/deactivate`)
  return data
} 