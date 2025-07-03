import type { PagedResponse } from "@/core/models/pagedResponse";
import type { ErrorResponse } from "@/core/models/errorResponse";

export function mapApiItemResponse<TApi, TOut>(apiResponse: PagedResponse<TApi> | ErrorResponse | null | undefined, mapFn: (item: TApi) => TOut): TOut | null {
  if (!apiResponse || !('data' in apiResponse) || !apiResponse.data) return null;
  if (Array.isArray((apiResponse as any).data)) return null;
  return mapFn((apiResponse as any).data);
}

export function mapApiPagedResponse<TApi, TOut>(apiResponse: PagedResponse<TApi> | ErrorResponse | null | undefined, mapFn: (item: TApi) => TOut): { items: TOut[]; totalCount: number } {
  if (!apiResponse || !('data' in apiResponse) || !apiResponse.data || !('items' in apiResponse.data)) {
    return {
      items: [],
      totalCount: 0
    };
  }
  const responseData = apiResponse.data;
  const items = (responseData.items || []).map(mapFn);
  return {
    items,
    totalCount: responseData.totalCount || 0
  };
} 