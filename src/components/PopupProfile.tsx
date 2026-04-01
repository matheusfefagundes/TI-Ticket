import Image from "next/image";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Form } from "./Form";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "./ui/input";
import { ReactNode } from "react";
import { useTechnicianAvailabilities } from "../hooks/useTechnicianAvailabilities";
import { useUserImage } from "../hooks/useUserImage";
import { InitialsAvatar } from "./InitialsAvatar";
import { PopupChangePassword } from "./PopupChangePassword";

type PopupProfileProps = React.ComponentProps<"button"> & {
  children: ReactNode;
  className: string;
};

export function PopupProfile({
  children,
  className,
  ...rest
}: PopupProfileProps) {
  const { avatarUrl, handleUploadChange, session, handleDeleteImage } =
    useUserImage();

  const isTechnical = session?.user.role === "technical";

  const { availabilites, isLoading } = useTechnicianAvailabilities(
    isTechnical ? session?.user.id : undefined,
  );

  if (!session?.user.name || !session.user.email) return null;

  return (
    <Dialog>
      <DialogTrigger className={className} {...rest}>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-app-gray-600 border-0 p-0">
        <DialogHeader className="border-app-gray-500 border-b-2 px-7 py-5">
          <DialogTitle className="text-app-gray-200 font-bold">
            Perfil
          </DialogTitle>
        </DialogHeader>
        <Form>
          <FieldGroup className="border-app-gray-500 border-b-2 p-7">
            <Field>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={avatarUrl || ""} width={48} height={48} />
                  <AvatarFallback className="bg-app-gray-500 text-app-gray-200 font-bold">
                    <div className="bg-brand-dark hover:bg-brand-base flex h-10 w-10 cursor-pointer items-center justify-center rounded-full">
                      <InitialsAvatar name={session.user.name} />
                    </div>
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center gap-1">
                  <div className="relative">
                    <FieldLabel
                      htmlFor="upload"
                      className="text-app-gray-200 bg-app-gray-500 block w-full cursor-pointer rounded py-2.5 pr-2 pl-8 text-xs font-bold"
                    >
                      Nova imagem
                    </FieldLabel>
                    <Image
                      src="/icons/upload.svg"
                      alt="Ícone de upload"
                      width={14}
                      height={14}
                      className="pointer-events-none absolute top-1/2 left-2 -translate-y-1/2"
                    />
                    <Input
                      id="upload"
                      onChange={handleUploadChange}
                      type="file"
                      placeholder="Nova imagem"
                      className="hidden"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleDeleteImage}
                  >
                    <Image
                      src="/icons/trash.svg"
                      width={16}
                      height={16}
                      alt="Ícone de lixeira"
                    />
                  </Button>
                </div>
              </div>
            </Field>
            <Field>
              <FieldLabel
                htmlFor="name"
                className="text-app-gray-300 text-[10px] font-bold uppercase"
              >
                Nome
              </FieldLabel>
              <Input
                id="name"
                value={session.user.name}
                readOnly
                className="placeholder:text-md placeholder:text-app-gray-200 border-app-gray-500 rounded-none border-0 border-b-2 pl-6 shadow-md focus-visible:ring-0"
              />
            </Field>
            <Field>
              <FieldLabel
                htmlFor="email"
                className="text-app-gray-300 text-[10px] font-bold uppercase"
              >
                E-mail
              </FieldLabel>
              <Input
                id="email"
                value={session.user.email}
                readOnly
                className="placeholder:text-md placeholder:text-app-gray-200 border-app-gray-500 rounded-none border-0 border-b-2 pl-6 shadow-md focus-visible:ring-0"
              />
            </Field>
            <Field>
              <FieldLabel
                htmlFor="password"
                className="text-app-gray-300 text-[10px] font-bold uppercase"
              >
                Senha
              </FieldLabel>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value="••••••••"
                  readOnly
                  className="placeholder:text-md placeholder:text-app-gray-200 border-app-gray-500 rounded-none border-0 border-b-2 pl-6 shadow-md focus-visible:ring-0"
                />
                <div className="absolute top-0 right-0 flex items-center gap-2">
                  <PopupChangePassword userId={session.user.id} />
                </div>
              </div>
            </Field>
          </FieldGroup>
          {session.user.role === "technical" && (
            <div className="border-app-gray-500 border-b-2 px-7 pb-7">
              <h3 className="text-app-gray-200 text-sm font-bold">
                Disponibilidade
              </h3>
              <p className="text-app-gray-300 text-xs">
                Horários de atendimento definidos pelo admin
              </p>

              <div className="mt-3 flex flex-wrap gap-1">
                {isLoading ? (
                  <p className="text-app-gray-400 mt-3 text-xs">
                    Carregando horários...
                  </p>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {availabilites.map((hour, index) => (
                      <div
                        className="border-app-gray-500 rounded-2xl border p-1.5"
                        key={index}
                      >
                        <p className="text-app-gray-400 text-xs font-bold">
                          {hour}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="px-7 pb-7">
            <Button className="w-full">Salvar</Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
