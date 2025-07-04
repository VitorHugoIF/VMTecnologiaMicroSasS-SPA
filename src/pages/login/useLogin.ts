import { useState } from 'react'
import { useAuth } from '@/core'
import { useNavigate } from 'react-router-dom'

async function mockLoginApi(username: string, password: string) {
  await new Promise((resolve) => setTimeout(resolve, 600))
  if (username === 'admin' && password === '1234') {
    return {
      method: 'local' as const,
      name: 'Administrador',
      email: 'admin@local.com',
    }
  } else if (username === 'user' && password === '1234') {
    return {
      method: 'local' as const,
      name: 'Usuário',
      email: 'user@local.com',
    }
  } else {
    throw new Error('Usuário ou senha inválidos')
  }
}

export function useLogin() {
  const { login, isLoading, loginWithAuth0, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoadingLogin, setLoadingLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  async function handleLocalLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoadingLogin(true)
    const userObj = await mockLoginApi(username, password)
    login(userObj)
    setLoadingLogin(false)

    navigate('/')
  }

  function handleAuth0Login() {
    loginWithAuth0()
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    loadingLogin: isLoadingLogin,
    loading: isLoading,
    showPassword,
    setShowPassword,
    handleLocalLogin,
    handleAuth0Login,
    isAuthenticated,
  }
}
