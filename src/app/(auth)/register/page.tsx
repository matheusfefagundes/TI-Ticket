"use client";

import { Form } from "@/components/Form";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react"; 
import { Eye, EyeOff } from "lucide-react";

import { RegisterFormData, registerSchema } from "@/schemas/register";
import { useRegister } from "@/hooks/useRegister";

export default function RegisterPage() {
  const { isLoading, registerUser, apiError } = useRegister();
    const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div className="border-app-gray-500 rounded-2xl border-2 p-4">
        <Form
          title="Crie sua conta"
          description="Informe seu nome, e-mail e senha"
          onSubmit={handleSubmit(registerUser)}
        >
          {/* Campo Nome */}
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
              className="placeholder:text-md placeholder:text-app-gray-400"
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </Field>          

          {/* Campo E-mail */}
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

          <div className="grid grid-cols-2 gap-4">
            {/* Campo Senha */}
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
                  placeholder="Senha"
                  className="placeholder:text-md placeholder:text-app-gray-400 w-full pr-8"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 text-app-gray-400 hover:text-app-gray-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
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
            
            {/* Campo Confirme Senha */}
            <Field>
              <FieldLabel
                htmlFor="passwordConfirm"
                className="text-app-gray-300 text-[10px] uppercase"
              >
                Confirme
              </FieldLabel>
              <div className="relative flex items-center">
                <Input
                  id="passwordConfirm"
                  autoComplete="off"
                  {...register("confirmPassword")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Repita a senha"
                  className="placeholder:text-md placeholder:text-app-gray-400 w-full pr-8"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 text-app-gray-400 hover:text-app-gray-200"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
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
          Já tem uma conta?{" "}
          <Link className="text-app-gray-200" href="/">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}