import { NOT_FOUND_ROUTE } from "@/routes/routeRoles";
import { Navigate, Route, Routes } from "react-router-dom";
import { ListCategoryPage, CreateCategoryPage, EditCategoryPage, ViewCategoryPage } from "../pages/Category";

export function CategoryRoutes() {
    return (
        <Routes>
            <Route path="" element={<ListCategoryPage />} />
            <Route path="add" element={<CreateCategoryPage />} />
            <Route path="edit/:id" element={<EditCategoryPage />} />
            <Route path="view/:id" element={<ViewCategoryPage />} />
            <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
        </Routes>
    );
} 