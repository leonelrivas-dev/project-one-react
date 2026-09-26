import { UpcomingEventItem } from "@/features/dashboard/components/UpcomingEventItem";

export function UpcomingEvents() {
  return (
    <section className="rounded-2xl border border-[#e9e9f2] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#eeeef4] px-6 py-5">
        <div>
          <h2 className="text-lg font-bold text-[#11175f]">Próximos eventos</h2>
          <p className="">Tus eventos más próximos.</p>
        </div>

        <a
          href="/events"
          className="text-sm font-semibold text-[#5428e5] hover:text-[#4320c5]"
        >
          Ver todos
        </a>
      </div>

      <div className="divide-y divide-[#eeeef4]">
        <UpcomingEventItem
          month="Sep"
          day="15"
          name="Boda de Ana & Carlos"
          date="15 de septiembre · 6:00 PM"
          guests={120}
          accentClassName="bg-[#5428e5]/10 text-[#5428e5]"
        />

        <UpcomingEventItem
          month="Sep"
          day="28"
          name="Cumpleaños de María"
          date="28 de septiembre · 7:00 PM"
          guests={45}
          accentClassName="bg-[#c026a6]/10 text-[#c026a6]"
        />

        <UpcomingEventItem
          month="Oct"
          day="04"
          name="Aniversario familiar"
          date="4 de octubre · 5:30 PM"
          guests={83}
          accentClassName="bg-[#24936f]/10 text-[#24936f]"
        />
      </div>
    </section>
  );
}
