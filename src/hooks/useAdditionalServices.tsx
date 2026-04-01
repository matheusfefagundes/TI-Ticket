import { useState } from "react";
import { UpdateTicket } from "../actions/UpdateTicket";
import { Service } from "../generated/prisma/client";
import { toast } from "sonner";

export interface useAdditionalServicesProps {
  data: Service[];
  ticketId: number;
}

export function useAdditionalServices({
  data,
  ticketId,
}: useAdditionalServicesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");

  const selectedServicePrice =
    data.find((item) => item.id.toString() === selectedServiceId)?.price || 0;

  const onSubmit = async () => {
    if (!selectedServiceId) {
      toast.error("Nenhum serviço selecionado!");
      return;
    }

    if (!ticketId) return;

    try {
      const response = await UpdateTicket({
        ticketId: ticketId,
        serviceId: selectedServiceId,
      });

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      setIsOpen(false);
      setSelectedServiceId("");
    } catch (error) {
      console.error(error);
      toast.error(
        "Não foi possível adicionar um serviço devido a um erro de conexão.",
      );
    }
  };

  return {
    isOpen,
    setIsOpen,
    selectedServicePrice,
    setSelectedServiceId,
    onSubmit,
  };
}
