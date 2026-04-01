"use server";

import { prisma } from "../lib/prisma";

interface GetTicketsParams {
  ticketId: number;
}

export const GetTicketUnique = async ({ ticketId }: GetTicketsParams) => {
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
    include: {
      ticketServices: {
        include: {
          service: true,
        },
      },
      client: true,
      technician: true,
    },
  });

  if (!ticket) throw new Error("Chamado não encontrado.");

  return ticket;
};
