import { GetTicketUnique } from "@/actions/GetTicketUnique";
import { BackBottom } from "@/components/BackBottom";
import { TicketDetailsAside } from "@/components/TicketDetailsAside";
import { TicketInfoCard } from "@/components/TicketInfoCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { AttendanceActions } from "./AttendanceActions";

interface TicketDetailsProps {
  params: Promise<{ id: string }>;
  children?: ReactNode;
}

export async function TicketDetails({ params, children }: TicketDetailsProps) {
  const { id } = await params;

  const ticketId = Number(id);

  const session = await getServerSession(authOptions);

  if (!session) return null;

  if (isNaN(ticketId)) {
    return <div>ID inválido</div>;
  }

  const ticket = await GetTicketUnique({ ticketId });

  if (!ticket) return;

  return (
    <div className="mx-6 h-full space-y-6 pb-6 min-[1024px]:px-16 min-[1400px]:px-46 md:pt-13">
      <div className="grid justify-between gap-3 md:flex md:items-end">
        <div className="mt-7 md:mt-0">
          <BackBottom className="has-[>svg]:px-0" />
          <h1 className="text-brand-dark text-xl font-bold">
            Chamado detalhado
          </h1>
        </div>
        {session?.user.role !== "client" && (
          <AttendanceActions ticket={ticket} ticketId={ticketId} />
        )}
      </div>
      <div className="space-y-4 lg:grid lg:grid-cols-5 lg:gap-6">
        <TicketInfoCard data={ticket} />
        <TicketDetailsAside ticketId={ticketId} />
        {children}
      </div>
    </div>
  );
}
