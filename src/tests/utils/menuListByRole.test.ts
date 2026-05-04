import { menuListByRole } from "@/utils/menuListByRole";

describe("menuListByRole - menu por papel de usuário", () => {
  it("deve conter 4 itens de menu para o papel 'admin'", () => {
    expect(menuListByRole.admin).toHaveLength(4);
  });

  it("deve conter o item 'Chamados' com o caminho correto para admin", () => {
    const chamados = menuListByRole.admin.find(
      (item) => item.label === "Chamados"
    );
    expect(chamados).toBeDefined();
    expect(chamados?.path).toBe("/admin/tickets");
  });

  it("deve conter 2 itens de menu para o papel 'client'", () => {
    expect(menuListByRole.client).toHaveLength(2);
  });

  it("deve conter o item 'Criar chamado' somente para 'client'", () => {
    const criarChamado = menuListByRole.client.find(
      (item) => item.label === "Criar chamado"
    );
    expect(criarChamado).toBeDefined();
    expect(criarChamado?.path).toBe("/portal/new-ticket");
  });

  it("deve conter apenas 1 item de menu para o papel 'technical'", () => {
    expect(menuListByRole.technical).toHaveLength(1);
  });

  it("deve ter o caminho '/technician/tickets' para o menu do técnico", () => {
    expect(menuListByRole.technical[0].path).toBe("/technician/tickets");
  });
});
