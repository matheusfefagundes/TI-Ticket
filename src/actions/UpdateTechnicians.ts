"use server";

import { prisma } from "@/lib/prisma";
import {
  UpdateTechnicianFormData,
  updateTechnicianSchema,
} from "@/schemas/update-technician";

interface UpdateTechniciansProps {
  userId: string;
  data: UpdateTechnicianFormData;
}

export const UpdateTechnicians = async ({
  data,
  userId,
}: UpdateTechniciansProps) => {
  const validatedData = updateTechnicianSchema.parse(data);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("Usuário não encontrado");

  if (!validatedData.availabilities && !validatedData.email) {
    throw new Error("Informe os novos valores para serem atualizados.");
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email: validatedData.email,
      availabilities: {
        updateMany: {
          where: {
            technicianId: userId,
          },
          data: {
            schedules: validatedData.availabilities,
          },
        },
      },
    },
  });
};
