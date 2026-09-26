import type { Event } from "@/features/events/types/event.types";
import { Calendar, Clock, Ellipsis, LocationArrow } from "@gravity-ui/icons";
import { Button, Menu, Popover } from "@heroui/react";

interface EventCardProps {
  event: Event;
  onEdit: (event: Event) => void;
  onDelete: (event: Event) => void;
}

export function EventCard({ event, onEdit, onDelete }: EventCardProps) {
  const date = new Date(event.eventDate);

  const formattedDate = date.toLocaleDateString("es-SV", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="rounded-2xl border border-[#e9e9f2] bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#5428e5]/10 text-[#5428e5]">
            <Calendar />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-bold text-[#11175f]">
              {event.name}
            </h2>

            <p className="mt-0.5 truncate text-xs text-[#9a9db5]">
              /{event.slug}
            </p>
          </div>
        </div>

        <Popover>
          <Button
            isIconOnly
            variant="ghost"
            size="sm"
            aria-label={`Opciones de ${event.name}`}
          >
            <Ellipsis />
          </Button>

          <Popover.Content>
            <Menu
              onAction={(key) => {
                if (key === "edit") onEdit(event);
                if (key === "delete") onDelete(event);
              }}
            >
              <Menu.Item id="edit">Editar</Menu.Item>
              <Menu.Item id="delete">Eliminar</Menu.Item>
            </Menu>
          </Popover.Content>
        </Popover>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 text-sm text-[#8589a8]">
          <Calendar className="size-4 shrink-0" />
          <span className="capitalize">{formattedDate}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-[#8589a8]">
          <Clock className="size-4 shrink-0" />
          <span className="capitalize">{event.eventTime}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-[#8589a8]">
          <LocationArrow className="size-4 shrink-0" />
          <span className="capitalize">{event.venue}</span>
        </div>
      </div>
    </article>
  );
}
