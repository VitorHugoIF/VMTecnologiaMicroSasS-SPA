import { MoreVertical, Eye, Pencil } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useTranslation } from 'react-i18next'

interface TableActionsProps<T> {
  row: T
  onView?: (row: T) => void
  onEdit?: (row: T) => void
}

export function TableActions<T>({ row, onView, onEdit }: TableActionsProps<T>) {
  const { t } = useTranslation()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition"
          aria-label="Ações"
        >
          <MoreVertical className="size-5 text-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover text-foreground">
        {onView && (
          <DropdownMenuItem onClick={() => onView(row)} className="hover:!bg-primary hover:!text-primary-foreground focus:!bg-primary focus:!text-primary-foreground">
            <Eye className="size-4 mr-2 text-inherit" /> {t('table.table_tooltip_view')}
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(row)} className="hover:!bg-primary hover:!text-primary-foreground focus:!bg-primary focus:!text-primary-foreground">
            <Pencil className="size-4 mr-2 text-inherit" /> {t('table.table_tooltip_edit')}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
