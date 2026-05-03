"use server";

import { UserRole } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import {
  NewTechnicianFormData,
  newTechnicianSchema,
} from "@/schemas/new-technician";
import { hash } from "bcrypt";

export const CreateTechnicians = async (data: NewTechnicianFormData) => {
  const validatedData = newTechnicianSchema.parse(data);

  const isUserExisting = await prisma.user.findFirst({
    where: {
      email: validatedData.email,
    },
  });

  if (isUserExisting) throw new Error("Usuário já cadastrado.");

  const hashedPassword = await hash(validatedData.password, 12);

  const technician = await prisma.user.create({
    data: {
      name: validatedData.name,
      email: validatedData.email,
      role: UserRole.technical,
      availabilities: {
        create: {
          schedules: validatedData.availabilities,
        },
      },
      password: hashedPassword,
    },
  });

  const { password: _, ...userWithoutPassword } = technician;

  return userWithoutPassword;
};
