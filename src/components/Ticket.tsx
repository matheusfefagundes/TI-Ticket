import { statusMap } from "@/utils/status-ticket";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";
import { InitialsAvatar } from "./InitialsAvatar";
import { Button } from "./ui/button";
import { Prisma } from "@/generated/prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";

interface TicketsProps {
  data: Prisma.TicketGetPayload<{
    include: {
      client: true;
      ticketServices: {
        select: {
          priceSnapshot: true;
        };
      };
    };
  }>[];
}

export async function Tickets({ data }: TicketsProps) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {data?.map((ticket, index) => (
          <CarouselItem
            key={index}
            className="min-[1024px]:basis-1/2 min-[1440px]:basis-1/3"
          >
            <div className="p-1">
              <Card className="h-fit border-0">
                <CardContent className="border-app-gray-500 mb-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-app-gray-400 font-bold">
                      {String(ticket.id).padStart(5, "0")}
                    </strong>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="bg-app-gray-500 rounded-lg hover:bg-app-gray-400 transition-colors"
                        asChild
                      >
                        <Link href={`/technician/tickets/${ticket.id}`}>
                          <Image
                            src="/icons/pen-line.svg"
                            alt="Ícone de lápis"
                            width={16}
                            height={16}
                          />
                        </Link>
                      </Button>
                      <div className="bg-app-gray-200 flex items-center gap-1 rounded-lg p-1.5">
                        <Image
                          src={statusMap[ticket.status].iconWhite}
                          alt={`Ícone de ${statusMap[ticket.status].title}`}
                          width={14}
                          height={14}
                        />
                        <p className="text-app-gray-600 text-xs font-bold">
                          {statusMap[ticket.status].title}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-app-gray-100 mt-1 font-bold">
                    {ticket.title}
                  </h2>
                  <p className="text-app-gray-200 text-xs">
                    {ticket.description}
                  </p>

                  <div className="border-app-gray-500 mt-4 flex items-center justify-between border-b-2 pb-4">
                    <p className="text-app-gray-200 text-xs">
                      {format(ticket.createdAt, "dd/MM/yy HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                    <p className="text-app-gray-200 text-sm">
                      <span className="text-app-gray-200 text-[10px] font-bold">
                        R$ {"  "}
                      </span>
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })
                        .format(
                          ticket.ticketServices.reduce(
                            (total, service) => total + service.priceSnapshot,
                            0,
                          ),
                        )
                        .replace("R$", "")}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="bg-brand-dark hover:bg-brand-base flex h-6 w-6 cursor-pointer items-center justify-center rounded-full">
                        <InitialsAvatar
                          className="text-[8.75px]"
                          name={ticket.client.name}
                        />
                      </div>
                      <p className="text-app-gray-200 text-sm font-bold">
                        {ticket.client.name}
                      </p>
                    </div>
                    <div
                      className={`${statusMap[ticket.status].bg} rounded-full p-1.5`}
                    >
                      <Image
                        src={statusMap[ticket.status].icon}
                        alt={`Ícone de ${statusMap[ticket.status].title}`}
                        width={16}
                        height={16}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselNext className="hidden lg:flex" />
    </Carousel>
  );
}
