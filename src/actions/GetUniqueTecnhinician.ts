"use server";

import { prisma } from "../lib/prisma";
import { UserRole } from "../generated/prisma/enums";

interface GetUniqueTechnicianProps {
  technicianId: string;
}

export const GetUniqueTechnician = async ({
  technicianId,
}: GetUniqueTechnicianProps) => {
  const user = await prisma.user.findUnique({
    where: {
      id: technicianId,
      role: UserRole.technical,
    },
    include: {
      availabilities: true,
    },
  });

  if (!user) {
    throw new Error("Técnico não encontrado");
  }

  return user;
};
