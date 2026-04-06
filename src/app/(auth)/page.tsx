"use client";

import Link from "next/link";

import { Form } from "@/components/Form";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, SignInFormData } from "@/schemas/login";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const { loginAction } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="mx-6 h-screen overflow-y-hidden lg:mx-auto lg:h-max lg:w-100">
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
              className="placeholder:text-md border-app-gray-500 placeholder:text-app-gray-400 rounded-none border-0 border-b px-0 focus-visible:ring-0"
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
            <Input
              id="password"
              autoComplete="off"
              {...register("password")}
              type="password"
              placeholder="Digite sua senha"
              className="placeholder:text-md border-app-gray-500 placeholder:text-app-gray-400 rounded-none border-0 border-b px-0 focus-visible:ring-0"
            />
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
          Ainda não tem uma conta ?{" "}
          <Link className="text-app-gray-200" href="/register">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
