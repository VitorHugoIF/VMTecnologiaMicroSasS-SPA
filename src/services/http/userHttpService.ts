import type { ApiResponse } from '@/core/models/apiResponse'
import type { UserLoginRequest } from '@/pages/login/models/request'
import type { UserLoginResponse } from '@/pages/login/models/response'
import { http } from '@/services/http'

export async function login(payload: UserLoginRequest) {
  const { data } = await http.post<ApiResponse<UserLoginResponse>>(
    '/api/auth/users/login',
    payload
  )
  return data
} 