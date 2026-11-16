import { invitationsApi } from "@/features/invitations/api/invitations.api";
import { CreateInvitationModal } from "@/features/invitations/components/CreateInvitationModal";
import type { Invitation } from "@/features/invitations/types/invitation.types";
import { eventsApi } from "@/features/events/api/events.api";
import type { Event } from "@/features/events/types/event.types";
import { Button } from "@heroui/react";
import { ArrowLeft, Mail, Plus, Trash } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export function InvitationsPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!eventId) return;
    try {
      setIsLoading(true);
      const [eventResult, invitationResult] = await Promise.all([
        eventsApi.getById(eventId),
        invitationsApi.getByEvent(eventId),
      ]);
      setEvent(eventResult);
      setInvitations(invitationResult.items);
      setError(null);
    } catch {
      setError("No fue posible cargar las invitaciones de este evento.");
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    void load();
  }, [load]);

  const createInvitation = async (data: Parameters<typeof invitationsApi.create>[0]) => {
    try {
      setIsSubmitting(true);
      await invitationsApi.create(data);
      setIsModalOpen(false);
      await load();
    } catch {
      setError("No fue posible crear la invitación. Verifica que el slug sea único.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteInvitation = async (invitation: Invitation) => {
    if (!window.confirm(`¿Eliminar la invitación de ${invitation.name}?`)) return;
    try {
      await invitationsApi.delete(invitation.id);
      await load();
    } catch {
      setError("No fue posible eliminar la invitación.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link to="/events" className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-[#5428e5]">
            <ArrowLeft className="size-4" /> Volver a eventos
          </Link>
          <p className="text-sm text-[#8a8da8]">Invitaciones del evento</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#11175f]">{event?.name ?? "Invitaciones"}</h1>
        </div>
        <Button onPress={() => setIsModalOpen(true)} className="bg-[#5428e5] text-white"><Plus className="size-4" /> Nueva invitación</Button>
      </div>

      {error && <div className="mt-6 rounded-2xl border border-danger/20 bg-danger/5 p-4 text-sm text-danger">{error}</div>}

      {isLoading ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 3 }).map((_, index) => <div key={index} className="h-48 animate-pulse rounded-2xl bg-white" />)}</div>
      ) : invitations.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-[#dcdced] bg-white p-12 text-center">
          <Mail className="mx-auto size-10 text-[#5428e5]/50" />
          <h2 className="mt-4 text-lg font-bold text-[#11175f]">Aún no hay invitaciones</h2>
          <p className="mt-1 text-sm text-[#8589a8]">Crea la primera invitación para este evento.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {invitations.map((invitation) => (
            <article key={invitation.id} className="rounded-2xl border border-[#e9e9f2] bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#5428e5]/10 text-[#5428e5]"><Mail /></div>
                  <div className="min-w-0"><h2 className="truncate font-bold text-[#11175f]">{invitation.name}</h2><p className="truncate text-xs text-[#9a9db5]">/{invitation.slug}</p></div>
                </div>
                <button type="button" onClick={() => void deleteInvitation(invitation)} className="rounded-lg p-2 text-[#9a9db5] hover:bg-danger/10 hover:text-danger" aria-label={`Eliminar invitación de ${invitation.name}`}><Trash className="size-4" /></button>
              </div>
              <div className="mt-5 space-y-2 text-sm text-[#8589a8]"><p>{invitation.phone}</p><p>{invitation.confirmedSeats} de {invitation.allowedSeats} asientos confirmados</p></div>
              <span className="mt-4 inline-flex rounded-full bg-[#5428e5]/10 px-3 py-1 text-xs font-bold text-[#5428e5]">{invitation.status === "CONFIRMED" ? "Confirmada" : invitation.status === "DECLINED" ? "Rechazada" : "Pendiente"}</span>
            </article>
          ))}
        </div>
      )}

      {eventId && <CreateInvitationModal eventId={eventId} isOpen={isModalOpen} onOpenChange={setIsModalOpen} onSubmit={createInvitation} isSubmitting={isSubmitting} />}
    </div>
  );
}
