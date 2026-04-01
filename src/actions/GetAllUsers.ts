"use server";

import { UserRole } from "../generated/prisma/enums";
import { prisma } from "../lib/prisma";

export const GetAllUsers = async (role: UserRole) => {
  return await prisma.user.findMany({
    where: {
      role: role,
      isActive: true,
    },
    include: {
      availabilities: {
        select: {
          schedules: true,
        },
      },
    },
  });
};
