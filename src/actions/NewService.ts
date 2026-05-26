"use server";

import { prisma } from "@/lib/prisma";
import { NewServiceFormData, newServiceSchema } from "@/schemas/new-service";
import { revalidatePath } from "next/cache";

interface NewServiceProps {
  data: NewServiceFormData;
}

export const NewService = async ({ data }: NewServiceProps) => {
  const validatedData = newServiceSchema.parse(data);

  const service = await prisma.service.create({
    data: {
      ...validatedData,
    },
  });

  revalidatePath("/admin/services");

  return service;
};
