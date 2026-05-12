export enum PropertyType {
  HOUSE = "house",
  APARTMENT = "apartment",
  LAND = "land",
  PENTHOUSE = "penthouse",
  DUPLEX = "duplex",
}

export enum PropertyStatus {
  DRAFT = "draft",
  ACTIVE = "active",
  RENTED = "rented",
  SOLD = "sold",
  INACTIVE = "inactive",
}

export enum UserRole {
  ADMIN = "admin",
  SELLER = "seller",
  USER = "user",
}

export enum VisitStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  [PropertyType.HOUSE]: "Casa",
  [PropertyType.APARTMENT]: "Apartamento",
  [PropertyType.LAND]: "Terreno",
  [PropertyType.PENTHOUSE]: "Penthouse",
  [PropertyType.DUPLEX]: "Dúplex",
};

export const PROPERTY_STATUS_LABELS: Record<PropertyStatus, string> = {
  [PropertyStatus.DRAFT]: "Borrador",
  [PropertyStatus.ACTIVE]: "Activo",
  [PropertyStatus.RENTED]: "Alquilado",
  [PropertyStatus.SOLD]: "Vendido",
  [PropertyStatus.INACTIVE]: "Inactivo",
};

export const VISIT_STATUS_LABELS: Record<VisitStatus, string> = {
  [VisitStatus.PENDING]: "Pendiente",
  [VisitStatus.CONFIRMED]: "Confirmado",
  [VisitStatus.COMPLETED]: "Completado",
  [VisitStatus.CANCELLED]: "Cancelado",
};

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Administrador",
  [UserRole.SELLER]: "Vendedor",
  [UserRole.USER]: "Usuario",
};