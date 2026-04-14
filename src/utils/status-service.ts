import { ServiceStatus } from "@/generated/prisma/enums";

type StatusServiceConfig = {
  label: string;
  icon: string;
  bg: string;
  textColor: string;
  config: {
    icon: string;
    label: string;
  };
};

export const statusServiceMap: Record<ServiceStatus, StatusServiceConfig> = {
  [ServiceStatus.active]: {
    label: "Ativo",
    icon: "/icons/circle-check-green.svg",
    bg: "bg-[#508B2620]",
    textColor: "text-[#508B26]",
    config: {
      label: "Desativar",
      icon: "/icons/ban.svg",
    },
  },
  [ServiceStatus.disabled]: {
    label: "Inativo",
    icon: "/icons/ban-red.svg",
    bg: "bg-[#D03E3E20]",
    textColor: "text-[#D03E3E]",
    config: {
      label: "Reativar",
      icon: "/icons/circle-check.svg",
    },
  },
};
