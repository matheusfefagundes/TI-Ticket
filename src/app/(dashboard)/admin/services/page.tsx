import { DataTable } from "@/components/DataTable";
import { PageContainer } from "@/components/PageContainer";
import { columns, ServicesRow } from "./columns";
import { GetServices } from "@/actions/GetServices";

export default async function ServicesPage() {
  const services = await GetServices();

  const formattedServices: ServicesRow[] = services.map((service) => {
    return {
      ...service,
      updatedAt: service.updatedAt?.toISOString(),
      createdAt: service.createdAt.toISOString(),
    };
  });
  return (
    <PageContainer title="Serviços">
      <DataTable columns={columns} data={formattedServices} />
    </PageContainer>
  );
}
