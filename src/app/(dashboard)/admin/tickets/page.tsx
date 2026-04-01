import { TicketsTable, TicketRow } from "../../../../components/TicketsColumns";
import { DataTable } from "../../../../components/DataTable";
import { GetAllTickets } from "../../../../actions/GetAllTickets";
import { PageContainer } from "../../../../components/PageContainer";

export default async function TicketsPage() {
  const tickets = await GetAllTickets();

  const formattedTickets: TicketRow[] = tickets.map((ticket) => {
    const totalAmount = ticket.ticketServices.reduce((acc, item) => {
      return acc + (item.priceSnapshot || 0);
    }, 0);

    const servicesNames = ticket.ticketServices
      .map((item) => item.service.title)
      .join(", ");

    return {
      ...ticket,
      updatedAt: ticket.updatedAt?.toISOString(),
      openedAt: ticket.openedAt.toISOString(),
      closedAt: ticket.closedAt?.toISOString() || null,

      amount: totalAmount,
      serviceName: servicesNames,

      client: {
        ...ticket.client,
        createdAt: ticket.client.createdAt.toISOString(),
        updatedAt: ticket.client.updatedAt?.toISOString() || null,
        emailVerified: ticket.client.emailVerified?.toISOString() || null,
      },
      technician: {
        ...ticket.technician,
        createdAt: ticket.technician.createdAt.toISOString(),
        updatedAt: ticket.technician.updatedAt?.toISOString() || null,
        emailVerified: ticket.technician.emailVerified?.toISOString() || null,
      },
    };
  });

  return (
    <PageContainer title="Chamados">
      <TicketsTable data={formattedTickets} />
    </PageContainer>
  );
}
