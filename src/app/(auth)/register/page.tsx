"use client";

import { Form } from "@/components/Form";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterFormData, registerSchema } from "@/schemas/register";
import { useRegister } from "@/hooks/useRegister";

export default function RegisterPage() {
  const { isLoading, registerUser, apiError } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  return (
    <div className="w-full">
      <div className="border-app-gray-500 rounded-2xl border-2 p-4">
        <Form
          title="Crie sua conta"
          description="Informe seu nome, e-mail e senha"
          onSubmit={handleSubmit(registerUser)}
        >
          <Field>
            <FieldLabel
              htmlFor="name"
              className="text-app-gray-300 text-[10px] uppercase"
            >
              Nome
            </FieldLabel>
            <Input
              id="name"
              autoComplete="off"
              {...register("name")}
              placeholder="Digite seu nome completo"
              className="placeholder:text-md placeholder:text-app-gray-400 border-app-gray-500 rounded-none border-0 border-b px-0 focus-visible:ring-0"
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </Field>          
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
              className="placeholder:text-md placeholder:text-app-gray-400 border-app-gray-500 rounded-none border-0 border-b px-0 focus-visible:ring-0"
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </Field>

          <div className="grid grid-cols-2 gap-4">
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
                placeholder="Senha"
                className="placeholder:text-md placeholder:text-app-gray-400 border-app-gray-500 rounded-none border-0 border-b px-0 focus-visible:ring-0"
              />
              {!errors.password ? (
                <small className="text-app-gray-400 text-[10px] italic">
                  Mínimo de 6 dígitos
                </small>
              ) : (
                <span className="text-[10px] text-red-500">
                  {errors.password.message}
                </span>
              )}
            </Field>
            
            <Field>
              <FieldLabel
                htmlFor="passwordConfirm"
                className="text-app-gray-300 text-[10px] uppercase"
              >
                Confirme
              </FieldLabel>
              <Input
                id="passwordConfirm"
                autoComplete="off"
                {...register("confirmPassword")}
                type="password"
                placeholder="Repita a senha"
                className="placeholder:text-md placeholder:text-app-gray-400 border-app-gray-500 rounded-none border-0 border-b px-0 focus-visible:ring-0"
              />
              {!errors.confirmPassword ? (
                <small className="text-app-gray-400 text-[10px] italic">
                  Mínimo de 6 dígitos
                </small>
              ) : (
                <span className="text-[10px] text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </Field>
          </div>
          {apiError && (
            <div className="rounded border border-red-500 bg-red-500/10 p-2 text-center text-sm text-red-500">
              {apiError}
            </div>
          )}   
          <Field>
            <Button type="submit" variant="default" disabled={isLoading}>
              {isLoading ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </Field>
        </Form>
        <p className="text-app-gray-400 mt-4 text-center text-sm italic">
          Já tem uma conta ?{" "}
          <Link className="text-app-gray-200" href="/">
            Entrar
          </Link>{" "}
        </p>
      </div>
    </div>
  );
}