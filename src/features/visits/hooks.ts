import { useState, useCallback } from "react";
import { visitsApi } from "./api";
import type { VisitDTO, ScheduleVisitRequest } from "@/types/api";

export function useVisits() {
  const [visits, setVisits] = useState<VisitDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMyVisits = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await visitsApi.getMyVisits();
      setVisits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar visitas");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchPropertyVisits = useCallback(async (propertyId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await visitsApi.getPropertyVisits(propertyId);
      setVisits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar visitas");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const scheduleVisit = useCallback(async (payload: ScheduleVisitRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const visit = await visitsApi.schedule(payload);
      setVisits((prev) => [...prev, visit]);
      return visit;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al agendar visita");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const confirmVisit = useCallback(async (visitId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const visit = await visitsApi.confirm(visitId);
      setVisits((prev) => prev.map((v) => (v.id === visitId ? visit : v)));
      return visit;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al confirmar visita");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const completeVisit = useCallback(async (visitId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const visit = await visitsApi.complete(visitId);
      setVisits((prev) => prev.map((v) => (v.id === visitId ? visit : v)));
      return visit;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al completar visita");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const cancelVisit = useCallback(async (visitId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await visitsApi.cancel(visitId);
      setVisits((prev) => prev.filter((v) => v.id !== visitId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cancelar visita");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    visits,
    isLoading,
    error,
    fetchMyVisits,
    fetchPropertyVisits,
    scheduleVisit,
    confirmVisit,
    completeVisit,
    cancelVisit,
  };
}