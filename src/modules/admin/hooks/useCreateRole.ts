import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole } from "../services/httpService";
import type { CreateRoleDto } from "../models";

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleDto) => createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetRoles'] });
    },
  });
} 