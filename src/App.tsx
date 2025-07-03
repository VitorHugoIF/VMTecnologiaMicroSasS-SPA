import './App.css'
import { AuthProvider } from '@/core'
import { AppRouter } from '@/routes/AppRouter'
import { ThemeProvider } from '@/core/providers/ThemeProvider'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: 'flex flex-row items-start gap-3 p-4 rounded-lg w-full max-w-xs sm:min-w-[400px] sm:max-w-md',
              success: 'bg-green-400 text-green-800',
              error: 'bg-red-400 text-red-800',
              warning: 'bg-yellow-400 text-yellow-800',
              info: 'bg-cyan-400 text-cyan-800',
              title: 'font-bold text-base',
              description: 'text-md mt-1 text-base'
            }
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
