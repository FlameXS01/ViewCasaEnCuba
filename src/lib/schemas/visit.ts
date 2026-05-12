import { z } from "zod";

export const visitSchema = z.object({
  property_id: z.string().uuid("ID de propiedad inválido"),
  scheduled_at: z.string().datetime("Fecha inválida"),
  phone: z.string().min(8, "Teléfono inválido"),
  note: z.string().max(500).optional(),
});

export type VisitFormData = z.infer<typeof visitSchema>;