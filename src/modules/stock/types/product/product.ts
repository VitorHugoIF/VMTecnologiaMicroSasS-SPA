import type { Brand } from "../brand/brand"
import type { Category } from "../category/category"

export type ProductList = {
    id?: string
    name?: string
    sku?: string
    categoryName?: string
    bandName?: string
    isActive?: boolean
}

export type Product = {
    id?: string
    name?: string
    description?: string
    sku?: string
    category?: Category
    band?: Brand
    isActive?: boolean
    barcodes?: string[]
}
