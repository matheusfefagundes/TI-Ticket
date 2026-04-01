"use server";

import { prisma } from "../lib/prisma";

export async function GetAvailableServices() {
  return await prisma.service.findMany({
    where: {
      isActive: "active",
    },
  });
}
