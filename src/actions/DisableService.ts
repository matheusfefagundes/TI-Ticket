"use server";

import { prisma } from "../lib/prisma";
import { ServiceStatus } from "../generated/prisma/enums";
import { revalidatePath } from "next/cache";

interface DisableServiceProps {
  serviceId: string;
}

export const DisableService = async ({ serviceId }: DisableServiceProps) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("Serviço não encontrado.");
  }

  await prisma.service.update({
    where: {
      id: serviceId,
    },
    data: {
      isActive:
        service.isActive === ServiceStatus.active
          ? ServiceStatus.disabled
          : ServiceStatus.active,
    },
  });

  revalidatePath("/admin/services");
};
