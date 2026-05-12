import { api } from "@/lib/api";
import type { VisitDTO, ScheduleVisitRequest } from "@/types/api";

export const visitsApi = {
  async getMyVisits(): Promise<VisitDTO[]> {
    const { data } = await api.get<VisitDTO[]>("/visits/my-visits");
    return data;
  },

  async getPropertyVisits(propertyId: string): Promise<VisitDTO[]> {
    const { data } = await api.get<VisitDTO[]>(`/visits/property/${propertyId}`);
    return data;
  },

  async schedule(payload: ScheduleVisitRequest): Promise<VisitDTO> {
    const { data } = await api.post<VisitDTO>("/visits", payload);
    return data;
  },

  async update(visitId: string, payload: { scheduled_at?: string; note?: string }): Promise<VisitDTO> {
    const { data } = await api.patch<VisitDTO>(`/visits/${visitId}`, payload);
    return data;
  },

  async cancel(visitId: string): Promise<void> {
    await api.delete(`/visits/${visitId}`);
  },

  async confirm(visitId: string): Promise<VisitDTO> {
    const { data } = await api.patch<VisitDTO>(`/visits/${visitId}/confirm`);
    return data;
  },

  async complete(visitId: string): Promise<VisitDTO> {
    const { data } = await api.patch<VisitDTO>(`/visits/${visitId}/complete`);
    return data;
  },
};