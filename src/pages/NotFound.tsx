import { Button, Link } from '@/components'
import { useTranslation } from 'react-i18next'

export function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background text-center px-4">
      <h1 className="text-7xl font-bold mb-4">{t('not_found.title')}</h1>
      <h2 className="text-2xl font-semibold mb-2">{t('not_found.subtitle')}</h2>
      <p className="text-muted-foreground mb-1">{t('not_found.description1')}</p>
      <p className="text-muted-foreground mb-6">{t('not_found.description2')}</p>
      <Link to="/">
        <Button className="px-6 py-2 text-xs font-semibold uppercase tracking-wider">
          {t('not_found.go_home')}
        </Button>
      </Link>
    </div>
  )
}
