import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isNullOrWhiteSpace = (str?: string | null | undefined): boolean =>
  !str || str.trim().length === 0;