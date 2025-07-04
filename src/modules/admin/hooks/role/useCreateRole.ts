import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRole } from "../../services/roleHttpService";
import type { CreateRoleDto } from "../../models";
import { ApiError } from "@/core/models/errorResponse";
import { Toast } from "@/components";

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleDto) => createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetRoles'] });
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        Toast.error({ title: "Oops!", description: error.response.message }, { id: 'create-role-error' });
      } else {
        Toast.error({ title: "Oops!", description: error.message }, { id: 'create-role-error' });
      }
    }
  });
} 