import { useMutation, useQueryClient } from '@tanstack/react-query';
import { roleHttpService } from '../services';
import type { UpdateRoleDto } from '../models/request/UpdateRoleDto';

export function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateRoleDto) =>
      roleHttpService.updateRole(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetRole"] });
      queryClient.invalidateQueries({ queryKey: ["useGetRoles"] });
    },
  });
} 