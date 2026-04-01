"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldLabel } from "./ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { Form } from "./Form";
import {
  useAdditionalServicesProps,
  useAdditionalServices,
} from "../hooks/useAdditionalServices";

export function PopupAdditionalServices({
  data,
  ticketId,
}: useAdditionalServicesProps) {
  const {
    isOpen,
    setIsOpen,
    selectedServicePrice,
    setSelectedServiceId,
    onSubmit,
  } = useAdditionalServices({ data, ticketId });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="icon-sm">
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-app-gray-600 border-0 p-0">
        <DialogHeader className="border-app-gray-500 border-b px-7 py-5">
          <DialogTitle className="text-start">Serviço adicional</DialogTitle>
        </DialogHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Field className="px-7 pb-7">
            <FieldLabel htmlFor="name" className="text-app-gray-300 font-bold">
              Serviços
            </FieldLabel>
            <Select onValueChange={(value) => setSelectedServiceId(value)}>
              <SelectTrigger className="border-b-app-gray-500 cursor-pointer rounded-none border-0 border-b-2 px-0 outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0">
                <SelectValue
                  className="pl-4"
                  placeholder="Selecione um serviço"
                />
              </SelectTrigger>
              <SelectContent className="bg-app-gray-500 absolute bottom-16 left-2 h-50 w-full overflow-y-auto border-0">
                <SelectGroup>
                  <SelectLabel className="text-app-gray-300 text-[10px] font-bold uppercase">
                    Serviços disponíveis
                  </SelectLabel>
                  {data.map((item) => (
                    <SelectItem
                      className="text-app-gray-200 cursor-pointer"
                      key={item.id}
                      {...register("serviceId")}
                      value={item.id}
                    >
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field className="px-7 pb-7 shadow-2xs">
            <FieldLabel
              htmlFor="value"
              className="text-app-gray-300 text-[10px] font-bold uppercase"
            >
              Valor
            </FieldLabel>
            <div className="relative flex items-center">
              <span className="absolute left-0">R$</span>
              <Input
                id="value"
                autoComplete="off"
                value={selectedServicePrice}
                readOnly
                type="number"
                className="placeholder:text-md placeholder:text-app-gray-200 border-app-gray-500 rounded-none border-0 border-b-2 pl-6 shadow-md focus-visible:ring-0"
              />
            </div>
          </Field>
          <Field className="px-7 pb-7">
            <Button disabled={isSubmitting}>Salvar</Button>
          </Field>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
