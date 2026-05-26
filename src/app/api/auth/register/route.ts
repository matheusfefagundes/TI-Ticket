import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { registerSchema } from "@/schemas/register";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = registerSchema.parse(body);
    const { email, name, password } = parsedBody;

    if (!email || !name || !password) {
      return new NextResponse("Faltam dados", { status: 400 });
    }

    const userExisting = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExisting) {
      return new NextResponse("Usuário já cadastrado", { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.log(error, "REGISTRATION_ERROR");
    return new NextResponse("Erro interno", { status: 500 });
  }
}
