import { prisma } from "@/lib/prisma";
import { InitialsAvatar } from "../InitialsAvatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cn } from "@/lib/classMerge";

interface TicketDetailsAsideParams {
  ticketId: number;
}

export async function TicketDetailsAside({
  ticketId,
}: TicketDetailsAsideParams) {
  const session = await getServerSession(authOptions);

  const ticket = await prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      technician: true,
      ticketServices: {
        include: {
          service: true,
        },
      },
    },
  });

  if (!ticket) return;
  if (!session) return;

  return (
    <div className="border-app-gray-500 rounded-lg border p-5 lg:col-span-2 lg:col-start-4 lg:grid lg:min-h-77 lg:self-start">
      <small className="text-app-gray-400 text-xs font-bold">
        Técnico responsável
      </small>
      <div className="text-app-gray-600 mt-2 mb-8 flex items-center gap-2 lg:mt-0">
        <div className="bg-brand-dark flex h-8 w-8 items-center justify-center rounded-full text-sm">
          {<InitialsAvatar name={ticket.technician.name} />}{" "}
        </div>
        <div>
          <h3 className="text-app-gray-200 text-sm">
            {ticket.technician.name}
          </h3>
          <p className="text-app-gray-400 text-xs">{ticket.technician.email}</p>
        </div>
      </div>

      <small className="text-app-gray-400 text-xs font-bold">Valores</small>
      <div
        className={cn([
          "mb-4 flex items-center justify-between",
          session.user.role === "technical" && "mb-1",
        ])}
      >
        <p className="text-app-gray-200 text-xs">Preço base</p>
        <p className="text-app-gray-200 text-xs">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(Number(ticket.ticketServices[0].priceSnapshot))}
        </p>
      </div>

      {ticket.ticketServices.length > 2 &&
        (session.user.role === "admin" || session.user.role === "client") && (
          <>
            <small className="text-app-gray-400 text-xs font-bold">
              Adicionais
            </small>
            <div>
              {ticket.ticketServices.map((additional, index) => {
                if (index === 0) return null;
                return (
                  <div
                    key={additional.id}
                    className="flex items-center justify-between"
                  >
                    <p className="text-app-gray-200 text-xs">
                      {additional.service.title}
                    </p>
                    <p className="text-app-gray-200 text-xs">
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(additional.priceSnapshot)}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}

      {ticket.ticketServices.length > 2 &&
        session.user.role === "technical" && (
          <div className="flex items-center justify-between">
            <p className="text-app-gray-200 text-xs">Adicionais</p>
            <p className="text-app-gray-200 text-xs">
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL",
              }).format(
                Number(
                  ticket.ticketServices.reduce((acc, item, index) => {
                    if (index === 0) return acc;

                    return acc + item.priceSnapshot;
                  }, 0),
                ),
              )}
            </p>
          </div>
        )}

      <div className="border-app-gray-500 mt-4 flex items-center justify-between border-t">
        <h4 className="text-app-gray-200 pt-4 text-sm font-bold">Total</h4>
        <p className="text-app-gray-200 text-sm font-bold">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(
            Number(
              ticket.ticketServices.reduce((acc, item) => {
                return acc + item.priceSnapshot;
              }, 0),
            ),
          )}
        </p>
      </div>
    </div>
  );
}
