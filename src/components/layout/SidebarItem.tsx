import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  label: string;
  icon: ReactNode;
}

export function SidebarItem({ to, label, icon }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
          isActive
            ? "bg-white/10 text-white"
            : "text-white/65 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      <span className="flex size-5 items-center justify-center">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
