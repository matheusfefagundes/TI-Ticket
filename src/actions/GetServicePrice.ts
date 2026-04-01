"use server";

import { prisma } from "../lib/prisma";

interface GetServicePriceProps {
  serviceId: string;
}

export const GetServicePrice = async ({ serviceId }: GetServicePriceProps) => {
  const service = await prisma.service.findUnique({
    where: {
      id: serviceId,
    },
    select: {
      price: true,
    },
  });

  if (!service) throw new Error("Serviço não encontrado.");

  return service;
};
