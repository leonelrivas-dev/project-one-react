import { Calendar, Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

interface EmptyEventsProps {
  onCreate: () => void;
}

export function EmptyEvents({ onCreate }: EmptyEventsProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#dfe1ef] bg-white px-6 py-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-2xl bg-[#5428e5]/10 text-[#5428e5]">
        <Calendar />
      </div>

      <h2 className="mt-5 text-lg font-bold text-[#11175f]">
        Aún no tienes eventos
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-[#8589a8]">
        Crea tu primer evento para comenzar a gestionar tus invitaciones.
      </p>

      <Button
        variant="primary"
        onPress={onCreate}
        className="mt-6 rounded-xl bg-linear-to-r from-[#5428e5] to-[#d11bb5] font-semibold text-white"
      >
        <Plus />
        Crear evento
      </Button>
    </div>
  );
}
