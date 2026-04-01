import { NewService } from "../actions/NewService";
import { UpdateService } from "../actions/UpdateService";
import { NewServiceFormData, newServiceSchema } from "../schemas/new-service";
import {
  UpdateServiceFormData,
  updateServiceSchema,
} from "../schemas/update-service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type ServicesData = NewServiceFormData | UpdateServiceFormData;

interface useServicesActionsProps {
  serviceId?: string;
  price?: number;
  label?: string;
}

export function useServicesActions({
  serviceId,
  label,
  price,
}: useServicesActionsProps) {
  const methods = useForm<ServicesData>({
    resolver: zodResolver(serviceId ? updateServiceSchema : newServiceSchema),
    defaultValues: {
      price,
      title: label,
    },
  });

  const { watch, setValue } = methods;

  const onSubmit = useCallback(async (data: NewServiceFormData) => {
    try {
      await NewService({ data });

      toast.success("Serviço criado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error(
        "Não foi possível criar um novo serviço. Tente novamente mais tarde.",
      );
    }
  }, []);

  const onUpdate = useCallback(
    async (data: UpdateServiceFormData) => {
      if (!serviceId) return;

      try {
        await UpdateService({ data, serviceId });

        toast.success("Serviço editado com sucesso");

        setValue("price", data.price);
        setValue("title", data.title);
      } catch (error) {
        console.log(error);
        toast.error(
          "Não foi possível editar o serviço. Tente novamente mais tarde.",
        );
      }
    },
    [setValue, serviceId],
  );

  const handleFormAction = useCallback(
    async (data: ServicesData) => {
      if (serviceId) {
        return await onUpdate(data as UpdateServiceFormData);
      } else {
        return await onSubmit(data as NewServiceFormData);
      }
    },
    [serviceId, onUpdate, onSubmit],
  );

  return {
    methods,
    handleFormAction,
    price: watch("price"),
    title: watch("title"),
  };
}
