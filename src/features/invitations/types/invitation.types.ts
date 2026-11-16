export type InvitationStatus = "PENDING" | "CONFIRMED" | "DECLINED";

export interface Invitation {
  id: string;
  name: string;
  slug: string;
  phone: string;
  allowedSeats: number;
  confirmedSeats: number;
  status: InvitationStatus;
  messageSentAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetInvitationsResponse {
  items: Invitation[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateInvitationRequest {
  eventId: string;
  name: string;
  slug: string;
  phone: string;
  allowedSeats: number;
}
