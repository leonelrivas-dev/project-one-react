import { ProtectedRoute } from "@/app/router/protected-route";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { DashboardPage } from "@/features/dashboard/pages/DashboardPage";
import { EventsPage } from "@/features/events/pages/EventsPage";
import { InvitationsPage } from "@/features/invitations/pages/InvitationsPage";
import { InvitationEventsPage } from "@/features/invitations/pages/InvitationEventsPage";
import { Navigate, Route, Routes } from "react-router-dom";

export function AppRouter() {
  return (
    <Routes>
      {/* Publico */}
      <Route path="/login" element={<LoginPage />} />

      {/* Administracion */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId/invitations" element={<InvitationsPage />} />
          <Route path="/invitations" element={<InvitationEventsPage />} />
        </Route>
      </Route>

      {/* cualquier otra ruta */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
