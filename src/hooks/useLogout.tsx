import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export function useLogout() {
  const router = useRouter();

  async function logoutAction() {
    try {
      await signOut();

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao tentar sair da conta. Tente novamente mais tarde.");
    }
  }

  return {
    logoutAction,
  };
}
