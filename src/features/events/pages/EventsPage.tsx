import { useEffect, useState } from "react";

import { eventsApi } from "@/features/events/api/events.api";
import { CreateEventModal } from "@/features/events/components/CreateEventModal";
import { EditEventModal } from "@/features/events/components/EditEventModal";
import { EventsHeader } from "@/features/events/components/EventsHeader";
import { EventsList } from "@/features/events/components/EventsList";
import type {
  CreateEventRequest,
  Event,
} from "@/features/events/types/event.types";
import { DeleteEventModal } from "@/features/events/components/DeleteEventModal";

const PAGE_SIZE = 9;

export function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Crear evento
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Editar evento
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Eliminar evento
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchEvents = async (currentPage: number) => {
    try {
      setIsLoading(true);

      const result = await eventsApi.getAll({
        page: currentPage,
        limit: PAGE_SIZE,
      });

      setEvents(result.items);
      setTotal(result.total);
      setError(null);
    } catch {
      setError("No fue posible cargar los eventos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadEvents = async () => {
      try {
        setIsLoading(true);

        const result = await eventsApi.getAll({
          page,
          limit: PAGE_SIZE,
        });

        if (cancelled) {
          return;
        }

        setEvents(result.items);
        setTotal(result.total);
        setError(null);
      } catch {
        if (cancelled) {
          return;
        }

        setError("No fue posible cargar los eventos.");
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadEvents();

    return () => {
      cancelled = true;
    };
  }, [page]);

  //* -------------------------
  //* Crear
  //* -------------------------

  const handleCreate = () => {
    setIsCreateModalOpen(true);
  };

  const handleCreateSubmit = async (data: CreateEventRequest) => {
    try {
      setIsCreating(true);
      setError(null);

      await eventsApi.create(data);

      setIsCreateModalOpen(false);

      if (page === 1) {
        await fetchEvents(1);
      } else {
        setPage(1);
      }
    } catch {
      setError("No fue posible crear el evento.");
    } finally {
      setIsCreating(false);
    }
  };

  //* -------------------------
  //* Editar
  //* -------------------------

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
  };

  const handleEditSubmit = async (data: CreateEventRequest) => {
    if (!editingEvent) {
      return;
    }

    try {
      setIsEditing(true);
      setError(null);

      await eventsApi.update(editingEvent.id, {
        name: data.name,
        eventDate: data.eventDate,
        eventTime: data.eventTime,
        venue: data.venue,
      });

      setEditingEvent(null);

      await fetchEvents(page);
    } catch {
      setError("No fue posible actualizar el evento.");
    } finally {
      setIsEditing(false);
    }
  };

  //* -------------------------
  //* Editar
  //* -------------------------
  const handleDelete = (event: Event) => {
    setDeletingEvent(event);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingEvent) return;

    try {
      setIsDeleting(true);
      setError(null);

      await eventsApi.delete(deletingEvent.id);

      setDeletingEvent(null);

      await fetchEvents(page);
    } catch {
      setError("No fue posible eliminar el evento.");
    } finally {
      setIsDeleting(false);
    }
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <EventsHeader onCreate={handleCreate} />

      <div className="mt-8">
        {isLoading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-56 animate-pulse rounded-2xl bg-white"
              />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-danger/20 bg-danger/5 p-6 text-sm text-danger">
            {error}
          </div>
        ) : (
          <EventsList
            events={events}
            onCreate={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {!isLoading && !error && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
            className="rounded-xl border border-[#e9e9f2] bg-white px-4 py-2 text-sm font-semibold text-[#5428e5] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Anterior
          </button>

          <span className="px-3 text-sm font-medium text-[#8589a8]">
            {page} de {totalPages}
          </span>

          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((current) => current + 1)}
            className="rounded-xl border border-[#e9e9f2] bg-white px-4 py-2 text-sm font-semibold text-[#5428e5] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Crear evento */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreateSubmit}
        isSubmitting={isCreating}
      />

      {/* Editar evento */}
      <EditEventModal
        event={editingEvent}
        isOpen={editingEvent !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setEditingEvent(null);
          }
        }}
        onSubmit={handleEditSubmit}
        isSubmitting={isEditing}
      />

      {/* Eliminar evento */}
      <DeleteEventModal
        event={deletingEvent}
        isOpen={deletingEvent !== null}
        onOpenChange={(isOpen) => {
          if (!isOpen) setDeletingEvent(null);
        }}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />
    </div>
  );
}
