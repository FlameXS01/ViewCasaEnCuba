export interface BaseDTO {
  id: string;
  created_at: string;
}

export interface UserDTO extends BaseDTO {
  email: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: "admin" | "seller" | "user";
  status: string;
  verified: boolean;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  expires_in: number;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface PropertyDTO extends BaseDTO {
  owner_id: string;
  title: string;
  description: string;
  property_type: "house" | "apartment" | "land" | "penthouse" | "duplex";
  status: "draft" | "active" | "rented" | "sold" | "inactive";
  latitude: number;
  longitude: number;
  address: string;
  municipality: string;
  area_sqm: number;
  rooms: number;
  bathrooms: number;
  kitchens: number;
  floors: number;
  year_built: number | null;
  conservation_state: string;
  receives_visits: boolean;
  visit_hours: Record<string, unknown>;
  is_featured: boolean;
}

export interface PropertyImageDTO extends BaseDTO {
  property_id: string;
  url: string;
  storage_path: string;
  order_index: number;
}

export interface PropertyWithImages extends PropertyDTO {
  images?: PropertyImageDTO[];
}

export interface CreatePropertyRequest {
  title: string;
  description: string;
  property_type: string;
  latitude: number;
  longitude: number;
  address: string;
  municipality: string;
  area_sqm: number;
  rooms?: number;
  bathrooms?: number;
  kitchens?: number;
  floors?: number;
  year_built?: number;
  conservation_state?: string;
  receives_visits?: boolean;
}

export interface PropertyFilters {
  property_type?: string;
  municipality?: string;
  province?: string;
  min_price?: number;
  max_price?: number;
  min_area?: number;
  max_area?: number;
  min_rooms?: number;
  page?: number;
  per_page?: number;
}

export interface MessageDTO extends BaseDTO {
  sender_id: string;
  receiver_id: string;
  property_id: string | null;
  content: string;
  is_read: boolean;
}

export interface SendMessageRequest {
  receiver_id: string;
  content: string;
  property_id?: string;
}

export interface VisitDTO extends BaseDTO {
  property_id: string;
  visitor_id: string;
  scheduled_at: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  note: string | null;
  updated_at: string;
  property?: PropertyDTO;
  visitor?: UserDTO;
}

export interface ScheduleVisitRequest {
  property_id: string;
  scheduled_at: string;
  phone: string;
  note?: string;
}

export interface ReviewDTO extends BaseDTO {
  property_id: string;
  reviewer_id: string;
  rating: number;
  comment: string;
  reviewer?: UserDTO;
}

export interface CreateReviewRequest {
  rating: number;
  comment: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}