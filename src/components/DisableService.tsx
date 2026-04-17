"use client"; 

import Image from "next/image";
import { Button } from "./ui/button";
import { statusServiceMap } from "@/utils/status-service";
import { ServiceStatus } from "@/generated/prisma/enums";
import { DisableService } from "@/actions/DisableService";
import { toast } from "sonner";

interface ServiceDisableProps {
  isActive: ServiceStatus;
  serviceId: string;
}

export function ServiceDisable({ isActive, serviceId }: ServiceDisableProps) {
  const status = statusServiceMap[isActive];

  const disableService = async () => {
    try {
      await DisableService({ serviceId });
      toast.success("Status do serviço atualizado com sucesso!"); 
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível alterar o status do serviço.");
    }
  };

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2"
      onClick={() => disableService()}
    >
      <Image
        width={14}
        height={14}
        src={status.config.icon}
        alt={`Ícone de ${status.config.label}`}
      />
      <p className="text-app-gray-300 hidden text-xs font-bold md:block">
        {status.config.label}
      </p>
    </Button>
  );
}