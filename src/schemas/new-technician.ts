import z from "zod";
import {
  normalizedAvailabilityItemSchema,
  normalizedEmailSchema,
  normalizedNameSchema,
  passwordSchema,
} from "./shared";

export const newTechnicianSchema = z.object({
  name: normalizedNameSchema,
  email: normalizedEmailSchema,
  password: passwordSchema,
  availabilities: z
    .array(normalizedAvailabilityItemSchema)
    .min(8, "Mínimo de 8 horários")
    .max(10, "Máximo de 10 horários")
    .refine((values) => new Set(values).size === values.length, {
      message: "Os horários não podem se repetir.",
    }),
});

export type NewTechnicianFormData = z.infer<typeof newTechnicianSchema>;
