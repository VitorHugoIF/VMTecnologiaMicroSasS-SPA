import { Button, Input, Label, ProgressBar } from '@/components'
import { Eye, EyeOff } from 'lucide-react'
import { useLogin } from './useLogin'
import { useTranslation } from 'react-i18next'

export function LoginPage() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    loading,
    showPassword,
    setShowPassword,
    handleLocalLogin,
    handleAuth0Login,
    loadingLogin,
  } = useLogin()
  const { t } = useTranslation()

  if (loading) return <ProgressBar />

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
      <div className="hidden md:flex order-1 h-screen w-full md:w-1/2 items-center justify-center bg-gradient-to-br from-primary to-accent"></div>
      <div className="order-2 flex flex-col justify-center items-center w-full md:w-1/2 px-4 py-8 md:py-0 min-h-screen md:min-h-0">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-primary" />
            </div>
          </div>
          <div className="shadow-none border-none bg-card rounded-xl">
            <div className="px-8 pt-8">
              <div className="text-3xl mb-2 font-bold text-foreground">{t('login.welcome')}</div>
            </div>
            <div className="px-8 pb-8">
              <form onSubmit={handleLocalLogin} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="username" className="text-sm font-medium text-foreground">
                    {t('login.username')}
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 relative">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">
                    {t('login.password')}
                  </Label>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-2 top-8 text-primary focus:outline-none p-1"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex items-center justify-end mt-2">
                  <Button type="submit" loading={loadingLogin} className="w-full">
                    {t('login.signIn')}
                  </Button>
                </div>
              </form>
              <div className="mt-4">
                <Button
                  onClick={handleAuth0Login}
                  loading={loadingLogin}
                  variant="secondary"
                  className="w-full"
                >
                  {t('login.auth0')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
