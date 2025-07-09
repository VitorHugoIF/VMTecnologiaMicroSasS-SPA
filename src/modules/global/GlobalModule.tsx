import { useInvalidateCache } from "@/hooks"
import { Navigate, Route, Routes } from "react-router-dom"
import { GlobalRoutes } from "./routes"
import { NOT_FOUND_ROUTE } from "@/routes/routeRoles"

export function GlobalModule() {
    useInvalidateCache()
  
    return (
      <Routes>
        <Route path="" element={<GlobalRoutes />} />
        <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
      </Routes>
    )
  }