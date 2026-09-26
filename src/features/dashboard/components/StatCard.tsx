interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

export function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-[#e9e9f2] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#8589a8]">{title}</p>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-[#11175f]">
            {value}
          </p>
        </div>

        <div className="flex size-11 items-center justify-center rounded-xl bg-[#5428e5]/10 text-[#5428e5]">
          {icon}
        </div>
      </div>

      <p className="mt-4 text-xs font-medium text-[#9a9db5]">{description}</p>
    </div>
  );
}
