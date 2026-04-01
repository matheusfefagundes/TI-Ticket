"use server";

import { authOptions } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { NewTicketData } from "../schemas/new-ticket";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export interface NewTicketProps {
  data: NewTicketData;
  serviceId: string;
}

export const NewTicket = async ({ data, serviceId }: NewTicketProps) => {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  const { service, ...ticketData } = data;

  const servicePrice = await prisma.service.findUnique({
    where: {
      id: service,
    },
    select: {
      price: true,
    },
  });

  if (!servicePrice) throw new Error("Serviço não encontrado.");

  await prisma.ticket.create({
    data: {
      ...ticketData,
      clientId: session.user.id,
      ticketServices: {
        create: {
          serviceId,
          priceSnapshot: servicePrice.price,
        },
      },
    },
  });

  revalidatePath("/portal/tickets");
};
