import { DeleteClient } from "@/actions/DeleteClient";
import { DisableTechnician } from "@/actions/DisableTechnician";
import { toast } from "sonner"; 

export function useUserActions(userId: string) {
  const disableTechnician = async () => {
    const result = await DisableTechnician({ userId });

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Técnico desativado com sucesso!"); 
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