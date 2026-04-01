import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { FormProvider } from "react-hook-form";
import { useServicesActions } from "../hooks/useServiceActions";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface PopupServiceProps {
  children: ReactNode;
  title: string;
  serviceId?: string;
  label?: string;
  price?: number;
}

export function PopupService({
  children,
  title,
  serviceId,
  label,
  price,
}: PopupServiceProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { methods, handleFormAction } = useServicesActions({
    serviceId,
    price,
    label,
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = methods;

  const handleAction = handleSubmit(async (data) => {
    await handleFormAction(data);

    if (!serviceId) {
      reset({
        title: "",
        price: "" as unknown as number,
      });
    }

    setIsOpen(false);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <FormProvider {...methods}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          className="bg-app-gray-600 border-0 p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader className="border-app-gray-500 border-b px-7 py-5">
            <DialogTitle className="text-app-gray-200 text-start font-bold">
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 px-7 pb-7">
            <Field>
              <FieldLabel
                htmlFor="title"
                className="text-app-gray-300 text-sm font-bold"
              >
                Título
              </FieldLabel>
              <Input
                id="title"
                autoComplete="off"
                {...register("title")}
                placeholder="Nome do serviço"
                className="placeholder:text-md border-app-gray-500 placeholder:text-app-gray-400 rounded-none border-0 border-b-2 px-0 focus-visible:ring-0"
              />
              {errors.title && (
                <span className="text-xs text-red-500">
                  {errors.title.message}
                </span>
              )}
            </Field>
            <Field>
              <FieldLabel
                htmlFor="value"
                className="text-app-gray-300 text-sm font-bold"
              >
                Valor
              </FieldLabel>
              <div className="relative flex items-center">
                <span className="absolute left-0">R$</span>
                <Input
                  id="value"
                  autoComplete="off"
                  {...register("price", { valueAsNumber: true })}
                  type="number"
                  placeholder="0,00"
                  className="placeholder:text-md border-app-gray-500 placeholder:text-app-gray-400 rounded-none border-0 border-b-2 pl-6 focus-visible:ring-0"
                />
              </div>
              {errors.price && (
                <span className="text-xs text-red-500">
                  {errors.price.message}
                </span>
              )}
            </Field>
          </div>

          <DialogFooter className="border-app-gray-500 border-t px-7 py-6">
            <Button
              variant="default"
              className="w-full"
              disabled={isSubmitting}
              onClick={handleAction}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
