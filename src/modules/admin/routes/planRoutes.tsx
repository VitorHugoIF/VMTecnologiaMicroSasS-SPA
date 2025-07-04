import { Routes, Route, Navigate } from "react-router-dom";
import { ListPlansPage, CreatePlanPage, ViewPlanPage, EditPlanPage } from "../pages";
import { NOT_FOUND_ROUTE } from "@/routes/routeRoles";

export function PlanRoutes() {
  return (
    <Routes>
      <Route path="" element={<ListPlansPage />} />
      <Route path="add" element={<CreatePlanPage />} />
      <Route path="view/:id" element={<ViewPlanPage />} />
      <Route path="edit/:id" element={<EditPlanPage />} />
      <Route path="*" element={<Navigate to={NOT_FOUND_ROUTE} />} />
    </Routes>
  );
} 