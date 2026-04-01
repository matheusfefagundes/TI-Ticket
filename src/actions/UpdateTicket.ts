"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateTicketProps {
  ticketId: number;
  serviceId: string;
}

export const UpdateTicket = async ({
  ticketId,
  serviceId,
}: UpdateTicketProps) => {
  try {
    if (!serviceId) {
      return { success: false, message: "Nenhum serviço selecionado" };
    }

    const services = await prisma.service.findMany({
      where: { id: serviceId },
      select: { id: true, price: true },
    });

    if (!services || services.length === 0) {
      return { success: false, message: "Serviço não encontrado" };
    }

    const verifyTicket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      select: {
        ticketServices: { select: { serviceId: true } },
      },
    });

    const hasServiceIncludeOnTicket = verifyTicket?.ticketServices.some(
      (ticket) => ticket.serviceId === serviceId,
    );

    if (hasServiceIncludeOnTicket) {
      return {
        success: false,
        message: "O serviço já está incluído no chamado.",
      };
    }

    const ticketServicesData = services.map((service) => ({
      priceSnapshot: service.price,
      serviceId: service.id,
    }));

    await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        ticketServices: {
          createMany: { data: ticketServicesData },
        },
        updatedAt: new Date(),
      },
    });

    revalidatePath(`/technician/tickets/${ticketId}`);

    return { success: true, message: "Serviço adicionado com sucesso!" };
  } catch (error) {
    console.error("Erro interno no UpdateTicket:", error);
    return {
      success: false,
      message: "Erro interno no servidor. Tente novamente.",
    };
  }
};
