"use client";

import { useFormContext } from "react-hook-form";
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

  const {
    register,
    clearErrors,
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
              onFocus={() => clearErrors("email")}
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
              <Input
                id="password"
                autoComplete="off"
                {...register("password")}
              onFocus={() => clearErrors("password")}
                placeholder="Defina a senha de acesso"
                className="placeholder:text-md placeholder:text-app-gray-400"
              />
              {errors.password ? (
                <span className="text-xs text-red-500">
                  {errors.password.message}
                </span>
              ) : (
                <small className="text-app-gray-400 text-xs italic">
                  Mínimo de 6 digítos
                </small>
              )}
            </Field>
          ) : null}
        </FieldGroup>
      </FieldSet>
    </div>
  );
}
