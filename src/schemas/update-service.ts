import z from "zod";
import { ServiceStatus } from "@/generated/prisma/enums";
import {
  normalizedDescriptionSchema,
  normalizedTitleSchema,
} from "./shared";

export const updateServiceSchema = z.object({
  title: normalizedTitleSchema.min(10, "Mínimo de 10 digítos").optional(),
  description: normalizedDescriptionSchema
    .min(10, "Mínimo de 10 digítos")
    .optional(),
  price: z.number().min(50, "Valor mínimo de R$ 50,00").optional(),
  isActive: z.enum(ServiceStatus).default("active").optional(),
});

export type UpdateServiceFormData = z.infer<typeof updateServiceSchema>;
