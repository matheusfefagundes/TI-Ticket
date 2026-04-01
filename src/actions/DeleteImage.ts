"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

interface DeleteImageProps {
  userId: string;
}

export const DeleteImage = async ({ userId }: DeleteImageProps) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("Usuário não encontrado.");

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      image: "",
    },
  });

  revalidatePath("/portal/tickets");
};
