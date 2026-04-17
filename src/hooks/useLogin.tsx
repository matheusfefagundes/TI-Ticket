import { SignInFormData } from "@/schemas/login";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { Session } from "next-auth";

export function useLogin() {
  const router = useRouter();

  async function loginAction(values: SignInFormData) {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (response?.error) {
        toast.error("E-mail e/ou senha inválidos.");
        return;
      }

      toast.success("Login realizado com sucesso!");

      // Aguarda um pouco para a sessão ser atualizada
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Busca a sessão atualizada
      const session = (await getSession()) as Session | null;

      let redirectUrl = "/portal/tickets"; // padrão para cliente

      if (session?.user?.role === "admin") {
        redirectUrl = "/admin/tickets"; // padrão para admin
      } else if (session?.user?.role === "technical") {
        redirectUrl = "/technician/tickets"; // padrão para technician
      }

      router.replace(redirectUrl);
      router.refresh();
    } catch (error) {
      console.log(error);

      toast.error("Erro ao tentar fazer login. Tente novamente mais tarde.");
    }
  }

  return {
    loginAction,
  };
}