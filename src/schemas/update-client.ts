import z from "zod";

export const updateClientSchema = z.object({
  email: z.string().email("E-mail inválido"),
});

export type UpdateClientFormData = z.infer<typeof updateClientSchema>;
