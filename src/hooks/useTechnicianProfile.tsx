import { CreateTechnicians } from "@/actions/CreateTechnicians";
import { UpdateTechnicians } from "@/actions/UpdateTechnicians";
import {
  NewTechnicianFormData,
  newTechnicianSchema,
} from "@/schemas/new-technician";
import {
  UpdateTechnicianFormData,
  updateTechnicianSchema,
} from "@/schemas/update-technician";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type TechnicianFormValues = NewTechnicianFormData | UpdateTechnicianFormData;

export function useTechnicianProfile() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const isEditing = !!params.id;

  const methods = useForm<TechnicianFormValues>({
    resolver: zodResolver(
      isEditing ? updateTechnicianSchema : newTechnicianSchema,
    ),
    mode: "onTouched",
    defaultValues: {
      availabilities: [],
    } as TechnicianFormValues,
  });

  const handleSave = async (data: TechnicianFormValues) => {
    try {
      if (!params.id) {
        await CreateTechnicians(data as NewTechnicianFormData);

        toast.success("Técnico criado com sucesso!");
      } else {
        await UpdateTechnicians({
          userId: params.id,
          data: data as UpdateTechnicianFormData,
        });

        toast.success("Técnico atualizado com sucesso!");
      }

      setTimeout(() => {
        router.replace("/admin/users/technicians");
      }, 1000);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(
          "Não foi possível criar o técnico agora. Tente novamente mais tarde.",
        );
      }
    }
  };

  return {
    methods,
    handleSave,
  };
}
