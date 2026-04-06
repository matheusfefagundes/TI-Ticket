import { TechnicianAvailability } from "@/components/TechnicianAvailability";
import { TechnicianPersonalData } from "@/components/TechnicianPersonalData";

export default function NewTechnician() {
  return (
    <div className="gap-6 space-y-4 lg:grid lg:grid-cols-5">
      <TechnicianPersonalData />
      <TechnicianAvailability />
    </div>
  );
}
