import { MoreVertical, Eye, Pencil } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { useTranslation } from 'react-i18next'

interface TableActionsProps<T = any> {
  row: T;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
}

export function TableActions<T = any>({ row, onView, onEdit }: TableActionsProps<T>) {
  const { t } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition" aria-label="Ações">
          <MoreVertical className="size-5 text-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-popover text-foreground">
        {onView && (
          <DropdownMenuItem onClick={() => onView(row)}>
            <Eye className="size-4 mr-2 text-foreground" /> {t('table.table_tooltip_view')}
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(row)}>
            <Pencil className="size-4 mr-2 text-foreground" /> {t('table.table_tooltip_edit')}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 