"use server";

import { prisma } from "../lib/prisma";

interface GetUserImageProps {
  userId: string;
  imageUrl: string;
}

export const GetUserImage = async ({ userId, imageUrl }: GetUserImageProps) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("Usuário não encontrado.");

  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      image: imageUrl,
    },
  });
};
