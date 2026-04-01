"use client";

import { GetAllServices } from "../actions/GetAllServices";
import { GetAllUsers } from "../actions/GetAllUsers";
import { NewTicket } from "../actions/NewTicket";
import { UserRole } from "../generated/prisma/enums";
import { NewTicketData } from "../schemas/new-ticket";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Prisma, Service } from "../generated/prisma/client";
import { useRouter } from "next/navigation";

type TechnicianProps = Prisma.UserGetPayload<{
  include: {
    availabilities: {
      select: {
        schedules: true;
      };
    };
  };
}>;

type ServiceProps = Service;

export function useNewTicket() {
  const [services, setServices] = useState<ServiceProps[]>([]);
  const [technician, setTechnician] = useState<TechnicianProps[]>([]);

  const router = useRouter();

  const fetchServices = useCallback(async () => {
    try {
      const servicesAll = await GetAllServices();
      setServices(servicesAll);
    } catch (error) {
      console.log(error);
      toast.error("Não foi possível carregar os serviços agora.");
    }
  }, []);

  const onSubmit = async (data: NewTicketData) => {
    try {
      await NewTicket({ data: data, serviceId: data.service });
      toast.success("Chamado criado com sucesso!");

      router.replace("/portal/tickets");
    } catch (error) {
      console.log(error);
      toast.error(
        "Não foi possível criar o chamado agora. Tente novamente mais tarde.",
      );
    }
  };

  const fetchTechnicians = useCallback(async () => {
    try {
      const technicians = await GetAllUsers(UserRole.technical);

      setTechnician(technicians);
    } catch (error) {
      console.log(error);
      toast.error(
        "Não foi possível carregar os técnicos. Tente novamente mais tarde.",
      );
    }
  }, []);

  useEffect(() => {
    async function handleLoading() {
      fetchServices();
      fetchTechnicians();
    }

    handleLoading();

    console.log(services);
  }, [fetchServices, fetchTechnicians]);

  return {
    onSubmit,
    services,
    technician,
  };
}
