import { useState } from 'react'
import { useAuth } from '@/core'
import { useNavigate } from 'react-router-dom'
import { login as loginRequest } from '@/services/http/userHttpService'
import type { UserLoginRequest } from './models/request'

export function useLogin() {
  const { login, isLoading, loginWithAuth0, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isLoadingLogin, setLoadingLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleLocalLogin({ username, password }: { username: string; password: string }) {
    setLoadingLogin(true)
    try {
      const payload: UserLoginRequest = { name: username, password }
      const response = await loginRequest(payload)
      if (response.success && response.data) {
        const { accessToken } = response.data;
        const userObj = {
          method: 'local' as const,
          name: username,
          accessToken,
        }
        login(userObj)
        navigate('/')
      } else {
        throw new Error(response.message || 'Erro ao fazer login')
      }
    } finally {
      setLoadingLogin(false)
    }
  }

  function handleAuth0Login() {
    loginWithAuth0()
  }

  return {
    loadingLogin: isLoadingLogin,
    loading: isLoading,
    showPassword,
    setShowPassword,
    handleLocalLogin,
    handleAuth0Login,
    isAuthenticated,
  }
}
