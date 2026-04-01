"use server";

import { prisma } from "../lib/prisma";
import { UpdateServiceFormData } from "../schemas/update-service";
import { revalidatePath } from "next/cache";

interface UpdateServiceProps {
  data: UpdateServiceFormData;
  serviceId: string;
}

export const UpdateService = async ({
  data,
  serviceId,
}: UpdateServiceProps) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
  });

  if (!service) {
    throw new Error("Serviço não encontrado.");
  }

  if (!data.price || !data.title) {
    throw new Error("Informe oque deseja atualizar.");
  }

  await prisma.service.update({
    where: {
      id: service.id,
    },
    data: {
      ...data,
    },
  });

  revalidatePath("/admin/services");
};
