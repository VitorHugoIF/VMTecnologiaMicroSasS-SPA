import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isNullOrWhiteSpace = (str?: string | null | undefined): boolean =>
  !str || str.trim().length === 0

export const formatErrors = (errors?: string[] | null): string => {
  if (!errors || !Array.isArray(errors) || errors.length === 0) {
    return ''
  }
  return errors.join(', ')
}
