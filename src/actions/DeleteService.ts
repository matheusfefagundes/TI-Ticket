"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export interface DeleteServiceProps {
  ticketServiceId: string;
  ticketId: number;
  serviceId: string;
}

export const DeleteService = async ({
  serviceId,
  ticketServiceId,
  ticketId,
}: DeleteServiceProps) => {
  await prisma.ticketService.delete({
    where: {
      id: ticketServiceId,
      serviceId,
    },
  });

  revalidatePath(`/technician/tickets/${ticketId}`);
};
