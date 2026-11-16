import { api } from "@/lib/api/axios";
import type {
  CreateInvitationRequest,
  GetInvitationsResponse,
} from "@/features/invitations/types/invitation.types";

export const invitationsApi = {
  async getByEvent(
    eventId: string,
    params: { page?: number; limit?: number } = {},
  ): Promise<GetInvitationsResponse> {
    const response = await api.get<GetInvitationsResponse>("/invitations", {
      params: {
        eventId,
        page: params.page ?? 1,
        limit: params.limit ?? 10,
      },
    });

    return response.data;
  },

  async create(data: CreateInvitationRequest): Promise<void> {
    await api.post("/invitations", data);
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/invitations/${id}`);
  },
};
