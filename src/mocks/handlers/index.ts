import { passthrough, http } from 'msw'
import { planHandlers } from './planHandlers'
import { roleHandlers } from './roleHandlers'
import { tenantHandlers } from './tenantHandlers'
import { userHandlers } from './userHandlers'
import { brandHandlers } from './brandHandlers'
import { categoryHandlers } from './categoryHandlers'

export const handlers = [
  http.post('https://dev-dcferrbwyh2r1nn5.us.auth0.com/oauth/token', passthrough),
  ...planHandlers,
  ...roleHandlers,
  ...tenantHandlers,
  ...userHandlers,
  ...brandHandlers,
  ...categoryHandlers,
]
