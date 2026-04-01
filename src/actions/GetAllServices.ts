"use server";

import { prisma } from "../lib/prisma";

export const GetAllServices = async () => {
  return await prisma.service.findMany({
    where: {
      isActive: "active",
    },
  });
};
