"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { DeleteServiceProps } from "@/actions/DeleteService";
import { useDeleteService } from "@/hooks/useDeleteService";

export function DeleteService({
  serviceId,
  ticketId,
  ticketServiceId,
}: DeleteServiceProps) {
  const { onDelete } = useDeleteService();

  return (
    <Button
      variant="outline"
      size="icon-sm"
      className="bg-app-gray-500 rounded-lg hover:bg-app-gray-400 transition-colors"
      onClick={() => onDelete({ serviceId, ticketId, ticketServiceId })}
    >
      <Image
        src="/icons/trash.svg"
        width={14}
        height={14}
        alt="Ícone de lixeira"
      />
    </Button>
  );
}
