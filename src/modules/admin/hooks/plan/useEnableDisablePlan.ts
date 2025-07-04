import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enablePlan, disablePlan } from "../../services/planHttpService";
import { ApiError } from "@/core/models/errorResponse";
import { Toast } from "@/components";

export function useEnableDisablePlan() {
  const queryClient = useQueryClient();

  const enableMutation = useMutation({
    mutationFn: (id: string) => enablePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetPlans'] });
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        Toast.error({ title: "Oops!", description: error.response.message }, { id: 'enable-plan-error' });
      } else {
        Toast.error({ title: "Oops!", description: error.message }, { id: 'enable-plan-error' });
      }
    }
  });

  const disableMutation = useMutation({
    mutationFn: (id: string) => disablePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetPlans'] });
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        Toast.error({ title: "Oops!", description: error.response.message }, { id: 'disable-plan-error' });
      } else {
        Toast.error({ title: "Oops!", description: error.message }, { id: 'disable-plan-error' });
      }
    }
  });

  return {
    enablePlan: enableMutation.mutate,
    disablePlan: disableMutation.mutate,
    isEnabling: enableMutation.isPending,
    isDisabling: disableMutation.isPending,
  };
} 