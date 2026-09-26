import { StatCard } from "@/features/dashboard/components/StatCard";
import { Calendar, Check, Envelope, Person } from "@gravity-ui/icons";

export function DashboardStats() {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Eventos"
        value="12"
        description="Eventos creados"
        icon={<Calendar />}
      />
      <StatCard
        title="Invitaciones"
        value="248"
        description="Invitaciones registradas"
        icon={<Envelope />}
      />
      <StatCard
        title="Confirmados"
        value="186"
        description="Personas confirmadas"
        icon={<Check />}
      />
      <StatCard
        title="Pendientes"
        value="62"
        description="Invitaciones pendientes"
        icon={<Person />}
      />
    </div>
  );
}
