import type {
  PropertyDTO,
  PropertyImageDTO,
  PropertyWithImages,
  CreatePropertyRequest,
  PropertyFilters,
  PaginatedResponse,
} from "@/types/api";

export type {
  PropertyDTO,
  PropertyImageDTO,
  PropertyWithImages,
  CreatePropertyRequest,
  PropertyFilters,
  PaginatedResponse,
};

export interface PropertyState {
  properties: PropertyDTO[];
  currentProperty: PropertyWithImages | null;
  isLoading: boolean;
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
}

export interface PropertyActions {
  fetchProperties: (filters?: PropertyFilters) => Promise<void>;
  fetchProperty: (id: string) => Promise<void>;
  createProperty: (data: CreatePropertyRequest) => Promise<PropertyDTO>;
  updateProperty: (id: string, data: Partial<CreatePropertyRequest>) => Promise<PropertyDTO>;
  deleteProperty: (id: string) => Promise<void>;
  uploadImages: (propertyId: string, files: File[]) => Promise<PropertyImageDTO[]>;
  deleteImage: (propertyId: string, imageId: string) => Promise<void>;
  setCurrentProperty: (property: PropertyWithImages | null) => void;
}

export type PropertyStore = PropertyState & PropertyActions;