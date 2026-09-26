import type {
  CreateEventRequest,
  Event,
  GetEventsParams,
  GetEventsResponse,
  UpdateEventRequest,
} from "@/features/events/types/event.types";
import { api } from "@/lib/api/axios";

export const eventsApi = {
  async getAll(params: GetEventsParams = {}): Promise<GetEventsResponse> {
    const response = await api.get<GetEventsResponse>("/events", {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
      },
    });

    return response.data;
  },

  async getById(id: string): Promise<Event> {
    const response = await api.get<Event>(`/events/${id}`);

    return response.data;
  },

  async getBySlug(slug: string): Promise<Event> {
    const respose = await api.get<Event>(`/events/slug/${slug}`);

    return respose.data;
  },

  async create(data: CreateEventRequest): Promise<void> {
    await api.post("/events", data);
  },

  async update(id: string, data: UpdateEventRequest): Promise<void> {
    await api.patch(`/events/${id}`, data);
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/events/${id}`);
  },
};
