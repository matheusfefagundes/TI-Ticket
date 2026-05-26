import { changePasswordSchema } from "@/schemas/change-password";

describe("changePasswordSchema - validação de troca de senha", () => {
  const validData = {
    currentPassword: "senha123",
    newPassword: "nova123",
    confirmNewPassword: "nova123",
  };

  it("deve validar com sucesso dados corretos", () => {
    const result = changePasswordSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("deve falhar quando a nova senha for igual à atual", () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: "senha123",
      newPassword: "senha123",
      confirmNewPassword: "senha123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordError = result.error.issues.find((i) =>
        i.path.includes("newPassword")
      );
      expect(passwordError?.message).toBe(
        "A nova senha deve ser diferente da senha atual."
      );
    }
  });

  it("deve falhar quando a senha não tiver letras e números", () => {
    const result = changePasswordSchema.safeParse({
      ...validData,
      newPassword: "123456",
      confirmNewPassword: "123456",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordError = result.error.issues.find((i) =>
        i.path.includes("newPassword")
      );
      expect(passwordError?.message).toBe(
        "A senha deve conter pelo menos uma letra."
      );
    }
  });

  it("deve falhar quando a senha tiver espaços nas extremidades", () => {
    const result = changePasswordSchema.safeParse({
      ...validData,
      newPassword: " nova123 ",
      confirmNewPassword: " nova123 ",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordError = result.error.issues.find((i) =>
        i.path.includes("newPassword")
      );
      expect(passwordError?.message).toBe(
        "A senha não pode começar ou terminar com espaços."
      );
    }
  });
});
