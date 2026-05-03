"use server";

import { prisma } from "@/lib/prisma";
import { UpdateTechnicianFormData } from "@/schemas/update-technician";

interface UpdateTechniciansProps {
  userId: string;
  data: UpdateTechnicianFormData;
}

export const UpdateTechnicians = async ({
  data,
  userId,
}: UpdateTechniciansProps) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("Usuário não encontrado");

  if (!data.availabilities && !data.email) {
    throw new Error("Informe os novos valores para serem atualizados.");
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email: data.email,
      availabilities: {
        updateMany: {
          where: {
            technicianId: userId,
          },
          data: {
            schedules: data.availabilities,
          },
        },
      },
    },
  });
};
