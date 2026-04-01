import { GetTicketUnique } from "../../../../../actions/GetTicketUnique";
import { TicketDetailsProps } from "@/app/(dashboard)/portal/tickets/ticket-details/[id]/page";
import { AdditionalServicesCard } from "@/components/AdditionalServicesCard";
import { TicketDetails } from "@/components/TicketDetails";

export default async function TicketsDetailsPage({
  params,
}: TicketDetailsProps) {
  const resolvedParams = await params;
  const ticketId = Number(resolvedParams.id);

  const ticket = await GetTicketUnique({ ticketId });

  if (!ticket) return null;

  return (
    <TicketDetails params={params}>
      <AdditionalServicesCard ticketId={ticket.id} />
    </TicketDetails>
  );
}
