import {
  getUsers,
  getUser,
  createUser,
  enableUser,
  disableUser,
  updateUser,
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
  getActiveRoles,
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
  getActiveRoles,
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
