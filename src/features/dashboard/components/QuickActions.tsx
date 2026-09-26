import { QuickActionItem } from "@/features/dashboard/components/QuickActionItem";
import { Calendar, Envelope } from "@gravity-ui/icons";

export function QuickActions() {
  return (
    <section className="rounded-2xl border border-[#e9e9f2] bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#11175f]">Acciones rápidas</h2>

      <p className="mt-1 text-sm text-[#8589a8]">
        Gestiona rápidamente tu plataforma.
      </p>

      <div className="mt-6 space-y-3">
        <QuickActionItem
          href="/events"
          title="Gestionar eventos"
          description="Ver y administrar tus eventos"
          icon={<Calendar />}
          iconClassName="bg-[#5428e5]/10 text-[#5428e5]"
        />

        <QuickActionItem
          href="/invitations"
          title="Gestionar invitaciones"
          description="Ver invitados y confirmaciones"
          icon={<Envelope />}
          iconClassName="bg-[#c026a6]/10 text-[#c026a6]"
        />
      </div>

      {/* Confirmaciones */}
      <div className="mt-6 rounded-xl bg-[#f7f7fb] p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[#8589a8]">
            Confirmaciones
          </span>

          <span className="text-sm font-bold text-[#11175f]">75%</span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e6e6ef]">
          <div className="h-full w-3/4 rounded-full bg-linear-to-r from-[#5428e5] to-[#c026a6]" />
        </div>

        <p className="mt-2 text-xs text-[#9a9db5]">
          186 de 248 invitados han confirmado.
        </p>
      </div>
    </section>
  );
}
