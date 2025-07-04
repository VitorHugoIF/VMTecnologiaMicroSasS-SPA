import { getRole, getRoles, updateRole } from './roleHttpService'
import { getPlan, getPlans, updatePlan } from './planHttpService'
import {
  getTenant,
  getTenants,
  createTenant,
  updateTenant,
  deleteTenant,
  enableTenant,
  disableTenant,
} from './tenantHttpService'

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

export const tenantHttpService = {
  getTenant: getTenant,
  getTenants: getTenants,
  createTenant: createTenant,
  updateTenant: updateTenant,
  deleteTenant: deleteTenant,
  enableTenant: enableTenant,
  disableTenant: disableTenant,
}
