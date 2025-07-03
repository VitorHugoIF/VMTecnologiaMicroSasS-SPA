import type { ErrorResponse } from "@/core/models/errorResponse";

export function mapQueryError(error: unknown): string | null {
  if (!error) return null;
  if (typeof error === 'string') return error;
  if (typeof error === 'object' && error !== null) {
    const anyErr = error as any;
    if (anyErr.response && anyErr.response.data) {
      const data = anyErr.response.data;
      if (typeof data === 'string') return data;
      if (typeof data.message === 'string' && !data.errors) return data.message;
      if (data.errors && typeof data.errors === 'object') {
        const allErrors: string[] = [];
        Object.values(data.errors).forEach((errArr) => {
          if (Array.isArray(errArr)) {
            allErrors.push(...errArr.map(String));
          } else if (typeof errArr === 'string') {
            allErrors.push(errArr);
          }
        });
        if (allErrors.length > 0) return allErrors.join('; ');
      }
      if (typeof data.message === 'string') return data.message;
    }
    if (typeof anyErr.message === 'string') return anyErr.message;
  }
  return 'Erro desconhecido';
}

export function mapQueryErrorResponse(error: unknown): ErrorResponse {
  let message = mapQueryError(error) || 'Erro desconhecido';
  return {
    success: false,
    errors: message ? [message] : [],
    message,
  };
} 