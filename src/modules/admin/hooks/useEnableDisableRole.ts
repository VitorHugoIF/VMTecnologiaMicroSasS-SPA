import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enableRole, disableRole } from "../services/httpService";
import { QueryTimeConfig } from "@/config/queryTimeConfig";

export function useEnableDisableRole() {
  const queryClient = useQueryClient();

  const enable = useMutation({
    mutationFn: (id: string) => enableRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetRole"] });
      queryClient.invalidateQueries({ queryKey: ["useGetRoles"] });
    },
  });

  const disable = useMutation({
    mutationFn: (id: string) => disableRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useGetRole"] });
      queryClient.invalidateQueries({ queryKey: ["useGetRoles"] });
    },
  });

  return { enable, disable };
} 