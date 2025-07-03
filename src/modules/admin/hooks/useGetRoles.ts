import { useQuery } from "@tanstack/react-query";
import { roleHttpService } from "../services";
import { QueryTimeConfig } from "@/config/queryTimeConfig";

export function useGetRoles(page: number, pageSize: number, order?: number, sort?: string, search?: string) {
    return useQuery({
        queryKey: ['useGetRoles', page, pageSize, order, sort, search],
        queryFn: () => roleHttpService.getRoles(page, pageSize, order, sort, search),
        staleTime: QueryTimeConfig.roles.staleTime,
    });
}