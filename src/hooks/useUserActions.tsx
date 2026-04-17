import { DeleteClient } from "@/actions/DeleteClient";
import { DisableTechnician } from "@/actions/DisableTechnician";
import { toast } from "sonner"; 

export function useUserActions(userId: string) {
  const disableTechnician = async () => {
    try {
      await DisableTechnician({ userId });
      toast.success("Técnico desativado com sucesso!"); 
    } catch (error) {
      console.error(error);
      toast.error("Erro ao desativar o técnico. Tente novamente."); 
    }
  };

  const deleteClient = async () => {
    try {
      await DeleteClient({ userId });
      toast.success("Cliente excluído com sucesso!"); 
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir o cliente. Tente novamente.");
    }
  };

  return {
    disableTechnician,
    deleteClient,
  };
}