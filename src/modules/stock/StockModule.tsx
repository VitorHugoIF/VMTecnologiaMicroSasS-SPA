import { useInvalidateCache } from "@/hooks"
import { NOT_FOUND_ROUTE } from "@/routes/routeRoles"
import { Navigate, Route, Routes } from "react-router-dom"
import { BrandRoutes, CategoryRoutes, ProductRoutes } from "./routes"

export function StockModule() {
    useInvalidateCache()

  return (
    <Routes>
      <Route path="" element={<Navigate to="product" replace />} />
      <Route path="product/*" element={<ProductRoutes />} />
      <Route path="brand/*" element={<BrandRoutes />} />
      <Route path="category/*" element={<CategoryRoutes />} />
      <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
    </Routes>
  )
}