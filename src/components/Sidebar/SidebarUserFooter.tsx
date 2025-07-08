import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { useAuth } from '@/core/hooks/useAuth'
import { useTranslation } from 'react-i18next'

interface SidebarUserFooterProps {
  user: {
    name?: string
    email?: string
    avatar?: string
  }
  open: boolean
}

function getAvatarProps(name?: string, email?: string) {
  const base = (name || email || 'U').trim()
  const letter = base.charAt(0).toUpperCase()
  let hash = 0
  for (let i = 0; i < base.length; i++) {
    hash = base.charCodeAt(i) + ((hash << 5) - hash)
  }
  const color = `hsl(${hash % 360}, 70%, 60%)`
  return { letter, color }
}

export function SidebarUserFooter({ user, open }: SidebarUserFooterProps) {
  const { logout } = useAuth()
  const { t } = useTranslation()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none w-full">
          <div
            className={`flex items-center gap-3 w-full rounded-md transition-colors cursor-pointer${open ? ' px-2 py-1.5' : ''}`}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name || 'Usuário'}
                className={`${open ? 'w-10 h-10' : 'w-8 h-8'} rounded-full object-cover`}
              />
            ) : (
              (() => {
                const { letter, color } = getAvatarProps(user.name, user.email)
                return (
                  <div
                    className={`flex items-center justify-center font-bold uppercase rounded-full ${open ? 'w-10 h-10 text-lg' : 'w-8 h-8 text-base'}`}
                    style={{ userSelect: 'none', background: color, color: '#fff' }}
                  >
                    {letter}
                  </div>
                )
              })()
            )}
            {open && (
              <div className="flex flex-col items-start flex-1 min-w-0">
                <span className="text-sm font-semibold truncate">{user.name || t('user')}</span>
                <span className="text-xs text-muted-foreground truncate">{user.email || ''}</span>
              </div>
            )}
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" sideOffset={24} className={`w-64`}>
        <DropdownMenuItem className="w-full justify-center cursor-pointer hover:!bg-primary hover:!text-primary-foreground focus:!bg-primary focus:!text-primary-foreground" onClick={logout}>
          {t('logout')}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="w-full px-2 py-1.5">
          <div className="text-sm font-semibold truncate">{user.name || t('user')}</div>
          <div className="text-xs text-muted-foreground truncate">{user.email || ''}</div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
