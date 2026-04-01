import z from "zod";

export const newServiceSchema = z.object({
  title: z.string().min(10, "Mínimo de 10 digítos"),
  price: z.number().min(50, "Valor mínimo de R$ 50,00"),
});

export type NewServiceFormData = z.infer<typeof newServiceSchema>;
