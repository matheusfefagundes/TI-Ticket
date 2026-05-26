import z from "zod";
import {
  normalizedEmailSchema,
  normalizedNameSchema,
  passwordSchema,
} from "./shared";

export const registerSchema = z
  .object({
    name: normalizedNameSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    email: normalizedEmailSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
