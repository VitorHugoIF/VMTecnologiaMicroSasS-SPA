import { NOT_FOUND_ROUTE } from "@/routes/routeRoles";
import { Navigate, Route, Routes } from "react-router-dom";
import { ListBrandPage, CreateBrandPage, EditBrandPage, ViewBrandPage } from "../pages/Brand";

export function BrandRoutes() {
    return (
        <Routes>
            <Route path="" element={<ListBrandPage />} />
            <Route path="add" element={<CreateBrandPage />} />
            <Route path="edit/:id" element={<EditBrandPage />} />
            <Route path="view/:id" element={<ViewBrandPage />} />
            <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
        </Routes>
    );
} 