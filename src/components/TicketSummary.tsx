import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useFormContext } from "react-hook-form";
import { NewTicketData } from "../schemas/new-ticket";
import { useEffect, useState } from "react";
import { GetServicePrice } from "../actions/GetServicePrice";
import { useNewTicket } from "../hooks/useNewTicket";

export function TicketSummary() {
  const {
    watch,
    formState: { isSubmitting },
  } = useFormContext<NewTicketData>();

  const { services } = useNewTicket();

  const [price, setPrice] = useState<string | number>("");

  const selectedServiceId = watch("service");

  const selectedService = services.find(
    (service) => service.id === selectedServiceId,
  );

  const formattedAmount = (value: string | number) => {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
      .format(Number(value))
      .replace("R$", "");
  };

  useEffect(() => {
    async function fetchPrice() {
      if (!selectedServiceId) {
        return setPrice("");
      }

      try {
        const fetchedPrice = await GetServicePrice({
          serviceId: selectedServiceId,
        });

        if (fetchedPrice && fetchedPrice.price !== undefined) {
          setPrice(fetchedPrice.price);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchPrice();
  }, [selectedServiceId]);

  return (
    <div className="border-app-gray-500 h-fit space-y-4 rounded-lg border-2 p-6 lg:col-span-2 lg:col-start-4">
      <div>
        <h3 className="text-app-gray-200 font-bold">Resumo</h3>
        <p className="text-app-gray-300 text-xs">Valores e detalhes</p>
      </div>
      <Field className="gap-0">
        <FieldLabel
          htmlFor="category"
          className="text-app-gray-400 text-xs font-bold"
        >
          Categoria de serviço
        </FieldLabel>
        <Input
          id="category"
          readOnly
          value={selectedService?.title || ""}
          className="placeholder:text-md placeholder:text-app-gray-400 text-app-gray-200 h-max border-0 px-0 shadow-none focus-visible:ring-0"
        />
      </Field>
      <Field>
        <FieldLabel
          htmlFor="initial-value"
          className="text-app-gray-400 text-xs font-bold"
        >
          Custo inicial
        </FieldLabel>
        <div className="relative">
          <span className="text-app-gray-200 absolute top-1/2 left-0 -translate-y-1/2 text-xs font-bold">
            R$
          </span>
          <Input
            id="initial-value"
            value={price && formattedAmount(price)}
            readOnly
            className="placeholder:text-md placeholder:text-app-gray-400 text-app-gray-200 border-0 text-lg! font-bold shadow-none focus-visible:ring-0"
          />
        </div>
      </Field>
      <div className="mt-6">
        <Button
          className="text-app-gray-600 w-full text-sm"
          disabled={isSubmitting}
        >
          Criar chamado
        </Button>
      </div>
    </div>
  );
}
