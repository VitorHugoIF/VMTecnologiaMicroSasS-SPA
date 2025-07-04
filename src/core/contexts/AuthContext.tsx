import { createContext } from 'react'
import type { RedirectLoginOptions } from '@auth0/auth0-react'

export interface AuthUser {
  method: 'idp' | 'local'
  email?: string
  name?: string
  sub?: string
  accessToken?: string
  avatar?: string
}

interface AuthContextType {
  user: AuthUser | null
  login: (user: AuthUser) => void
  logout: () => void
  setLoading: (isLoading: boolean) => void,
  isLoading: boolean,
  isAuthenticated: boolean,
  loginWithAuth0: (params?: RedirectLoginOptions) => void,
  error: Error | null | undefined
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: false,
  setLoading: () => {},
  isAuthenticated: false,
  loginWithAuth0: () => {},
  error: null
}) 