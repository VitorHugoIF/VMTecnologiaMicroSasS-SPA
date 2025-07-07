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

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps {
  options: SelectOption[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
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
  multiple?: boolean
}

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({
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
    multiple = false,
    ...rest
  }, ref) => {
    const { t } = useTranslation()
    const isDisabled = disabled || loading

    const isMulti = !!multiple
    const selectedValues = isMulti ? (Array.isArray(value) ? value : []) : value

    const handleChange = (optionValue: string) => {
      if (!isMulti) {
        onValueChange?.(optionValue)
      } else {
        let newValues = Array.isArray(selectedValues) ? [...selectedValues] : []
        if (newValues.includes(optionValue)) {
          newValues = newValues.filter(v => v !== optionValue)
        } else {
          newValues.push(optionValue)
        }
        onValueChange?.(newValues)
      }
    }

    return (
      <div className={`w-full ${className}`}>
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
          value={isMulti ? undefined : (selectedValues as string)}
          onValueChange={isMulti ? undefined : onValueChange as (value: string) => void}
          disabled={isDisabled}
          name={name}
          {...rest}
        >
          <SelectTrigger 
            id={id}
            size={size}
            className={`w-full ${error ? 'border-red-500 focus-visible:ring-red-500/50' : ''}`}
            ref={ref}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner size={16} />
                <span className="text-muted-foreground">{t('common.loading')}</span>
              </div>
            ) : (
              isMulti ? (
                <span>
                  {Array.isArray(selectedValues) && selectedValues.length > 0
                    ? options.filter(opt => selectedValues.includes(opt.value)).map(opt => opt.label).join(', ')
                    : placeholder}
                </span>
              ) : (
                <SelectValue placeholder={placeholder} />
              )
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  onClick={isMulti ? (e) => {
                    e.preventDefault();
                    handleChange(option.value);
                  } : undefined}
                >
                  {isMulti ? (
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={Array.isArray(selectedValues) && selectedValues.includes(option.value)}
                        readOnly
                        className="accent-primary"
                      />
                      {option.label}
                    </span>
                  ) : (
                    option.label
                  )}
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
)

Select.displayName = 'Select' 