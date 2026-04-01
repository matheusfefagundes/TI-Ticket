"use server";

import { prisma } from "../lib/prisma";

export const GetServices = async () => {
  return await prisma.service.findMany({
    orderBy: {
      price: "desc",
    },
  });
};
