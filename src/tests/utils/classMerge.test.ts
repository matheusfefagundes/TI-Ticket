import { cn } from "@/lib/classMerge";

describe("cn - classMerge utility", () => {
  it("deve retornar uma string vazia quando nenhum argumento é passado", () => {
    expect(cn()).toBe("");
  });

  it("deve combinar classes simples", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center");
  });

  it("deve ignorar valores falsy (undefined, null, false)", () => {
    expect(cn("flex", undefined, null, false, "gap-2")).toBe("flex gap-2");
  });

  it("deve mesclar classes conflitantes do Tailwind, mantendo a última", () => {
    expect(cn("p-4", "p-8")).toBe("p-8");
  });

  it("deve suportar classes condicionais via objeto clsx", () => {
    const isActive = true;
    const isDisabled = false;
    expect(cn({ "bg-blue-500": isActive, "bg-gray-300": isDisabled })).toBe(
      "bg-blue-500"
    );
  });

  it("deve mesclar corretamente classes de array com classes normais", () => {
    expect(cn(["border", "rounded"], "p-2")).toBe("border rounded p-2");
  });
});
