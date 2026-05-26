"use client";

import { Prisma } from "@/generated/prisma/client";
import { cn } from "@/lib/classMerge";
import { statusMap } from "@/utils/status-ticket";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { InitialsAvatar } from "../InitialsAvatar";
import { useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface TicketInfoCardProps {
  data: Prisma.TicketGetPayload<{
    select: {
      id: true;
      status: true;
      title: true;
      description: true;
      createdAt: true;
      updatedAt: true;
      ticketServices: {
        select: {
          service: {
            select: {
              title: true;
            };
          };
        };
      };
      client: true;
      technician: true;
    };
  }>;
  className?: string;
}

export function TicketInfoCard({ data, className }: TicketInfoCardProps) {
  const { data: session } = useSession();

  const statusValue = statusMap[data.status];

  const createdAt = format(data.createdAt, "dd/MM/yy HH:mm", {
    locale: ptBR,
  });
  const updatedAt = format(data.updatedAt as Date, "dd/MM/yy HH:mm", {
    locale: ptBR,
  });

  return (
    <div
      className={cn([
        "border-app-gray-500 space-y-4 overflow-hidden rounded-lg border p-6 lg:col-span-3 lg:col-start-1 lg:grid",
        className,
      ])}
    >
      <div>
        <div className="flex justify-between">
          <p className="text-app-gray-300 text-xs font-bold">
            {String(data.id).padStart(5, "0")}
          </p>
          <div
            className={`flex items-center gap-1.5 rounded-2xl p-1.5 ${statusValue.bg}`}
          >
            <Image
              src={statusValue.icon}
              alt={statusValue.title}
              width={16}
              height={16}
            />
            <p className={`${statusValue.colorText} text-xs font-bold`}>
              {statusValue.title}
            </p>
          </div>
        </div>
        <h2 className="text-app-gray-200 text-[16px] font-bold">
          {data.title}
        </h2>
      </div>

      <div className="min-w-0">
        <small className="text-app-gray-400 text-xs font-bold">Descrição</small>
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="text-app-gray-200 truncate cursor-pointer text-sm">
              {data.description}
            </p>
          </TooltipTrigger>
          <TooltipContent side="top" align="start" className="max-w-sm">
            {data.description}
          </TooltipContent>
        </Tooltip>
      </div>

      <div>
        <small className="text-app-gray-400 text-xs font-bold">Categoria</small>
        <p className="text-app-gray-200 text-sm">
          {data.ticketServices[0].service.title}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <small className="text-app-gray-400 text-xs font-bold">
            Criado em
          </small>
          <p className="text-app-gray-200 text-sm">{createdAt}</p>
        </div>
        <div>
          <small className="text-app-gray-400 text-xs font-bold">
            Atualizado em
          </small>
          <p className="text-app-gray-200 text-sm">{updatedAt}</p>
        </div>
      </div>

      {session?.user.role !== "client" && (
        <div>
          <small className="text-app-gray-400 text-xs font-bold">Cliente</small>
          <div className="text-app-gray-600 mt-2 flex items-center gap-2">
            <div className="bg-brand-dark flex h-5 w-5 items-center justify-center rounded-full">
              {
                <InitialsAvatar
                  className="text-[8.75px]"
                  name={data.client.name}
                />
              }{" "}
            </div>
            <h3 className="text-app-gray-200 text-sm">{data.client.name}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
