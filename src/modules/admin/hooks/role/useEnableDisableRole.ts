import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enableRole, disableRole } from "../../services/roleHttpService";
import { ApiError } from "@/core/models/errorResponse";
import { Toast } from "@/components";

export function useEnableDisableRole() {
  const queryClient = useQueryClient();

  const enable = useMutation({
    mutationFn: (id: string) => enableRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetRole"] });
      queryClient.invalidateQueries({ queryKey: ["useGetRoles"] });
    },
    onError:(error) => {
      if (error instanceof ApiError) {
        Toast.error({ title: "Oops!", description: error.response.message }, { id: 'enable-role-error' });
      } else{
        Toast.error({ title: "Oops!", description: error.message }, { id: 'enable-role-error' });
      }
    }
  });

  const disable = useMutation({
    mutationFn: (id: string) => disableRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetRole"] });
      queryClient.invalidateQueries({ queryKey: ["useGetRoles"] });
    },
    onError:(error) => {
      if (error instanceof ApiError) {
        Toast.error({ title: "Oops!", description: error.response.message }, { id: 'disable-role-error' });
      } else{
        Toast.error({ title: "Oops!", description: error.message }, { id: 'disable-role-error' });
      }
    }
  });

  return { enable, disable };
} 