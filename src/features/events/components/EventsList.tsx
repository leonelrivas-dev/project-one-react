import { EmptyEvents } from "@/features/events/components/EmptyEvents";
import { EventCard } from "@/features/events/components/EventCard";
import type { Event } from "@/features/events/types/event.types";

interface EventsListProps {
  events: Event[];
  onCreate: () => void;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
}

export function EventsList({
  events,
  onCreate,
  onEdit,
  onDelete,
}: EventsListProps) {
  if (events.length === 0) return <EmptyEvents onCreate={onCreate} />;

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
