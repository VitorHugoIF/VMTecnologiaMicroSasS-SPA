import { useQuery } from "@tanstack/react-query";
import { planHttpService } from "../../services";
import { QueryTimeConfig } from "@/config/queryTimeConfig";

export function useGetPlans(page: number, pageSize: number, order?: number, sort?: string, search?: string) {
    return useQuery({
        queryKey: ['useGetPlans', page, pageSize, order, sort, search],
        queryFn: () => planHttpService.getPlans(page, pageSize, order, sort, search),
        staleTime: QueryTimeConfig.plans.staleTime,
    });
} 