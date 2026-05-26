import z from "zod";
import {
  normalizedAvailabilityItemSchema,
  normalizedEmailSchema,
} from "./shared";

export const updateTechnicianSchema = z.object({
  email: normalizedEmailSchema.optional(),
  availabilities: z
    .array(normalizedAvailabilityItemSchema)
    .min(1, "Selecione pelo menos um horário")
    .max(10, "Máximo de 10 horários")
    .refine((values) => new Set(values).size === values.length, {
      message: "Os horários não podem se repetir.",
    })
    .optional(),
});

export type UpdateTechnicianFormData = z.infer<typeof updateTechnicianSchema>;
