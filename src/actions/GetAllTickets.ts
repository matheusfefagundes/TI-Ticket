"use server";

import { prisma } from "../lib/prisma";
import { TicketStatus } from "../generated/prisma/enums";

interface GetAllTicketsProps {
  status?: TicketStatus;
  technicianId?: string;
  clientId?: string;
}

export const GetAllTickets = async (props?: GetAllTicketsProps) => {
  return await prisma.ticket.findMany({
    where: {
      status: props?.status,
      technicianId: props?.technicianId,
      clientId: props?.clientId,
    },
    include: {
      technician: true,
      client: true,
      ticketServices: {
        include: {
          service: true,
        },
      },
    },
    orderBy: {
      status: "asc",
    },
  });
};
