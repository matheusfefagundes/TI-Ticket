import z from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().min(6, "Mínimo de 6 dígitos."),
    confirmNewPassword: z.string().min(6, "Mínimo de 6 dígitos."),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "As senhas não coincidem",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordData = z.infer<typeof changePasswordSchema>;
