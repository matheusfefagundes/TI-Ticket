"use client";

import { ServiceDisable } from "@/components/DisableService";
import { PopupService } from "@/components/PopupService";
import { Button } from "@/components/ui/button";
import { statusServiceMap } from "@/utils/status-service";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type ServicesRow = {
  id: string;
  title: string;
  price: number;
  isActive: "active" | "disabled";
};

export const columns: ColumnDef<ServicesRow>[] = [
  {
    accessorKey: "title",
    header: () => <p className="text-app-gray-400 text-sm">Título</p>,
    cell: ({ row }) => {
      return (
        <p className="text-app-gray-200 truncate text-sm font-bold">
          {row.original.title}
        </p>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <p className="text-app-gray-400 text-sm">Valor</p>,
    cell: ({ row }) => {
      const formattedPrice = Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(row.original.price);

      return <p className="text-app-gray-200 text-sm">{formattedPrice}</p>;
    },
  },
  {
    accessorKey: "isActive",
    header: () => (
      <p className="text-app-gray-400 flex w-full justify-end text-sm">
        Status
      </p>
    ),
    cell: ({ row }) => {
      const status = statusServiceMap[row.original.isActive];

      return (
        <div className="flex w-full justify-end">
          <div className={`${status.bg} w-max rounded-2xl p-1.5`}>
            <p
              className={`${status.textColor} hidden text-xs font-bold md:block`}
            >
              {status.label}
            </p>
            <Image
              className="md:hidden"
              src={status.icon}
              alt={`Ícone de ${status.label}`}
              width={16}
              height={16}
            />
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex w-full items-center justify-end gap-2">
          <ServiceDisable
            isActive={row.original.isActive}
            serviceId={row.original.id}
          />
          <PopupService
            title="Serviço"
            serviceId={row.original.id}
            label={row.original.title}
            price={row.original.price}
          >
            <Button
              className="bg-app-gray-500 h-7 w-7 rounded-lg p-2"
              variant="ghost"
              asChild
            >
              <Image
                src="/icons/pen-line.svg"
                alt="Ícone de lápis"
                width={14}
                height={14}
              />
            </Button>
          </PopupService>
        </div>
      );
    },
  },
];
