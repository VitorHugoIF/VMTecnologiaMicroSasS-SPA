export type PagedResponse<T> = {
  success: boolean;
  data: {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
  };
  errors: string[];
  message: string;
}; 