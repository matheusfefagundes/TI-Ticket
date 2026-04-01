"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { TicketStatus } from "../generated/prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { statusMap } from "../utils/status-ticket";
import Image from "next/image";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { DataTable } from "../components/DataTable";
import { useIsRoute } from "../hooks/useIsRoute";

type UserSimple = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
};

export type TicketRow = {
  id: number;
  title: string;
  service?: string;
  status: TicketStatus;

  serviceName: string;
  amount: number;

  updatedAt?: string;
  openedAt: string;
  closedAt: string | null;

  client: UserSimple;
  technician: UserSimple;
};

type TicketRowData = {
  data: TicketRow[];
};

export function TicketsTable({ data }: TicketRowData) {
  const isRoute = useIsRoute({ ref: "/portal/tickets" });

  const isRef = isRoute
    ? "/portal/tickets/ticket-details/"
    : "/admin/tickets/ticket-details/";
  const isIcon = isRoute ? "/icons/eye.svg" : "/icons/pen-line.svg";

  const columns: ColumnDef<TicketRow>[] = [
    {
      accessorKey: "updatedAt",
      header: () => (
        <p className="text-app-gray-400 w-17.5 truncate text-sm md:w-full">
          Atualizado em
        </p>
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue("updatedAt"));

        return (
          <p className="text-app-gray-200 w-17.5 text-xs whitespace-normal md:w-full">
            {format(date, "dd/MM/yy HH:mm", {
              locale: ptBR,
            })}
          </p>
        );
      },
    },
    {
      accessorKey: "id",
      header: () => (
        <p className="text-app-gray-400 hidden text-sm lg:table-cell">Id</p>
      ),
      meta: { className: "hidden lg:table-cell" },
      cell: ({ row }) => {
        const id = row.getValue("id") as number;

        return (
          <p className="text-app-gray-200 text-xs font-bold">
            {id.toString().padStart(5, "0")}
          </p>
        );
      },
    },
    {
      accessorKey: "title",
      header: () =>
        isRoute ? (
          <p className="text-app-gray-400 text-sm">Título</p>
        ) : (
          <p className="text-app-gray-400 text-sm">Título e serviço</p>
        ),
      cell: ({ row }) => {
        const title = row.original.title;
        const service = row.original.serviceName;

        return (
          <div className="grid">
            <p className="text-app-gray-200 truncate text-sm font-bold">
              {title}
            </p>
            {!isRoute && (
              <p className="text-app-gray-200 truncate text-xs">{service}</p>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "service",
      header: () =>
        isRoute ? <p className="text-app-gray-400 text-sm">Serviço</p> : null,
      cell: ({ row }) => {
        const service = row.original.serviceName;

        if (!isRoute) return null;

        return (
          <div className="grid w-full">
            <p className="text-app-gray-200 truncate text-xs">{service}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => (
        <p className="text-app-gray-400 hidden text-sm md:table-cell">
          Valor total
        </p>
      ),
      meta: { className: "hidden md:table-cell" },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(amount);

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "client",
      header: () =>
        !isRoute && (
          <p className="text-app-gray-400 hidden text-sm md:table-cell">
            Cliente
          </p>
        ),
      meta: { className: "hidden md:table-cell" },
      cell: ({ row }) => {
        const name = row.original.client.name.split(" ");
        const initals = name.map((letter) => letter.charAt(0).toUpperCase());

        return (
          !isRoute && (
            <div className="hidden items-center gap-2 md:flex">
              <div className="bg-brand-dark text-app-gray-600 flex h-5 w-5 items-center justify-center rounded-full text-[8.75px]">
                {initals}
              </div>
              <p className="text-app-gray-200 text-sm">
                {row.original.client.name}
              </p>
            </div>
          )
        );
      },
    },
    {
      accessorKey: "technician",
      header: () => (
        <p className="text-app-gray-400 hidden text-sm md:table-cell">
          Técnicos
        </p>
      ),
      meta: { className: "hidden md:table-cell" },
      cell: ({ row }) => {
        const name = row.original.technician.name.split(" ");
        const initals = name.map((letter) => letter.charAt(0).toUpperCase());

        return (
          <div className="hidden items-center gap-2 md:flex">
            <div className="bg-brand-dark text-app-gray-600 flex h-5 w-5 items-center justify-center rounded-full text-[8.75px]">
              {initals}
            </div>
            <p className="text-app-gray-200 text-sm">
              {row.original.technician.name}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <p className="text-app-gray-400 text-sm">Status</p>,
      cell: ({ row }) => {
        const statusValue = row.getValue("status") as TicketStatus;

        const statusConfig = statusMap[statusValue];

        return (
          <div
            className={`flex w-max items-center justify-center gap-1.5 rounded-2xl p-1.5 ${statusConfig.bg}`}
          >
            <Image
              src={statusConfig.icon}
              alt={statusConfig.title}
              width={16}
              height={16}
            />
            <p
              className={`hidden text-xs font-bold lg:table-cell ${statusConfig.colorText}`}
            >
              {statusConfig.title}
            </p>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        return (
          <Button
            className="bg-app-gray-500 h-7 w-7 rounded-lg p-2"
            variant="ghost"
            asChild
          >
            <Link href={`${isRef}${(row.original as TicketRow).id}`}>
              <Image src={isIcon} alt="Ícone de lápis" width={14} height={14} />
            </Link>
          </Button>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
