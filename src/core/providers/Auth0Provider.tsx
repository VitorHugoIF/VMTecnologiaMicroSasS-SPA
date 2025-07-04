import { Auth0Provider as BaseAuth0Provider } from '@auth0/auth0-react'

const domain = import.meta.env.VITE_AUTH0_DOMAIN || ''
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID || ''
const redirectUri = window.location.origin

export function Auth0Provider({ children }: { children: React.ReactNode }) {
  return (
    <BaseAuth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
    >
      {children}
    </BaseAuth0Provider>
  )
}
