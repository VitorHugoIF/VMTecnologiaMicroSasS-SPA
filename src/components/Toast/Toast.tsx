import { toast as sonnerToast } from "sonner";
import type { ReactNode } from "react";

// Permite string, ReactNode ou objeto com title/description
export type ToastContent =
  | ReactNode
  | { title?: ReactNode; description?: ReactNode };

function handleToast(
  fn: (msg: ReactNode, options?: any) => void,
  content: ToastContent,
  options: any,
  defaultTitle: string
) {
  if (
    typeof content === 'object' &&
    content !== null &&
    (('title' in content && content.title !== undefined) || ('description' in content && content.description !== undefined))
  ) {
    const { title, description } = content as { title?: ReactNode; description?: ReactNode };
    return fn(title ?? defaultTitle, { ...options, description });
  }
  // Se for objeto vazio, usa o título padrão
  if (typeof content === 'object' && content !== null) {
    return fn(defaultTitle, options);
  }
  return fn(content ?? defaultTitle, options);
}

export const Toast = {
  success: (content: ToastContent, options?: any) => handleToast(sonnerToast.success, content, options, 'Success'),
  error: (content: ToastContent, options?: any) => handleToast(sonnerToast.error, content, options, 'Error'),
  warning: (content: ToastContent, options?: any) => handleToast(sonnerToast.warning, content, options, 'Warning'),
  info: (content: ToastContent, options?: any) => handleToast(sonnerToast.info, content, options, 'Info'),
}; 