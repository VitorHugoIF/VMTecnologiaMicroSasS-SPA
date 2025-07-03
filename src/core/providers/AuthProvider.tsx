import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { KeyStorageConfig } from '@/config/KeyStorageConfig'

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
  loginWithAuth0: (params?: any) => void,
  error: Error | null | undefined
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isLoading: false,
  setLoading: () => {},
  isAuthenticated: false,
  loginWithAuth0: () => {},
  error: null
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const {
    isAuthenticated: isAuth0Authenticated,
    user: auth0User,
    isLoading: isAuth0Loading,
    logout: auth0Logout,
    loginWithRedirect,
    getAccessTokenSilently,
    error
  } = useAuth0(); 

  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setLoading] = useState(false)

  const handleSaveUser = (user: AuthUser) => {
    localStorage.setItem(KeyStorageConfig.user, JSON.stringify(user))
    setUser(user)
  }

  const handleRemoveUser = () => {
    localStorage.removeItem(KeyStorageConfig.user)
    setUser(null)
  }

  useEffect(() => {
    const savedUser = localStorage.getItem(KeyStorageConfig.user)
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }  
  },[])

  useEffect(() => {
    async function syncAuth0User() {
      setLoading(true)

      if (!isAuth0Loading && isAuth0Authenticated && auth0User && user == null) {
        const accessToken = await getAccessTokenSilently();
        
        handleSaveUser({
          method: 'idp',
          email: auth0User.email,
          name: auth0User.name,
          sub: auth0User.sub,
          accessToken,
          avatar: auth0User.picture,
        })
      } else if(!isAuth0Loading && !isAuth0Authenticated && user?.method === 'idp') {
        handleRemoveUser()
      } else {
        const savedUser = localStorage.getItem(KeyStorageConfig.user)
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser['method'] === 'local') handleSaveUser(parsedUser);
        }  
      }

      setLoading(false)      
    }    

    syncAuth0User()
  }, [isAuth0Loading, isAuth0Authenticated])

  const login = useCallback((user: AuthUser) => {
    setLoading(true)
    setUser(user)
    if (user.method === 'local') handleSaveUser(user)
    setLoading(false)
  }, [])

  const logout = useCallback(() => {
    setLoading(true)
    handleRemoveUser();
    if (user?.method === 'idp' && auth0Logout) {
      auth0Logout()
    }
    setLoading(false)
  }, [user])

  const loginWithAuth0 = useCallback((options?: any) => {
    loginWithRedirect(options);
  }, []);


  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading: isLoading || isAuth0Loading, 
      setLoading, 
      isAuthenticated: !!user, 
      loginWithAuth0,
      error
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
} 