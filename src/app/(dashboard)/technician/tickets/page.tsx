import { GetAllTickets } from "@/actions/GetAllTickets";
import { PageContainer } from "@/components/PageContainer";
import { TicketStatus } from "@/generated/prisma/enums";
import { statusMap } from "@/utils/status-ticket";
import Image from "next/image";
import { Tickets } from "@/components/Ticket";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function TicketsPage() {
  const session = await getServerSession(authOptions);

  const [ticketsInAttendence, ticketsOpen, ticketsClosed] = await Promise.all([
    GetAllTickets({
      status: TicketStatus.inAttendance,
      technicianId: session?.user.id,
    }),
    GetAllTickets({
      status: TicketStatus.open,
      technicianId: session?.user.id,
    }),
    GetAllTickets({
      status: TicketStatus.closed,
      technicianId: session?.user.id,
    }),
  ]);

  const sections = [
    {
      key: "inAttendance",
      data: ticketsInAttendence,
    },
    {
      key: "open",
      data: ticketsOpen,
    },
    {
      key: "closed",
      data: ticketsClosed,
    },
  ];

  return (
    <PageContainer
      title="Meus chamados"
      className="h-full space-y-0 overflow-y-auto pb-20 [&::-webkit-scrollbar]:hidden"
    >
      {ticketsInAttendence.length > 0 ||
      ticketsOpen.length > 0 ||
      ticketsClosed.length > 0 ? (
        sections.map((section) => {
          const status = statusMap[section.key as TicketStatus];

          if (section.key === "inAttendance" && section.data.length === 0)
            return null;
          if (section.key === "open" && section.data.length === 0) return null;
          if (section.key === "closed" && section.data.length === 0)
            return null;

          return (
            <div key={section.key}>
              <div
                className={`${status.bg} mt-4 flex w-max items-center gap-1.5 rounded-full p-1.5`}
              >
                <Image
                  src={status.icon}
                  alt={`Icone do status ${status.title}`}
                  width={20}
                  height={20}
                />
                <p className={`${status.colorText} text-xs`}>{status.title}</p>
              </div>
              {
                <div className="w-full">
                  <Tickets data={section.data} />
                </div>
              }
            </div>
          );
        })
      ) : (
        <div>
          <p className="text-app-gray-400 mt-4 text-sm">
            Nenhum chamado encontrado
          </p>
        </div>
      )}
    </PageContainer>
  );
}
