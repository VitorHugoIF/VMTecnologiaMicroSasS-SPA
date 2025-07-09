import { useState, useCallback, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import type { RedirectLoginOptions } from '@auth0/auth0-react'
import { KeyStorageConfig } from '@/config/KeyStorageConfig'
import { AuthContext, type AuthUser } from '../contexts/AuthContext'
import { CustomClaims } from '../auth/Roles'
import { jwtDecode } from 'jwt-decode'

function extractRolesFromToken(token?: string): string[] {
  try {
    const decoded = jwtDecode(token ?? '') as Record<string, unknown>
    const rawRoles = decoded[CustomClaims.Roles]
    if (Array.isArray(rawRoles)) {
      return rawRoles as string[]
    } else if (typeof rawRoles === 'string') {
      return [rawRoles]
    }
  } catch {}
  return []
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    isAuthenticated: isAuth0Authenticated,
    user: auth0User,
    isLoading: isAuth0Loading,
    logout: auth0Logout,
    loginWithRedirect,
    getAccessTokenSilently,
    error,
  } = useAuth0()

  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setLoading] = useState(false)

  const handleSaveUser = (user: AuthUser) => {
    const roles = extractRolesFromToken(user.accessToken)
    localStorage.setItem(KeyStorageConfig.user, JSON.stringify({ ...user, roles }))
    setUser({ ...user, roles })
  }

  const handleRemoveUser = () => {
    localStorage.removeItem(KeyStorageConfig.user)
    setUser(null)
  }

  useEffect(() => {
    const savedUser = localStorage.getItem(KeyStorageConfig.user)
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  useEffect(() => {
    async function syncAuth0User() {
      setLoading(true)

      if (!isAuth0Loading && isAuth0Authenticated && auth0User && user == null) {
        const accessToken = await getAccessTokenSilently()
        const roles = extractRolesFromToken(accessToken)
        handleSaveUser({
          method: 'idp',
          email: auth0User.email,
          name: auth0User.name,
          sub: auth0User.sub,
          accessToken,
          avatar: auth0User.picture,
          roles,
        })
      } else if (!isAuth0Loading && !isAuth0Authenticated && user?.method === 'idp') {
        handleRemoveUser()
      } else {
        const savedUser = localStorage.getItem(KeyStorageConfig.user)
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser)
          if (parsedUser['method'] === 'local') handleSaveUser(parsedUser)
        }
      }

      setLoading(false)
    }

    syncAuth0User()
  }, [isAuth0Loading, isAuth0Authenticated, auth0User?.email, getAccessTokenSilently, user?.method])

  const login = useCallback((user: AuthUser) => {
    setLoading(true)
    setUser(user)
    if (user.method === 'local') handleSaveUser(user)
    setLoading(false)
  }, [])

  const logout = useCallback(() => {
    setLoading(true)
    handleRemoveUser()
    if (user?.method === 'idp' && auth0Logout) {
      auth0Logout()
    }
    setLoading(false)
  }, [user, auth0Logout])

  const loginWithAuth0 = useCallback(
    (options?: RedirectLoginOptions) => {
      loginWithRedirect(options)
    },
    [loginWithRedirect],
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading: isLoading || isAuth0Loading,
        setLoading,
        isAuthenticated: !!user,
        loginWithAuth0,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
