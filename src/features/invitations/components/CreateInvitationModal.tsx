import type { CreateInvitationRequest } from "@/features/invitations/types/invitation.types";
import { createUniqueSlug } from "@/lib/slug";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import { useState } from "react";
import type { FormEvent } from "react";

interface CreateInvitationModalProps {
  eventId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateInvitationRequest) => Promise<void>;
  isSubmitting: boolean;
}

export function CreateInvitationModal({
  eventId,
  isOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
}: CreateInvitationModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", allowedSeats: "1" });

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({
      eventId,
      name: form.name,
      slug: createUniqueSlug(form.name),
      phone: form.phone,
      allowedSeats: Number(form.allowedSeats),
    });
    setForm({ name: "", phone: "", allowedSeats: "1" });
  };

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
                      Nueva invitación
                    </Modal.Heading>
                    <p className="mt-1 text-sm text-[#8589a8]">
                      Agrega un invitado para este evento.
                    </p>
                  </div>
                </Modal.Header>
                <Modal.Body>
                  <form id="create-invitation-form" className="space-y-4" onSubmit={(event) => void submit(event)}>
                    <TextField isRequired>
                      <Label>Nombre del invitado</Label>
                      <Input value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Ej. María García" />
                    </TextField>
                    <TextField isRequired>
                      <Label>Teléfono</Label>
                      <Input value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="Ej. 7000-0000" />
                    </TextField>
                    <TextField isRequired>
                      <Label>Asientos permitidos</Label>
                      <Input type="number" min={1} value={form.allowedSeats} onChange={(event) => update("allowedSeats", event.target.value)} />
                    </TextField>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="tertiary" onPress={close}>Cancelar</Button>
                  <Button form="create-invitation-form" type="submit" isPending={isSubmitting} className="bg-[#5428e5] text-white">
                    Crear invitación
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
