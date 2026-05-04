import { registerSchema } from "@/schemas/register";

describe("registerSchema - validação do formulário de cadastro", () => {
  const validData = {
    name: "João Silva",
    email: "joao@email.com",
    password: "senha123",
    confirmPassword: "senha123",
  };

  it("deve validar com sucesso dados corretos", () => {
    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("deve falhar quando o nome tiver menos de 3 caracteres", () => {
    const result = registerSchema.safeParse({ ...validData, name: "Jo" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const nameError = result.error.issues.find((i) =>
        i.path.includes("name")
      );
      expect(nameError?.message).toBe("Mínimo de 3 dígitos.");
    }
  });

  it("deve falhar quando a senha tiver menos de 6 caracteres", () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: "123",
      confirmPassword: "123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const passwordError = result.error.issues.find((i) =>
        i.path.includes("password")
      );
      expect(passwordError?.message).toBe("Mínimo de 6 dígitos.");
    }
  });

  it("deve falhar quando as senhas não coincidirem", () => {
    const result = registerSchema.safeParse({
      ...validData,
      password: "senha123",
      confirmPassword: "outrasenha",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const confirmError = result.error.issues.find((i) =>
        i.path.includes("confirmPassword")
      );
      expect(confirmError?.message).toBe("As senhas não coincidem");
    }
  });

  it("deve falhar com e-mail inválido", () => {
    const result = registerSchema.safeParse({
      ...validData,
      email: "nao-e-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const emailError = result.error.issues.find((i) =>
        i.path.includes("email")
      );
      expect(emailError?.message).toBe("E-mail inválido.");
    }
  });
});
