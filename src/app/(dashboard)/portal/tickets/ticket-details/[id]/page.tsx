import { TicketDetails } from "@/components/ticket/TicketDetails";

export interface TicketDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function TicketDetailsPage({
  params,
}: TicketDetailsProps) {
  return <TicketDetails params={params} />;
}
