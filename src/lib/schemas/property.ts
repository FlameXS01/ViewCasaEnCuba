import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(5, "Mínimo 5 caracteres").max(100),
  description: z.string().min(20, "Mínimo 20 caracteres"),
  property_type: z.enum(["house", "apartment", "land", "penthouse", "duplex"]),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  address: z.string().min(5),
  municipality: z.string().min(2),
  area_sqm: z.number().positive().max(10000),
  rooms: z.number().int().min(0).max(20).optional(),
  bathrooms: z.number().int().min(0).max(10).optional(),
  kitchens: z.number().int().min(0).max(5).optional(),
  floors: z.number().int().min(1).max(50).optional(),
  year_built: z.number().int().min(1800).max(new Date().getFullYear()).optional(),
  conservation_state: z.string().optional(),
  receives_visits: z.boolean().optional(),
});

export type PropertyFormData = z.infer<typeof propertySchema>;