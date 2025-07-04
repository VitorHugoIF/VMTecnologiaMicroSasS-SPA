import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roleHttpService } from '../../services';
import type { UpdateRoleDto } from '../../models/request/updateRoleDto';
import { ApiError } from "@/core/models/errorResponse";
import { Toast } from "@/components";

export function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateRoleDto) =>
      roleHttpService.updateRole(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetRole"] });
      queryClient.invalidateQueries({ queryKey: ["useGetRoles"] });
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        Toast.error({ title: "Oops!", description: error.response.message }, { id: 'update-role-error' });
      } else {
        Toast.error({ title: "Oops!", description: error.message }, { id: 'update-role-error' });
      }
    }
  });
} 