"use client";

import { Field, FieldLabel } from "./ui/field";
import { useNewTicket } from "../hooks/useNewTicket";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Controller, useFormContext } from "react-hook-form";
import { NewTicketData } from "../schemas/new-ticket";

export function NewTicketInfo() {
  const { services, technician } = useNewTicket();

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<NewTicketData>();

  return (
    <div className="border-app-gray-500 space-y-4 rounded-lg border-2 p-6 lg:col-span-3 lg:col-start-1">
      <div className="grid gap-1">
        <h2 className="text-app-gray-200 font-bold">Informações</h2>
        <p className="text-app-gray-200 text-xs">
          Configure os dias e horários em que você está disponível para atender
          chamados
        </p>
      </div>
      <Field>
        <FieldLabel
          htmlFor="title"
          className="text-app-gray-300 text-[10px] font-bold uppercase"
        >
          Título
        </FieldLabel>
        <Input
          id="title"
          {...register("title")}
          placeholder="Digite um título para o chamado"
          className="placeholder:text-md placeholder:text-app-gray-400 border-app-gray-500 text-app-gray-200 truncate rounded-none border-0 border-b-2 focus-visible:ring-0"
        />
        {errors.title && (
          <p className="text-xs text-red-600">{errors.title.message}</p>
        )}
      </Field>
      <Field>
        <FieldLabel
          htmlFor="description"
          className="text-app-gray-300 text-[10px] font-bold uppercase"
        >
          Descrição
        </FieldLabel>
        <Textarea
          id="description"
          {...register("description")}
          rows={6}
          className="border-app-gray-500 text-app-gray-200 resize-none! border-0 border-b-2"
          maxLength={200}
          placeholder="Descreva o que está acontecendo"
        />
        {errors.description && (
          <p className="text-xs text-red-600">{errors.description.message}</p>
        )}
      </Field>
      <Field>
        <FieldLabel className="text-app-gray-300 text-[10px] font-bold uppercase">
          Categoria de serviço
        </FieldLabel>
        <Controller
          name="service"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="border-app-gray-500 w-full border-0 border-b-2 focus-visible:ring-0">
                <SelectValue placeholder="Selecione um serviço" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="bg-app-gray-500 h-50 max-h-50 w-full overflow-y-auto border-0 focus:outline-none"
              >
                <SelectGroup>
                  <SelectLabel>Serviços</SelectLabel>
                  {services.map((service, index) => (
                    <SelectItem
                      className="text-app-gray-200 cursor-pointer"
                      key={index}
                      value={service.id}
                    >
                      {service.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.service && (
          <p className="text-xs text-red-600">{errors.service.message}</p>
        )}
      </Field>
      <Field>
        <FieldLabel className="text-app-gray-300 text-[10px] font-bold uppercase">
          Técnicos disponíveis
        </FieldLabel>
        <Controller
          name="technicianId"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="border-app-gray-500 w-full border-0 border-b-2 focus-visible:ring-0">
                <SelectValue placeholder="Selecione um técnico" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="bg-app-gray-500 h-50 max-h-50 w-full overflow-y-auto border-0 focus:outline-none"
              >
                <SelectGroup>
                  <SelectLabel>Técnicos</SelectLabel>
                  {technician.map((user, index) => (
                    <SelectItem
                      className="text-app-gray-200 cursor-pointer"
                      key={index}
                      value={user.id}
                    >
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.technicianId && (
          <p className="text-xs text-red-600">{errors.technicianId.message}</p>
        )}
      </Field>
    </div>
  );
}
