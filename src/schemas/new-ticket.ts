import z from "zod";

export const newTicketSchema = z.object({
  title: z
    .string()
    .min(6, "Mínimo de 6 dígitos.")
    .max(30, "Máximo de 30 dígitos."),
  description: z
    .string()
    .min(10, "Informe um breve resumo do seu problema.")
    .max(200, "Máximo de 200 dígitos."),
  service: z.string("Deve selecionar um serviço.").uuid(),
  technicianId: z.string("Deve ser selecionado um técnico."),
});

export type NewTicketData = z.infer<typeof newTicketSchema>;
