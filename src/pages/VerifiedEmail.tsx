import { Button } from '@/components'
import { MailCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export function VerifiedEmail() {
  const { t } = useTranslation()
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background text-center px-4">
      <span className="mb-4 rounded-full bg-primary/10 p-4">
        <MailCheck className="h-12 w-12 text-primary" />
      </span>
      <h1 className="text-3xl font-bold mb-2">{t('verified_email.title')}</h1>
      <h2 className="text-lg font-semibold mb-2 text-primary">{t('verified_email.subtitle')}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{t('verified_email.description')}</p>
      <Link to="/">
        <Button className="px-6 py-2 text-xs font-semibold uppercase tracking-wider">
          {t('not_found.go_home')}
        </Button>
      </Link>
    </div>
  )
}
