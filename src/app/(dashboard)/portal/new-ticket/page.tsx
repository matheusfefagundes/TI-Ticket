"use client";

import { Form } from "@/components/Form";
import { NewTicketInfo } from "@/components/NewTicketInfo";
import { PageContainer } from "@/components/PageContainer";
import { TicketSummary } from "@/components/ticket/TicketSummary";
import { useNewTicket } from "@/hooks/useNewTicket";
import { NewTicketData, newTicketSchema } from "@/schemas/new-ticket";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { BackButtom } from "@/components/BackButtom";

export default function NewTicketPage() {
  const { onSubmit } = useNewTicket();

  const methods = useForm<NewTicketData>({
    resolver: zodResolver(newTicketSchema),
  });

  return (
    <PageContainer className="mb-8 lg:px-45.75">
      <div className="mt-7 md:mt-0">
        <BackButtom className="has-[>svg]:px-0" />
        <h1 className="text-brand-dark text-xl font-bold">Novo chamado</h1>
      </div>
      <FormProvider {...methods}>
        <Form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="grid gap-4 lg:grid-cols-5 lg:gap-6"
        >
          <NewTicketInfo />
          <TicketSummary />
        </Form>
      </FormProvider>
    </PageContainer>
  );
}
