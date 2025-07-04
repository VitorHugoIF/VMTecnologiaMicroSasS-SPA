import { http } from "@/services/http";
import type { RoleResponse } from "../models";
import type { ApiResponse } from "@/core/models/apiResponse";
import type { PagedResponse } from "@/core/models/pagedResponse";
import type { CreateRoleRequest } from '../models/request/createRoleRequest';
import type { UpdateRoleRequest } from '../models/request/updateRoleRequest';

const prefix ='api/admin/role'

export async function getRoles(
    page: number = 1,
    pageSize: number = 10,
    order?: number,
    sort?: string,
    search?: string
) {
    const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
    });
    if (order !== undefined) params.append('order', String(order));
    if (sort) params.append('sort', sort);
    if (search) params.append('search', search);

    const { data } = await http.get<PagedResponse<RoleResponse>>(
        `${prefix}?${params.toString()}`
    );

    return data;
}

export async function getRole(id: string) {
    const { data } = await http.get<ApiResponse<RoleResponse>>(`${prefix}/${id}`);
    return data;
}

export async function createRole(dto: CreateRoleRequest) {
    const { data } =  await http.post<ApiResponse<RoleResponse>>(`${prefix}`, dto);
    return data;
}

export async function enableRole(id: string) {
    const { data } =  await http.patch<ApiResponse<RoleResponse>>(`${prefix}/${id}/enable`);
    return data;
}

export async function disableRole(id: string) {
    const { data } =  await http.patch<ApiResponse<RoleResponse>>(`${prefix}/${id}/disable`);
    return data;
}

export async function updateRole(id: string, dto: UpdateRoleRequest) {
    const { data } =  await http.put<ApiResponse<RoleResponse>>(`${prefix}/${id}`, dto);
    return data;
}