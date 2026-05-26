import z from "zod";

export const passwordSchema = z
  .string()
  .min(6, "Mínimo de 6 dígitos.")
  .refine((value) => value === value.trim(), {
    message: "A senha não pode começar ou terminar com espaços.",
  })
  .refine((value) => /[A-Za-z]/.test(value), {
    message: "A senha deve conter pelo menos uma letra.",
  })
  .refine((value) => /\d/.test(value), {
    message: "A senha deve conter pelo menos um número.",
  });

export const normalizedNameSchema = z
  .string()
  .trim()
  .min(3, "Mínimo de 3 dígitos.");

export const normalizedEmailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email("E-mail inválido.");

export const normalizedTitleSchema = z
  .string()
  .trim()
  .min(6, "Mínimo de 6 dígitos.");

export const normalizedDescriptionSchema = z
  .string()
  .trim()
  .min(1, "Informe um breve resumo do seu problema.");

export const normalizedAvailabilityItemSchema = z
  .string()
  .trim()
  .min(1, "Horário inválido.");
