import { api } from "@/lib/api";
import type { ReviewDTO, CreateReviewRequest } from "@/types/api";

export const reviewsApi = {
  async getByProperty(propertyId: string): Promise<ReviewDTO[]> {
    const { data } = await api.get<ReviewDTO[]>(`/properties/${propertyId}/reviews/`);
    return data;
  },

  async create(propertyId: string, payload: CreateReviewRequest): Promise<ReviewDTO> {
    const { data } = await api.post<ReviewDTO>(
      `/properties/${propertyId}/reviews/`,
      payload
    );
    return data;
  },

  async delete(propertyId: string, reviewId: string): Promise<void> {
    await api.delete(`/properties/${propertyId}/reviews/${reviewId}`);
  },
};