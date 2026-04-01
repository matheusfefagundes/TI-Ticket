import z from "zod";

export const updateTechnicianSchema = z.object({
  email: z.string().email("E-mail inválido").optional(),
  availabilities: z
    .array(z.string())
    .min(1, "Selecione pelo menos um horário")
    .max(10, "Máximo de 10 horários")
    .optional(),
});

export type UpdateTechnicianFormData = z.infer<typeof updateTechnicianSchema>;
