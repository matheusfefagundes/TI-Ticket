export const menuListByRole = {
  admin: [
    {
      label: "Chamados",
      icon: "/icons/list-default.svg",
      iconHover: "/icons/list-hover.svg",
      path: "/admin/tickets",
    },
    {
      label: "Técnicos",
      icon: "/icons/users-default.svg",
      iconHover: "/icons/users-hover.svg",
      path: "/admin/users/technicians",
    },
    {
      label: "Clientes",
      icon: "/icons/client-default.svg",
      iconHover: "/icons/client-hover.svg",
      path: "/admin/users/clients",
    },
    {
      label: "Serviços",
      icon: "/icons/wrench-default.svg",
      iconHover: "/icons/wrench-hover.svg",
      path: "/admin/services",
    },
  ],
  client: [
    {
      label: "Meus chamados",
      icon: "/icons/list-default.svg",
      iconHover: "/icons/list-hover.svg",
      path: "/portal/tickets",
    },
    {
      label: "Criar chamado",
      path: "/portal/new-ticket",
      icon: "/icons/plus-default.svg",
      iconHover: "/icons/plus-hover.svg",
    },
  ],
  technical: [
    {
      label: "Meus chamados",
      icon: "/icons/list-default.svg",
      iconHover: "/icons/list-hover.svg",
      path: "/technician/tickets",
    },
  ],
};
