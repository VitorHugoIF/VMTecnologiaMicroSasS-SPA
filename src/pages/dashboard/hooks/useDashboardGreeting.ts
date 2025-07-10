import { useAuth } from "@/core/hooks";
import { useTranslation } from "react-i18next";

export function useDashboardGreeting() {
    const { user } = useAuth();
    const { t, i18n } = useTranslation();
    const nome = user?.name || t('dashboard.user_default_name');
    const hoje = new Date().toLocaleDateString(i18n.language, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return {
        nome,
        hoje: hoje.charAt(0).toUpperCase() + hoje.slice(1),
        t,
    };
} 