import { TicketStatus } from "../generated/prisma/enums";

type StatusConfig = {
  icon: string;
  iconTicket: string;
  iconWhite: string;
  title: string;
  label?: string;
  colorText: string;
  bg: string;
};

export const statusMap: Record<TicketStatus, StatusConfig> = {
  [TicketStatus.open]: {
    icon: "/icons/circle-help.svg",
    iconTicket: "/icons/circle-help-ticket.svg",
    iconWhite: "/icons/circle-help-ticket-white.svg",
    title: "Aberto",
    label: "Aberto",
    colorText: "text-feedback-open",
    bg: "bg-[#CC3D6A20]",
  },
  [TicketStatus.inAttendance]: {
    icon: "/icons/clock-2.svg",
    iconTicket: "/icons/clock-2-ticket.svg",
    iconWhite: "/icons/clock-2-white.svg",
    title: "Em atendimento",
    label: "Iniciar atendimento",
    bg: "bg-[#355EC520]",
    colorText: "text-feedback-progress",
  },
  [TicketStatus.closed]: {
    icon: "/icons/circle-check-big.svg",
    iconTicket: "/icons/circle-check-ticket.svg",
    iconWhite: "/icons/circle-check-ticket-white.svg",
    title: "Encerrado",
    label: "Encerrar",
    bg: "bg-[#508B2620]",
    colorText: "text-feedback-done",
  },
};
