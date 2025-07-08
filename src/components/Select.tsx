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
import React from 'react'
import { Label } from './Label'
import { cn } from '@/lib/utils'

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
  triggerClassName?: string
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
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
      triggerClassName = '',
      ...rest
    },
    ref,
  ) => {
    const { t } = useTranslation()
    const isDisabled = disabled || loading

    return (
      <div className={cn(`w-full`, className)}>
        {label && (
          <Label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        )}
        <ShadSelect
          value={value}
          onValueChange={onValueChange}
          disabled={isDisabled}
          name={name}
          {...rest}
        >
          <SelectTrigger
            id={id}
            size={size}
            className={cn(`w-full dark:border-white/10`, triggerClassName)}
            ref={ref}
            {...rest}
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
                <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </ShadSelect>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)

Select.displayName = 'Select'
