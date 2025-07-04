import CountryFlag from 'react-country-flag'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { useTranslation } from 'react-i18next'

interface Language {
  code: string
  label: string
  countryCode: string
}

interface LanguageSelectorProps {
  languages: Language[]
  onChange?: (code: string) => void
}

export function LanguageSelector({ languages, onChange }: LanguageSelectorProps) {
  const { t, i18n } = useTranslation()
  const selected = languages.find((l) => l.code === i18n.language) || languages[0]
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="p-1 hover:bg-muted/60 transition-colors text-foreground flex items-center justify-center"
              aria-label="Alterar idioma"
            >
              <CountryFlag
                countryCode={selected.countryCode}
                svg
                style={{
                  width: '1.5em',
                  height: '1em',
                  objectFit: 'cover',
                  display: 'inline-block',
                }}
                title={selected.label}
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code)
                  onChange?.(lang.code)
                }}
                className="gap-2"
              >
                <CountryFlag
                  countryCode={lang.countryCode}
                  svg
                  style={{
                    width: '1.5em',
                    height: '1em',
                    objectFit: 'cover',
                    display: 'inline-block',
                  }}
                  title={t(
                    `languages.${lang.code === 'pt-BR' ? 'portuguese_brazil' : 'english_us'}`,
                  )}
                />
                {t(`languages.${lang.code === 'pt-BR' ? 'portuguese_brazil' : 'english_us'}`)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent>{t('settings.change_language')}</TooltipContent>
    </Tooltip>
  )
}
