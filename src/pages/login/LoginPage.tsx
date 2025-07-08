import { Button } from '@/components'
import { Eye, EyeOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/Input'
import { useLogin } from './useLogin'

const loginSchema = z.object({
  username: z.string().min(1, 'Usuário obrigatório'),
  password: z.string().min(1, 'Senha obrigatória'),
})

export function LoginPage() {
  const { t } = useTranslation()
  const { loadingLogin, showPassword, setShowPassword, handleAuth0Login } = useLogin()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  function onSubmit(/* values: z.infer<typeof loginSchema> */) {
    // Aqui você pode chamar sua função de login, ex: handleLocalLogin(values)
    // Se precisar de loading, adicione um estado local
    // handleLocalLogin(values.username, values.password)
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-background">
      <div className="hidden md:flex order-1 h-screen w-full md:w-1/2 items-center justify-center bg-gradient-to-br from-secondary to-primary"></div>
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('login.username')}</FormLabel>
                        <FormControl>
                          <Input
                            className="dark:border-white/10"
                            placeholder={t('login.username')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('login.password')}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              placeholder={t('login.password')}
                              {...field}
                              className="pr-10 dark:border-white/10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword((v) => !v)}
                              className="absolute right-2 top-2 text-primary focus:outline-none p-1"
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex items-center justify-end mt-2">
                    <Button type="submit" className="w-full">
                      {t('login.signIn')}
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="mt-4">
                <Button
                  onClick={handleAuth0Login}
                  loading={loadingLogin}
                  variant="link"
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
