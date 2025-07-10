import { LanguageSelector } from './LanguageSelector'
import { Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/core/hooks/useTheme'
import { useSidebar } from '@/components/ui/sidebar'

export function MainHeader() {
  const { toggleSidebar } = useSidebar()
  const { theme, setTheme } = useTheme()
  const languages = [
    { code: 'pt-BR', label: 'Português (Brasil)', countryCode: 'BR' },
    { code: 'en-US', label: 'English (US)', countryCode: 'US' },
  ]
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
        <button
          className="cursor-pointer p-2 rounded hover:bg-muted/60 transition-colors text-foreground"
          aria-label="Alternar tema"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <LanguageSelector languages={languages} />
      </div>
    </div>
  )
}
