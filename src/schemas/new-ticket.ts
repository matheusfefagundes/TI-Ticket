import z from "zod";
import {
  normalizedDescriptionSchema,
  normalizedTitleSchema,
} from "./shared";

export const newTicketSchema = z.object({
  title: normalizedTitleSchema.max(30, "Máximo de 30 dígitos."),
  description: normalizedDescriptionSchema.max(200, "Máximo de 200 dígitos."),
  service: z.string("Deve selecionar um serviço.").uuid(),
  technicianId: z.string("Deve ser selecionado um técnico."),
});

export type NewTicketData = z.infer<typeof newTicketSchema>;
