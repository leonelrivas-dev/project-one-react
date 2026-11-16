import { eventsApi } from "@/features/events/api/events.api";
import type { Event } from "@/features/events/types/event.types";
import { Calendar } from "@gravity-ui/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function InvitationEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const result = await eventsApi.getAll({ page: 1, limit: 100 });
        setEvents(result.items);
      } catch {
        setError("No fue posible cargar tus eventos.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadEvents();
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div>
        <p className="text-sm text-[#8a8da8]">Administración</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#11175f]">Invitaciones</h1>
        <p className="mt-2 text-sm text-[#8589a8]">Selecciona un evento para administrar sus invitados.</p>
      </div>

      {error && <div className="mt-6 rounded-2xl border border-danger/20 bg-danger/5 p-4 text-sm text-danger">{error}</div>}

      {isLoading ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-36 animate-pulse rounded-2xl bg-white" />)}</div>
      ) : events.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-[#dcdced] bg-white p-12 text-center text-sm text-[#8589a8]">Crea un evento para comenzar a gestionar invitaciones.</div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <Link key={event.id} to={`/events/${event.id}/invitations`} className="rounded-2xl border border-[#e9e9f2] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-[#5428e5]/10 text-[#5428e5]"><Calendar /></div>
                <div className="min-w-0"><h2 className="truncate font-bold text-[#11175f]">{event.name}</h2><p className="truncate text-xs text-[#9a9db5]">/{event.slug}</p></div>
              </div>
              <p className="mt-4 text-sm font-semibold text-[#5428e5]">Ver invitaciones →</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
