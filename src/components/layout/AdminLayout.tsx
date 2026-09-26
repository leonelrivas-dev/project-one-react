import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { useAuthStore } from "@/stores/auth.store";
import { Outlet } from "react-router-dom";

export function AdminLayout() {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex min-h-svh bg-[#f7f7fb]">
      {/* Sidebar */}
      <Sidebar onLogout={handleLogout} />

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile / top header */}
        <Header onLogout={handleLogout} />

        {/* Page */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
