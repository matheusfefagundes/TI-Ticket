"use client";

import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { DisableTechnician } from "@/actions/DisableTechnician";
import { useIsRoute } from "@/hooks/useIsRoute";
import { DeleteClient } from "@/actions/DeleteClient";
import { useUserActions } from "@/hooks/useUserActions";

interface DeleteUserProps {
  name: string;
  userId: string;
}

export function DeleteUser({ name, userId }: DeleteUserProps) {
  const isClient = useIsRoute({ ref: "/admin/users/clients" });

  const { deleteClient, disableTechnician } = useUserActions(userId);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon-sm" variant="ghost" className="bg-app-gray-500 rounded-lg hover:bg-app-gray-400 transition-colors">
          <Image
            src="/icons/trash.svg"
            alt="Ícone de lixeira"
            width={14}
            height={14}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-app-gray-600 p-0">
        <DialogHeader className="border-app-gray-500 flex w-full items-center justify-between border-b px-7 py-5">
          {isClient ? (
            <DialogTitle className="strong text-app-gray-200 mr-auto text-base">
              Excluir cliente
            </DialogTitle>
          ) : (
            <DialogTitle className="strong text-app-gray-200 mr-auto text-base">
              Desativar técnico
            </DialogTitle>
          )}
        </DialogHeader>

        <div className="border-app-gray-500 border-b px-7 pb-7">
          {isClient ? (
            <h2 className="text-app-gray-200 mb-5">
              Deseja realmente excluir{" "}
              <strong className="text-app-gray-200 font-bold">{name}</strong> ?
            </h2>
          ) : (
            <h2 className="text-app-gray-200 mb-5">
              Deseja realmente desativar{" "}
              <strong className="text-app-gray-200 font-bold">{name}</strong> ?
            </h2>
          )}

          {isClient ? (
            <p className="text-app-gray-200">
              Ao excluir, todos os chamados deste cliente serão removidos e esta
              ação não poderá ser desfeita.
            </p>
          ) : (
            <p className="text-app-gray-200">
              Ao desativar, este técnico não poderá mais acessar o sistema ou
              receber novos chamados. O histórico de atendimentos realizados
              será mantido para consulta.
            </p>
          )}
        </div>

        <div className="flex gap-1 px-7 pb-6">
          <DialogClose asChild>
            <Button
              className="bg-app-gray-500 flex-1 rounded-lg"
              variant="ghost"
              type="button"
            >
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            {isClient ? (
              <Button
                className="flex-1 rounded-lg"
                variant="default"
                type="button"
                onClick={() => deleteClient()}
              >
                Excluir
              </Button>
            ) : (
              <Button
                className="flex-1 rounded-lg"
                variant="default"
                type="button"
                onClick={() => disableTechnician()}
              >
                Desativar
              </Button>
            )}
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
