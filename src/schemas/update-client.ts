import z from "zod";
import { normalizedEmailSchema } from "./shared";

export const updateClientSchema = z.object({
  email: normalizedEmailSchema,
});

export type UpdateClientFormData = z.infer<typeof updateClientSchema>;
