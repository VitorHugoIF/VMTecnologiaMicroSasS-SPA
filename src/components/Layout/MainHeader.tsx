import { LanguageSelector } from './LanguageSelector'
import { Menu, Sun, Moon } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { useTheme } from '@/core/providers'
import { useTranslation } from 'react-i18next'
import { useSidebar } from '@/components/ui/sidebar'

export function MainHeader() {
    const { toggleSidebar } = useSidebar()
    const { theme, setTheme } = useTheme()
    const languages = [
      { code: 'pt-BR', label: 'Português (Brasil)', countryCode: 'BR' },
      { code: 'en-US', label: 'English (US)', countryCode: 'US' },
    ]
    const { t } = useTranslation()

    return (
        <div className="flex items-center justify-between w-full p-2 gap-2">
        <button
          className="p-2 cursor-pointer rounded hover:bg-muted/60 transition-colors text-foreground"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="flex gap-2 ml-auto text-foreground">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-2 rounded hover:bg-muted/60 transition-colors text-foreground"
                aria-label="Alternar tema"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </TooltipTrigger>
            <TooltipContent>{t('settings.toggle_theme')}</TooltipContent>
          </Tooltip>
          <LanguageSelector languages={languages} />
        </div>
      </div>
    )
  } 