import type { BrandResponse } from "./brand"
import type { CategoryResponse } from "./category"

export type BarcodeResponse = {
    id?: string
    code?: string
}

export type ProductResponse = {
    id?: string
    name?: string
    description?: string
    sku?: string
    category?: CategoryResponse
    band?: BrandResponse
    isActive?: boolean
    barcodes?: BarcodeResponse[]
}

