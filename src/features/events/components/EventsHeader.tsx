import { Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

interface EventsHeaderProps {
  onCreate: () => void;
}

export function EventsHeader({ onCreate }: EventsHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-[#8589a8]">Administración</p>

        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#11175f]">
          Eventos
        </h1>

        <p className="mt-2 text-sm text-[#8589a8]">
          Crea y administra tus eventos.
        </p>
      </div>

      <Button
        variant="primary"
        onPress={onCreate}
        className="h-11 rounded-xl bg-linear-to-r from-[#5428e5] to-[#d11bb5] px-5 font-semibold text-white shadow-md shadow-purple-500/20"
      >
        <Plus />
        Crear evento
      </Button>
    </div>
  );
}
