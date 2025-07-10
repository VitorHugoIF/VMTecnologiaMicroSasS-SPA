import { Button, Link } from '@/components'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/core'
import { useEffect } from 'react'

export function Forbidden() {
  const { t } = useTranslation()
  const { logout } = useAuth()
  useEffect(() => { logout() }, [logout])
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background text-center px-4">
      <h1 className="text-7xl font-bold mb-4">{t('forbidden.title')}</h1>
      <h2 className="text-2xl font-semibold mb-2">{t('forbidden.subtitle')}</h2>
      <p className="text-muted-foreground mb-1">{t('forbidden.description')}</p>
      <p className="text-muted-foreground mb-6">{t('forbidden.contact')}</p>
      <Link to="/">
        <Button className="px-6 py-2 text-xs font-semibold uppercase tracking-wider">
          {t('forbidden.go_home')}
        </Button>
      </Link>
    </div>
  )
}
