import { GetAllTicketServices } from "../actions/GetAllTicketServices";
import { PopupAdditionalServices } from "./PopupAdditionalServices";
import { GetAvailableServices } from "../actions/GetAvailableServices";
import { DeleteService } from "./DeleteService";

interface AdditionalServicesCardProps {
  ticketId: number;
}

export async function AdditionalServicesCard({
  ticketId,
}: AdditionalServicesCardProps) {
  const services = await GetAllTicketServices({ ticketId });
  const servicesCatalog = await GetAvailableServices();

  return (
    <div className="border-app-gray-500 h-fit rounded-lg border p-5 lg:col-span-3 lg:col-start-1">
      <div className="flex items-center justify-between">
        <h3 className="text-app-gray-400 text-xs font-bold">
          Serviços adicionais
        </h3>
        <PopupAdditionalServices ticketId={ticketId} data={servicesCatalog} />
      </div>
      <ul>
        {services.map((item, index) => {
          if (index === 0) return null;

          return (
            <li
              key={index}
              className={`border-app-gray-500 flex items-center justify-between py-3 ${index < services.length - 1 ? "border-b-2" : ""}`}
            >
              <strong className="text-app-gray-200 text-xs font-bold">
                {item.service.title}
              </strong>
              <div className="flex items-center gap-6">
                <p className="text-app-gray-200 text-xs">
                  R$ {item.service.price.toFixed(2).replace(".", ",")}
                </p>
                <DeleteService
                  ticketId={ticketId}
                  serviceId={item.service.id}
                  ticketServiceId={item.id}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
