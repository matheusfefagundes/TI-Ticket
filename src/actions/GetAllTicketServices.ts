"use server";

import { prisma } from "../lib/prisma";

interface GetAllTicketServicesResponse {
  ticketId?: number;
}

export const GetAllTicketServices = async (
  props?: GetAllTicketServicesResponse,
) => {
  return await prisma.ticketService.findMany({
    where: {
      ticketId: props?.ticketId,
    },
    include: {
      service: true,
    },
  });
};
