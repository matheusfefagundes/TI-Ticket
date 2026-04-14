import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";
import { FormProvider } from "react-hook-form";
import { useClientProfile } from "@/hooks/useClientProfile";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { InitialsAvatar } from "./InitialsAvatar";
import { Input } from "./ui/input";

interface PopupClientProps {
  name: string;
  userId: string;
  email: string;
}

export function PopupClient({ name, userId, email }: PopupClientProps) {
  const { methods, onSubmit } = useClientProfile(email);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = methods;

  const handleUpdate = handleSubmit((data) => onSubmit(userId, data));

  return (
    <Dialog>
      <FormProvider {...methods}>
        <DialogTrigger asChild>
          <Button size="icon-sm" variant="ghost" className="bg-app-gray-500 hover:bg-app-gray-400 transition-colors">
            <Image
              src="/icons/pen-line.svg"
              alt="Ícone de lápis"
              width={14}
              height={14}
            />
          </Button>
        </DialogTrigger>
        <DialogContent
          className="bg-app-gray-600 mt-10 p-0"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader className="border-app-gray-500 border-b px-7 py-5">
            <DialogTitle>Cliente</DialogTitle>
          </DialogHeader>
          <FieldGroup className="px-7 py-5">
            <Field className="h-12 w-12">
              <div className="bg-brand-dark hover:bg-brand-base flex h-12 w-12 cursor-pointer items-center justify-center rounded-full">
                <InitialsAvatar name={name} />
              </div>
            </Field>
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
                value={name}
                disabled={true}
                placeholder="Nome completo"
                className="placeholder:text-md border-app-gray-500 placeholder:text-app-gray-400 rounded-none border-0 border-b-2 px-0 focus-visible:ring-0"
              />
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
                placeholder="example@email.com"
                className="placeholder:text-md border-app-gray-500 placeholder:text-app-gray-400 rounded-none border-0 border-b-2 px-0 focus-visible:ring-0"
              />
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </Field>
          </FieldGroup>
          <DialogFooter className="border-app-gray-500 border-t px-7 py-6">
            <Button
              variant="default"
              className="w-full"
              disabled={isSubmitting}
              onClick={handleUpdate}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
