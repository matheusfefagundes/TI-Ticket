"use server";

import { UserRole } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

interface FetchTechnicianByIdProps {
  userId: string;
}

export const FetchTechnicianById = async ({
  userId,
}: FetchTechnicianByIdProps) => {
  const user = await prisma.user.findFirst({
    where: {
      role: UserRole.technical,
      id: userId,
    },
    include: {
      availabilities: {
        select: {
          schedules: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  return user;
};
