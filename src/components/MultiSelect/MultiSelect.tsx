import * as React from 'react'
import { Check, ChevronsUpDown, X } from 'lucide-react'
import { Command, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button, Label, LoadingSpinner } from '@/components'
import { cn } from '@/lib/utils'
import './MultiSelect.css'

export interface MultiSelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
}

interface MultiSelectProps<T = string> {
  options: MultiSelectOption<T>[]
  value: MultiSelectOption<T>[]
  onValueChange: (value: MultiSelectOption<T>[]) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  required?: boolean
  className?: string
  id?: string
  loading?: boolean
}

export function MultiSelect<T = string>({
  options,
  value,
  onValueChange,
  label,
  placeholder = 'Selecione...',
  disabled = false,
  error,
  required = false,
  className = '',
  id,
  loading = false,
}: MultiSelectProps<T>) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const isSelected = (option: MultiSelectOption<T>) => value.some((v) => v.value === option.value)

  const selectedOptions = value
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSelect = (option: MultiSelectOption<T>) => {
    if (isSelected(option)) {
      onValueChange(value.filter((v) => v.value !== option.value))
    } else {
      onValueChange([...value, option])
    }
  }

  const handleRemove = (option: MultiSelectOption<T>) => {
    onValueChange(value.filter((v) => v.value !== option.value))
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <Label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            role="combobox"
            aria-expanded={open}
            disabled={disabled || loading}
            className={cn(
              'hover:bg-popover w-full justify-between border rounded-md px-2 py-1 text-sm shadow-xs transition-colors outline-none',
              'bg-popover text-popover-foreground',
              error
                ? 'border-destructive dark:border-white/10'
                : 'border-input dark:border-white/10',
              (disabled || loading) && 'opacity-50 cursor-not-allowed',
              'min-h-[2.25rem] h-auto focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring',
            )}
          >
            <div className="flex flex-wrap gap-1 items-center min-h-[1.5rem]">
              {loading && <LoadingSpinner className="w-4 h-4 mr-2" />}
              {selectedOptions.length > 0 ? (
                selectedOptions.map((opt) => (
                  <span
                    key={String(opt.value)}
                    className="flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-1.5 py-1 text-xs font-medium transition-colors"
                  >
                    {opt.label}
                    <span
                      role="button"
                      aria-label="Remover"
                      className="ml-1 hover:text-destructive cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemove(opt)
                      }}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.stopPropagation()
                          handleRemove(opt)
                        }
                      }}
                    >
                      <X className="w-3 h-3" />
                    </span>
                  </span>
                ))
              ) : (
                <span className="text-muted-foreground font-normal">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full min-w-[12rem] p-0 bg-popover text-popover-foreground rounded-md shadow-md border">
          <Command>
            <CommandInput
              placeholder="Buscar..."
              value={search}
              onValueChange={setSearch}
              className="h-9"
              disabled={disabled || loading}
            />
            <CommandList className="max-h-48 overflow-y-auto gap-y-2 flex flex-col p-2">
              {loading ? (
                <LoadingSpinner className="w-4 h-4 mr-2" />
              ) : filteredOptions.length === 0 ? (
                <div className="p-2 text-sm text-muted-foreground">...</div>
              ) : (
                filteredOptions.map((option) => (
                  <CommandItem
                    key={String(option.value)}
                    onSelect={() => handleSelect(option)}
                    disabled={option.disabled}
                    className={cn(
                      'multiselect-primary',
                      option.disabled && 'opacity-50 cursor-not-allowed',
                    )}
                  >
                    <Check
                      className={cn(
                        'h-4 w-4',
                        isSelected(option) ? 'text-inherit opacity-100' : 'opacity-0',
                      )}
                    />
                    <span>{option.label}</span>
                  </CommandItem>
                ))
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
