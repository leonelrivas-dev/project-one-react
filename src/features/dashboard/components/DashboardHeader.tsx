import { Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-[#8589a8]">Resumen</p>

        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#11175f]">
          Buenos días 👋
        </h1>

        <p className="mt-2 text-sm text-[#8589a8]">
          Aquí tienes un resumen de tus eventos e invitaciones.
        </p>
      </div>

      <Button
        variant="primary"
        className="h-11 rounded-xl bg-linear-to-r from-[#5428e5] to-[#d11bb5] px-5 font-semibold text-white shadow-md shadow-purple-500/20"
      >
        <Plus />
      </Button>
    </div>
  );
}
