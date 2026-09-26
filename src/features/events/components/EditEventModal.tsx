import type { Event } from "@/features/events/types/event.types";
import { parseDate, parseTime } from "@internationalized/date";
import { Modal, useOverlayState } from "@heroui/react";

import { EventForm } from "./EventForm";

interface EditEventModalProps {
  event: Event | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: {
    name: string;
    slug: string;
    eventDate: string;
    eventTime: string;
    venue: string;
  }) => Promise<void>;
  isSubmitting: boolean;
}

export function EditEventModal({
  event,
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: EditEventModalProps) {
  const state = useOverlayState({
    isOpen,
    onOpenChange,
  });

  if (!event) {
    return null;
  }

  return (
    <Modal state={state}>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center" size="lg">
          <Modal.Dialog>
            {({ close }) => (
              <>
                <Modal.Header>
                  <div>
                    <Modal.Heading className="text-2xl font-extrabold tracking-tight text-[#11175f]">
                      Editar evento
                    </Modal.Heading>

                    <p className="mt-1 text-sm text-[#8589a8]">
                      Actualiza la información de tu evento.
                    </p>
                  </div>
                </Modal.Header>

                <Modal.Body>
                  <EventForm
                    key={event.id}
                    initialValues={{
                      name: event.name,
                      slug: event.slug,
                      eventDate: parseDate(event.eventDate.slice(0, 10)),
                      eventTime: parseTime(event.eventTime),
                      venue: event.venue,
                    }}
                    onSubmit={onSubmit}
                    onCancel={close}
                    isSubmitting={isSubmitting}
                    submitLabel="Guardar cambios"
                  />
                </Modal.Body>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
