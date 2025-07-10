import { Card } from "@/components";
import { useDashboardGreeting } from "./hooks";
import { Calendar, Bell } from "lucide-react";

export function DashboardPage() {
    const { nome, hoje, t } = useDashboardGreeting();

    return (
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Card
                className="min-h-0 py-6 w-full relative"
                contentClassName="px-6"
                title={t('dashboard.greeting', { name: nome })}
            >
                <div className="cursor-pointer hover:bg-primary/40 transition-colors absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-md bg-primary/10 border border-primary">
                    <Bell className="w-5 h-5 text-primary" />
                    <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-xs font-bold border-2 shadow">4</span>
                </div>
                <span className="text-muted-foreground">{t('dashboard.welcome_message')}</span>
            </Card>
            <Card
                className="min-h-0 py-6 w-full relative"
                contentClassName="px-6"
                title={t('dashboard.today_title')}
            >
                <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-md bg-primary/10 border border-primary">
                    <Calendar className="w-5 h-5 text-primary" />
                </div>
                <span className="text-muted-foreground">{hoje}</span>
            </Card>
        </div>
    );
}