"use client";

import { GetUniqueTechnician } from "../actions/GetUniqueTecnhinician";
import { useCallback, useEffect, useState } from "react";

export function useTechnicianAvailabilities(technicianId?: string) {
  const [availabilites, setAvailabilites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTechnician = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const user = await GetUniqueTechnician({ technicianId: id });
      const schedules = user.availabilities?.[0]?.schedules || [];
      setAvailabilites(schedules);
    } catch (error) {
      console.error("Erro ao buscar disponibilidades:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!technicianId) return;

    fetchTechnician(technicianId);
  }, [technicianId, fetchTechnician]);

  return {
    isLoading,
    availabilites,
  };
}
