interface UpcomingEventItemProps {
  month: string;
  day: string;
  name: string;
  date: string;
  guests: number;
  accentClassName: string;
}

export function UpcomingEventItem({
  month,
  day,
  name,
  date,
  guests,
  accentClassName,
}: UpcomingEventItemProps) {
  return (
    <div className="flex items-center gap-4 px-6 py-5">
      <div
        className={`flex size-12 shrink-0 flex-col items-center justify-center rounded-xl ${accentClassName}`}
      >
        <span className="text-xs font-bold uppercase">{month}</span>
        <span className="text-lg font-extrabold leading-none">{day}</span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold text-[#11175f]">{name}</h3>

        <p className="mt-1 text-sm text-[#8589a8]">{date}</p>
      </div>

      <div className="hidden text-right sm:block">
        <p className="text-sm font-bold text-[#11175f]">{guests}</p>
        <p className="text-sm text-[#9a9db5]">Invitados</p>
      </div>
    </div>
  );
}
