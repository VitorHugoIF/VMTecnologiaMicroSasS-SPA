import {
  getUsers,
  getUser,
  createUser,
  enableUser,
  disableUser,
  updateUser,
  getActiveRoles
} from './userHttpService'

import {
  getTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant,
  enableTenant,
  disableTenant,
} from './tenantHttpService'

import {
  getRoles,
  getRole,
  createRole,
  enableRole,
  disableRole,
  updateRole,
} from './roleHttpService'

import {
  getPlans,
  getActivePlans,
  getPlan,
  createPlan,
  enablePlan,
  disablePlan,
  updatePlan,
} from './planHttpService'

export const UserHttpService = {
  getUsers,
  getUser,
  createUser,
  enableUser,
  disableUser,
  updateUser,
  getActiveRoles,
}

export const TenantHttpService = {
  getTenants,
  getTenant,
  createTenant,
  updateTenant,
  deleteTenant,
  enableTenant,
  disableTenant,
}

export const RoleHttpService = {
  getRoles,
  getRole,
  createRole,
  enableRole,
  disableRole,
  updateRole,
}

export const PlanHttpService = {
  getPlans,
  getActivePlans,
  getPlan,
  createPlan,
  enablePlan,
  disablePlan,
  updatePlan,
}
