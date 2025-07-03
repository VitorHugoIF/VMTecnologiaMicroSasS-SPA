import { Routes, Route, Navigate } from "react-router-dom";
import { ListRolesPage, CreateRolePage, ViewRolePage, EditRolePage } from "../pages";
import { NOT_FOUND_ROUTE } from "@/routes/routeRoles";

export function RoleRoutes() {
  return (
    <Routes>
      <Route path="" element={<ListRolesPage />} />
      <Route path="add" element={<CreateRolePage />} />
      <Route path="view/:id" element={<ViewRolePage />} />
      <Route path="edit/:id" element={<EditRolePage />} />
      <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
    </Routes>
  );
} 