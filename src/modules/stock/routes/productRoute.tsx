import { NOT_FOUND_ROUTE } from "@/routes/routeRoles";
import { Navigate, Route, Routes } from "react-router-dom";
import { ListProductPage } from "../pages";

export function ProductRoutes() {
    return (
        <Routes>
            <Route path="" element={<ListProductPage />} />
            <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
        </Routes>
    )
}