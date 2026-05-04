import { newTicketSchema } from "@/schemas/new-ticket";
import { v4 as uuidv4 } from "uuid";

describe("newTicketSchema - validação do formulário de novo chamado", () => {
  const validServiceId = uuidv4();
  const validData = {
    title: "Problema no sistema",
    description: "O sistema está apresentando falhas ao logar.",
    service: validServiceId,
    technicianId: "tecnico-123",
  };

  it("deve validar com sucesso dados corretos", () => {
    const result = newTicketSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("deve falhar quando o título tiver menos de 6 caracteres", () => {
    const result = newTicketSchema.safeParse({ ...validData, title: "Curto" });
    expect(result.success).toBe(false);
    if (!result.success) {
      const titleError = result.error.issues.find((i) =>
        i.path.includes("title")
      );
      expect(titleError?.message).toBe("Mínimo de 6 dígitos.");
    }
  });

  it("deve falhar quando o título tiver mais de 30 caracteres", () => {
    const result = newTicketSchema.safeParse({
      ...validData,
      title: "Este título é extremamente longo e inválido!!!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const titleError = result.error.issues.find((i) =>
        i.path.includes("title")
      );
      expect(titleError?.message).toBe("Máximo de 30 dígitos.");
    }
  });

  it("deve falhar quando a descrição estiver vazia", () => {
    const result = newTicketSchema.safeParse({
      ...validData,
      description: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const descError = result.error.issues.find((i) =>
        i.path.includes("description")
      );
      expect(descError?.message).toBe(
        "Informe um breve resumo do seu problema."
      );
    }
  });

  it("deve falhar quando o service não for um UUID válido", () => {
    const result = newTicketSchema.safeParse({
      ...validData,
      service: "nao-e-uuid",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const serviceError = result.error.issues.find((i) =>
        i.path.includes("service")
      );
      expect(serviceError).toBeDefined();
    }
  });

  it("deve falhar quando o technicianId não for fornecido", () => {
    const { technicianId, ...withoutTechnicianId } = validData;
    const result = newTicketSchema.safeParse(withoutTechnicianId);
    expect(result.success).toBe(false);
  });
});
