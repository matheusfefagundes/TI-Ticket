import z from "zod";
import { passwordSchema } from "./shared";

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "A senha atual é obrigatória.")
      .refine((value) => value === value.trim(), {
        message: "A senha não pode começar ou terminar com espaços.",
      }),
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "A nova senha deve ser diferente da senha atual.",
    path: ["newPassword"],
  });

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
