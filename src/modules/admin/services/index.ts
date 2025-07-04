import { getRole, getRoles, updateRole } from "./roleHttpService";
import { getPlan, getPlans, updatePlan } from "./planHttpService";

export const roleHttpService = {
    getRole: getRole,
    getRoles: getRoles,
    updateRole: updateRole,
}

export const planHttpService = {
    getPlan: getPlan,
    getPlans: getPlans,
    updatePlan: updatePlan,
}