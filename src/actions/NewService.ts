"use server";

import { prisma } from "../lib/prisma";
import { NewServiceFormData } from "../schemas/new-service";
import { revalidatePath } from "next/cache";

interface NewServiceProps {
  data: NewServiceFormData;
}

export const NewService = async ({ data }: NewServiceProps) => {
  const service = await prisma.service.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/admin/services");

  return service;
};
