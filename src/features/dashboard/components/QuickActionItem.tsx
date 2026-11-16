import type React from "react";
import { Link } from "react-router-dom";

interface QuickActionItemProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconClassName: string;
}

export function QuickActionItem({
  href,
  title,
  description,
  icon,
  iconClassName,
}: QuickActionItemProps) {
  return (
    <Link
      to={href}
      className="flex items-center gap-4 rounded-xl border border-[#e9e9f2] p-4 transition-all hover:border-[#5428e5]/30 hover:bg-[#5428e5]/5"
    >
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${iconClassName}`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-bold text-[#11175f]">{title}</p>
        <p className="mt-0.5 text-xs text-[#8589a8]">{description}</p>
      </div>
    </Link>
  );
}
