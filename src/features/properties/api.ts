import { api } from "@/lib/api";
import { uploadPropertyImage } from "@/lib/supabase";
import type {
  PropertyDTO,
  PropertyWithImages,
  PropertyImageDTO,
  CreatePropertyRequest,
  PropertyFilters,
  PaginatedResponse,
} from "./types";

export const propertiesApi = {
  async getAll(filters?: PropertyFilters): Promise<PaginatedResponse<PropertyDTO>> {
    const params = new URLSearchParams();
    if (filters?.page) params.append("page", String(filters.page));
    if (filters?.per_page) params.append("per_page", String(filters.per_page));
    if (filters?.property_type) params.append("property_type", filters.property_type);
    if (filters?.municipality) params.append("municipality", filters.municipality);
    if (filters?.province) params.append("province", filters.province);
    if (filters?.min_price) params.append("min_price", String(filters.min_price));
    if (filters?.max_price) params.append("max_price", String(filters.max_price));
    if (filters?.min_area) params.append("min_area", String(filters.min_area));
    if (filters?.max_area) params.append("max_area", String(filters.max_area));
    if (filters?.min_rooms) params.append("min_rooms", String(filters.min_rooms));

    const { data } = await api.get<PaginatedResponse<PropertyDTO>>(
      `/properties?${params.toString()}`
    );
    return data;
  },

  async search(filters: PropertyFilters): Promise<PropertyDTO[]> {
    const params = new URLSearchParams();
    if (filters.property_type) params.append("property_type", filters.property_type);
    if (filters.municipality) params.append("municipality", filters.municipality);
    if (filters.province) params.append("province", filters.province);
    if (filters.min_price) params.append("min_price", String(filters.min_price));
    if (filters.max_price) params.append("max_price", String(filters.max_price));
    if (filters.min_area) params.append("min_area", String(filters.min_area));
    if (filters.max_area) params.append("max_area", String(filters.max_area));
    if (filters.min_rooms) params.append("min_rooms", String(filters.min_rooms));

    const { data } = await api.get<PropertyDTO[]>(`/properties/search?${params.toString()}`);
    return data;
  },

  async getById(id: string): Promise<PropertyWithImages> {
    const { data } = await api.get<PropertyWithImages>(`/properties/${id}`);
    return data;
  },

  async create(payload: CreatePropertyRequest): Promise<PropertyDTO> {
    const { data } = await api.post<PropertyDTO>("/properties", payload);
    return data;
  },

  async update(id: string, payload: Partial<CreatePropertyRequest>): Promise<PropertyDTO> {
    const { data } = await api.patch<PropertyDTO>(`/properties/${id}`, payload);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/properties/${id}`);
  },

  async uploadImages(
    propertyId: string,
    files: File[]
  ): Promise<PropertyImageDTO[]> {
    const images = await Promise.all(
      files.map(async (file, index) => {
        const { url, path } = await uploadPropertyImage(
          file,
          propertyId,
          `${Date.now()}-${index}-${file.name}`
        );
        return { url, path };
      })
    );

    const { data } = await api.post<PropertyImageDTO[]>(
      `/properties/${propertyId}/images`,
      images
    );
    return data;
  },

  async deleteImage(propertyId: string, imageId: string): Promise<void> {
    await api.delete(`/properties/${propertyId}/images/${imageId}`);
  },
};