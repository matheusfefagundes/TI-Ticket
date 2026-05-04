import { loginSchema } from "@/schemas/login";

describe("loginSchema - validação do formulário de login", () => {
  it("deve validar com sucesso dados corretos", () => {
    const result = loginSchema.safeParse({
      email: "usuario@email.com",
      password: "senha123",
    });
    expect(result.success).toBe(true);
  });

  it("deve falhar com e-mail inválido", () => {
    const result = loginSchema.safeParse({
      email: "email-invalido",
      password: "senha123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailError = result.error.issues.find((i) =>
        i.path.includes("email")
      );
      expect(emailError?.message).toBe("E-mail inválido.");
    }
  });

  it("deve falhar quando a senha estiver vazia", () => {
    const result = loginSchema.safeParse({
      email: "usuario@email.com",
      password: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordError = result.error.issues.find((i) =>
        i.path.includes("password")
      );
      expect(passwordError?.message).toBe("A senha é obrigatória.");
    }
  });

  it("deve falhar quando ambos os campos estiverem ausentes", () => {
    const result = loginSchema.safeParse({});
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThanOrEqual(2);
    }
  });
});
