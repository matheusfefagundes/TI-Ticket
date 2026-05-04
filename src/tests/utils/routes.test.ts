import { findMatchingRoute, routePermissions } from "@/lib/routes";

describe("routes - utilitários de rota e permissão", () => {
  describe("routePermissions", () => {
    it("deve conter permissão de 'admin' para a rota /admin", () => {
      expect(routePermissions["/admin"]).toEqual(["admin"]);
    });

    it("deve conter permissão de 'technical' para a rota /technician", () => {
      expect(routePermissions["/technician"]).toEqual(["technical"]);
    });

    it("deve conter permissão de 'client' para a rota /portal", () => {
      expect(routePermissions["/portal"]).toEqual(["client"]);
    });
  });

  describe("findMatchingRoute", () => {
    it("deve encontrar a rota base /admin para um caminho /admin/tickets", () => {
      expect(findMatchingRoute("/admin/tickets")).toBe("/admin");
    });

    it("deve encontrar a rota base /technician para /technician/tickets", () => {
      expect(findMatchingRoute("/technician/tickets")).toBe("/technician");
    });

    it("deve encontrar a rota base /portal para /portal/new-ticket", () => {
      expect(findMatchingRoute("/portal/new-ticket")).toBe("/portal");
    });

    it("deve retornar undefined para rotas não mapeadas como /login", () => {
      expect(findMatchingRoute("/login")).toBeUndefined();
    });

    it("deve retornar undefined para a rota raiz /", () => {
      expect(findMatchingRoute("/")).toBeUndefined();
    });
  });
});
