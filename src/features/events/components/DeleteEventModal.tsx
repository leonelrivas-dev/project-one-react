import type { Event } from "@/features/events/types/event.types";
import { Button, Modal } from "@heroui/react";

interface DeleteEventModalProps {
  event: Event | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export function DeleteEventModal({
  event,
  isOpen,
  onOpenChange,
  onConfirm,
  isDeleting,
}: DeleteEventModalProps) {
  if (!event) {
    return null;
  }

  return (
    <Modal>
      <Modal.Backdrop
        variant="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <Modal.Container placement="center" size="sm">
          <Modal.Dialog>
            {({ close }) => (
              <>
                <Modal.Header>
                  <div>
                    <Modal.Heading className="text-xl font-extrabold text-[#11175f]">
                      ¿Eliminar evento?
                    </Modal.Heading>

                    <p className="mt-1 text-sm text-[#8589a8]">
                      Estás a punto de eliminar{" "}
                      <span className="font-semibold text-[#11175f]">
                        {event.name}
                      </span>
                      .
                    </p>
                  </div>
                </Modal.Header>

                <Modal.Body>
                  <p className="text-sm leading-6 text-[#8589a8]">
                    Esta acción no se puede deshacer. Si el evento tiene
                    invitaciones asociadas, no podrá eliminarse.
                  </p>
                </Modal.Body>

                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onPress={close}
                    isDisabled={isDeleting}
                  >
                    Cancelar
                  </Button>

                  <Button
                    variant="danger"
                    onPress={() => void onConfirm()}
                    isDisabled={isDeleting}
                  >
                    {isDeleting ? "Eliminando..." : "Eliminar"}
                  </Button>
                </Modal.Footer>
              </>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
