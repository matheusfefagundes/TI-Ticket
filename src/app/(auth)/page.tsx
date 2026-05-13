"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Form } from "@/components/Form";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, SignInFormData } from "@/schemas/login";
import { useLogin } from "@/hooks/useLogin";
import { useEffect } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  useEffect(() => {
    // 1. Verifica se a URL possui o parâmetro que o Proxy enviou
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("expired") === "true") {
      // 2. Dispara o toast vermelho
      toast.error("A sua sessão expirou. Por favor, faça login novamente.");

      // 3. Limpa a URL na barra de endereços (remove o ?expired=true)
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  const { loginAction } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="mx-6 h-auto lg:mx-auto lg:h-max lg:w-100">
      <div className="border-app-gray-500 rounded-2xl border-2 p-6">
        <Form
          title="Acesse o portal"
          description="Entre usando seu e-mail e senha cadastrados"
          onSubmit={handleSubmit(loginAction)}
        >
          <Field>
            <FieldLabel
              htmlFor="email"
              className="text-app-gray-300 text-[10px] uppercase"
            >
              E-mail
            </FieldLabel>
            <Input
              id="email"
              autoComplete="off"
              {...register("email")}
              placeholder="exemplo@email.com"
              className="placeholder:text-md placeholder:text-app-gray-400"
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </Field>
          <Field>
            <FieldLabel
              htmlFor="password"
              className="text-app-gray-300 text-[10px] uppercase"
            >
              Senha
            </FieldLabel>

            <div className="relative flex items-center">
              <Input
                id="password"
                autoComplete="off"
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                className="placeholder:text-md placeholder:text-app-gray-400 w-full pr-10"
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 flex items-center justify-center text-app-gray-400 hover:text-app-gray-200 transition-colors focus:outline-none"
                aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
              >
                {showPassword ? (
                  <EyeOff size={20} strokeWidth={2} />
                ) : (
                  <Eye size={20} strokeWidth={2} />
                )}
              </button>
            </div>

            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </Field>
          <Field>
            <Button variant="default" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </Field>
        </Form>
        <p className="text-app-gray-400 mt-6 text-center text-sm italic">
          Ainda não tem uma conta?{" "}
          <Link className="text-app-gray-200" href="/register">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
