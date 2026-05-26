"use server";

import { prisma } from "@/lib/prisma";
import {
  ChangePasswordData,
  changePasswordSchema,
} from "@/schemas/change-password";
import { compare, hash } from "bcrypt";

export const ChangePasswordAction = async (
  userId: string,
  data: ChangePasswordData,
) => {
  try {
    const validatedData = changePasswordSchema.parse(data);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return { success: false, message: "Usuário não encontrado." };

    if (!user.password) {
      return {
        success: false,
        message:
          "Este usuário não possui uma senha cadastrada para ser alterada.",
      };
    }

    const matchedPassword = await compare(
      validatedData.currentPassword,
      user.password,
    );

    if (!matchedPassword) {
      return {
        success: false,
        message: "Senha atual incorreta. Tente novamente.",
      };
    }

    const hashedPassword = await hash(validatedData.newPassword, 12);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return { success: true, message: "Senha atualizada com sucesso!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro interno no servidor." };
  }
};
