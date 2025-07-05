import {
  Select as ShadSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LoadingSpinner } from './LoadingSpinner'
import { useTranslation } from 'react-i18next'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps {
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  label?: string
  disabled?: boolean
  loading?: boolean
  error?: string
  className?: string
  size?: 'sm' | 'default'
  required?: boolean
  name?: string
  id?: string
}

export function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Selecione uma opção',
  label,
  disabled = false,
  loading = false,
  error,
  className = '',
  size = 'default',
  required = false,
  name,
  id,
}: SelectProps) {
  const { t } = useTranslation()
  const isDisabled = disabled || loading

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <ShadSelect
        value={value}
        onValueChange={onValueChange}
        disabled={isDisabled}
        name={name}
      >
        <SelectTrigger 
          id={id}
          size={size}
          className={`w-full ${error ? 'border-red-500 focus-visible:ring-red-500/50' : ''}`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner size={16} />
              <span className="text-muted-foreground">{t('common.loading')}</span>
            </div>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </ShadSelect>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )
} 