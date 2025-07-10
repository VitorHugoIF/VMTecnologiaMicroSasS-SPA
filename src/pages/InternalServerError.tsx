import { Button } from '@/components'
import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/core'
import { useEffect } from 'react'

export function InternalServerError() {
  const { t } = useTranslation()
  const { logout } = useAuth()
  useEffect(() => { logout() }, [logout])
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background text-center px-4">
      <span className="mb-4 rounded-full bg-destructive/10 p-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
      </span>
      <h1 className="text-3xl font-bold mb-2">{t('internal_server_error.title')}</h1>
      <h2 className="text-lg font-semibold mb-2 text-destructive">
        {t('internal_server_error.subtitle')}
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        {t('internal_server_error.description')}
      </p>
      <Link to="/">
        <Button className="px-6 py-2 text-xs font-semibold uppercase tracking-wider">
          {t('internal_server_error.go_home')}
        </Button>
      </Link>
    </div>
  )
}
