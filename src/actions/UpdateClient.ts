"use server";

import { prisma } from "@/lib/prisma";
import {
  UpdateClientFormData,
  updateClientSchema,
} from "@/schemas/update-client";
import { revalidatePath } from "next/cache";

interface UpdateClientProps {
  userId: string;
  data: UpdateClientFormData;
}

export const UpdateClient = async ({ userId, data }: UpdateClientProps) => {
  const validatedData = updateClientSchema.parse(data);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  if (!validatedData.email) {
    throw new Error("Informe o novo valor para o email.");
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    select: {
      name: true,
    },
    data: {
      email: validatedData.email,
    },
  });

  revalidatePath("/admin/users/clients");
};
