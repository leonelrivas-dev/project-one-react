import { SidebarItem } from "@/components/layout/SidebarItem";
import { CalendarSearch, LayoutDashboard, LogOut, Mail } from "lucide-react";

interface SidebarProps {
  onLogout: () => Promise<void>;
}

export function Sidebar({ onLogout }: SidebarProps) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col overflow-y-auto bg-[#11175f] text-white lg:flex">
      {/* Logo */}
      <div className="flex h-24 items-center justify-center px-6">
        <img
          src="/brand/invitame-logo-white-text.png"
          alt="Invíteme"
          className="w-48 object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          <SidebarItem to="/" label="Dashboard" icon={<LayoutDashboard />} />
          <SidebarItem to="/events" label="Eventos" icon={<CalendarSearch />} />
          <SidebarItem to="/invitations" label="Invitaciones" icon={<Mail />} />
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <button
          type="button"
          onClick={() => void onLogout()}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/65 transition-colors hover:bg-white/10 hover:text-white"
        >
          <span>
            <LogOut />
          </span>
          <span>Cerrar Sesion</span>
        </button>
      </div>
    </aside>
  );
}
