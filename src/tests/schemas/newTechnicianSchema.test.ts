import { newTechnicianSchema } from "@/schemas/new-technician";

describe("newTechnicianSchema - validação do formulário de técnico", () => {
  const validData = {
    name: "Carlos Silva",
    email: "carlos@email.com",
    password: "senha123",
    availabilities: [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
    ],
  };

  it("deve normalizar nome, e-mail e horários", () => {
    const result = newTechnicianSchema.safeParse({
      ...validData,
      name: "  Carlos Silva  ",
      email: "  CARLOS@EMAIL.COM  ",
      availabilities: validData.availabilities.map((value) => ` ${value} `),
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe("Carlos Silva");
      expect(result.data.email).toBe("carlos@email.com");
      expect(result.data.availabilities).toEqual(validData.availabilities);
    }
  });

  it("deve falhar quando houver horários duplicados", () => {
    const result = newTechnicianSchema.safeParse({
      ...validData,
      availabilities: [
        "08:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "13:00",
        "14:00",
        "15:00",
      ],
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Os horários não podem se repetir."
      );
    }
  });
});
