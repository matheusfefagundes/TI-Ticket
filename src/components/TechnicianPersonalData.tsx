"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import { NewTechnicianFormData } from "@/schemas/new-technician";
import { useTechnicianDetails } from "@/hooks/useTechnicianDetails";

export function TechnicianPersonalData() {
  const { params } = useTechnicianDetails();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext<NewTechnicianFormData>();

  return (
    <div className="border-app-gray-500 h-fit rounded-2xl border p-5 lg:col-span-2 lg:col-start-1 lg:grid">
      <FieldSet>
        <FieldLegend className="text-app-gray-200 text-[20px] font-bold">
          Dados pessoais
        </FieldLegend>
        <FieldDescription className="text-app-gray-300 text-xs">
          Defina as informações do perfil de técnico
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel
              htmlFor="name"
              className="text-app-gray-300 text-sm font-bold"
            >
              Nome
            </FieldLabel>
            <Input
              id="name"
              autoComplete="off"
              {...register("name")}
              disabled={!!params.id}
              placeholder="Nome completo"
              className="placeholder:text-md placeholder:text-app-gray-400"
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
              className="text-app-gray-300 text-sm font-bold"
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
          {!params.id ? (
            <Field>
              <FieldLabel
                htmlFor="password"
                className="text-app-gray-300 text-sm font-bold"
              >
                Senha
              </FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  {...register("password")}
                  placeholder="Defina a senha de acesso"
                  className="placeholder:text-md placeholder:text-app-gray-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-app-gray-400 hover:text-app-gray-200"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password ? (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              ) : (
                <small className="text-app-gray-400 text-xs italic">
                  Mínimo de 6 dígitos, com letras e números
                </small>
              )}
            </Field>
          ) : null}
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
