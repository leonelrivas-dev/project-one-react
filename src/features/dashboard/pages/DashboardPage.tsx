import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { DashboardStats } from "@/features/dashboard/components/DashboardStats";
import { QuickActions } from "@/features/dashboard/components/QuickActions";
import { UpcomingEvents } from "@/features/dashboard/components/UpcomingEvents";

export function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      {/* Header */}
      <DashboardHeader />

      {/* Estadisticas */}
      <DashboardStats />

      {/* Contenido inferior */}
      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_360px]">
        {/* Próximos eventos */}
        <UpcomingEvents />

        {/* Acciones rápidas */}
        <QuickActions />
      </div>
    </div>
  );
}
