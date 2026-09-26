export interface Event {
  id: string;
  name: string;
  slug: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetEventsResponse {
  items: Event[];
  total: number;
  page: number;
  limit: number;
}

export interface GetEventsParams {
  page?: number;
  limit?: number;
}

export interface CreateEventRequest {
  name: string;
  slug: string;
  eventDate: string;
  eventTime: string;
  venue: string;
}

export interface UpdateEventRequest {
  name: string;
  eventDate: string;
  eventTime: string;
  venue: string;
}
