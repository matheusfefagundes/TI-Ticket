"use client";

import { BackBottom } from "@/components/BackBottom";
import { Button } from "@/components/ui/button";
import { useTechnicianProfile } from "@/hooks/useTechnicianProfile";
import { ReactNode } from "react";
import { FormProvider } from "react-hook-form";

export default function TechnicianProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { handleSave, methods } = useTechnicianProfile();

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSave)}
        className="space-y-4 px-6 py-7 lg:px-45.75 lg:py-13"
      >
        <div>
          <div className="lg:flex lg:items-center lg:justify-between">
            <div>
              <BackBottom className="has-[>svg]:px-0" />
              <h1 className="text-brand-dark text-xl font-bold">
                Perfil de técncico
              </h1>
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" type="button" className="flex-1">
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={methods.formState.isSubmitting}
              >
                {methods.formState.isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </div>
        </div>
        {children}
      </form>
    </FormProvider>
  );
}
