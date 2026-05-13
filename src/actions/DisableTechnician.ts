"use server";

import { prisma } from "@/lib/prisma";
import { UserRole, TicketStatus } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";

interface DisableTechnicianProps {
  userId: string;
}

export const DisableTechnician = async ({ userId }: DisableTechnicianProps) => {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user || user.role !== UserRole.technical) {
    throw new Error(
      "Usuário não encontrado ou não possui cargo para ser desativado.",
    );
  }

  const linkedTicketsCount = await prisma.ticket.count({
    where: {
      technicianId: userId,
      status: {
        not: TicketStatus.closed,
      },
    },
  });

  if (linkedTicketsCount > 0) {
    throw new Error(
      `Não é possível desativar este técnico. Existem ${linkedTicketsCount} chamado(s) em aberto vinculado(s) a ele.`,
    );
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isActive: false,
    },
  });

  revalidatePath("/admin/users/technicians");
};
