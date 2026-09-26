import { EventForm } from "@/features/events/components/EventForm";
import type { CreateEventRequest } from "@/features/events/types/event.types";
import { Modal } from "@heroui/react";

interface CreateEventModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSubmit: (data: CreateEventRequest) => Promise<void>;
  isSubmitting: boolean;
}

export function CreateEventModal({
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: CreateEventModalProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Backdrop variant="blur">
        <Modal.Container placement="center" size="lg">
          <Modal.Dialog>
            {({ close }) => (
              <>
                <Modal.Header>
                  <div>
                    <Modal.Heading className="text-2xl font-extrabold tracking-tight text-[#11175f]">
                      Crear evento
                    </Modal.Heading>

                    <p className="mt-1 text-sm text-[#8589a8]">
                      Completa la informacion de tu nuevo evento
                    </p>
                  </div>
                </Modal.Header>

                <Modal.Body>
                  <EventForm
                    onSubmit={onSubmit}
                    onCancel={close}
                    isSubmitting={isSubmitting}
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
