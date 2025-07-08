import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Auth0Provider } from './core/providers/Auth0Provider'
import { ThemeProvider } from '@/core/providers'
import './core/i18n'

if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS === 'true') {
  const { worker } = await import('./mocks/browser')
  await worker.start()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider>
      <ThemeProvider defaultTheme="light">
        <App />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
