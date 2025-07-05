export const TenantStatusLabels = {
  '1': 'active',
  '2': 'inactive',
  '3': 'expired',
} as const;

export type TenantStatus = keyof typeof TenantStatusLabels; 