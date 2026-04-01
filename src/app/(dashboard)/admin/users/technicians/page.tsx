import { GetAllUsers } from "@/actions/GetAllUsers";
import { PageContainer } from "@/components/PageContainer";
import { UserRole } from "@/generated/client/enums";
import { UsersTable } from "@/components/UsersTable";

export default async function TechnicianPage() {
  const technicians = await GetAllUsers(UserRole.technical);

  return (
    <PageContainer
      actionRef="/admin/users/technicians/technician-profile"
      title="Técnicos"
    >
      <UsersTable data={technicians} />
    </PageContainer>
  );
}
