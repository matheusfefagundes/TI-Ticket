import { GetAllUsers } from "@/actions/GetAllUsers";
import { PageContainer } from "@/components/PageContainer";
import { UserRole } from "@/generated/client/enums";
import { UsersTable } from "@/components/UsersTable";

export default async function TechnicianPage() {
  const clients = await GetAllUsers(UserRole.client);

  return (
    <PageContainer title="Clientes">
      <UsersTable data={clients} />
    </PageContainer>
  );
}
