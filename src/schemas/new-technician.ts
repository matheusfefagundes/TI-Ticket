import z from "zod";

export const newTechnicianSchema = z.object({
  name: z.string().min(3, "Mínimo de 3 digítos"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo de 6 digítos"),
  availabilities: z
    .array(z.string())
    .min(8, "Mínimo de 8 horários")
    .max(10, "Máximo de 10 horários"),
});

export type NewTechnicianFormData = z.infer<typeof newTechnicianSchema>;
