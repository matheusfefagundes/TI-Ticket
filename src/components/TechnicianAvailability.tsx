"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { TimeSlots } from "./TimeSlots";
import { useFormContext } from "react-hook-form";
import { NewTechnicianFormData } from "@/schemas/new-technician";

export function TechnicianAvailability() {
  const {
    formState: { errors },
  } = useFormContext<NewTechnicianFormData>();

  useEffect(() => {
    if (errors.availabilities?.message) {
      toast.error(errors.availabilities.message);
    }
  }, [errors.availabilities?.message]);

  return (
    <div className="border-app-gray-500 rounded-2xl border p-5 lg:col-span-3 lg:col-start-3 lg:grid lg:h-fit">
      <FieldSet>
        <FieldLegend className="text-app-gray-200 text-[20px] font-bold">
          Horários de atendimento
        </FieldLegend>
        <FieldDescription className="text-app-gray-300 text-xs">
          Selecione os horários de disponibilidade do técnico para atendimento
        </FieldDescription>
        
        {errors.availabilities && (
          <span className="text-xs text-red-500">
            {errors.availabilities.message}
          </span>
        )}
        
        <FieldGroup>
          <Field>
            <FieldLabel className="text-app-gray-300 text-sm font-bold">
              Manhã
            </FieldLabel>
            <TimeSlots init="07:00" end="12:00" />
          </Field>
          <Field>
            <FieldLabel className="text-app-gray-300 text-sm font-bold">
              Tarde
            </FieldLabel>
            <TimeSlots init="13:00" end="18:00" />
          </Field>
          <Field>
            <FieldLabel className="text-app-gray-300 text-sm font-bold">
              Noite
            </FieldLabel>
            <TimeSlots init="19:00" end="23:00" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  );
}