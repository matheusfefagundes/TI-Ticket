import { DeleteService, DeleteServiceProps } from "../actions/DeleteService";
import { toast } from "sonner";

export function useDeleteService() {
  const onDelete = async ({
    serviceId,
    ticketId,
    ticketServiceId,
  }: DeleteServiceProps) => {
    try {
      await DeleteService({ serviceId, ticketId, ticketServiceId });

      toast.success("Serviço deletado com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error(
        "Não foi possível excluir o serviço agora. Tente novamente mais tarde.",
      );
    }
  };

  return {
    onDelete,
  };
}
