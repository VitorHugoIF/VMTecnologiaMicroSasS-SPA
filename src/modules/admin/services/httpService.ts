import { http } from "@/services/http";
import type { RoleResponse } from "../models";
import type { ApiResponse } from "@/core/models/apiResponse";
import type { PagedResponse } from "@/core/models/pagedResponse";
import type { CreateRoleDto } from '../models/request/CreateRoleDto';
import type { UpdateRoleDto } from '../models/request/UpdateRoleDto';

const prefix ='api/admin'

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

    return await http.get<PagedResponse<RoleResponse>>(
        `${prefix}/role?${params.toString()}`
    );
}

export async function getRole(id: string) {
    return await http.get<ApiResponse<RoleResponse>>(`${prefix}/role/${id}`)
}

export async function createRole(data: CreateRoleDto) {
    return await http.post<ApiResponse<RoleResponse>>(`${prefix}/role`, data);
}

export async function enableRole(id: string) {
    return await http.patch<ApiResponse<RoleResponse>>(`${prefix}/role/${id}/enable`);
}

export async function disableRole(id: string) {
    return await http.patch<ApiResponse<RoleResponse>>(`${prefix}/role/${id}/disable`);
}

export async function updateRole(id: string, data: UpdateRoleDto) {
    return await http.put<ApiResponse<RoleResponse>>(`${prefix}/role/${id}`, data);
}