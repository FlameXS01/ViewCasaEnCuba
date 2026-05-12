"use client";

import { useEffect } from "react";
import { useVisits } from "@/features/visits/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VISIT_STATUS_LABELS, VisitStatus } from "@/types/enums";
import { formatDateTime } from "@/lib/utils";
import { Calendar, Check, X } from "lucide-react";

export default function VisitsPage() {
  const { visits, isLoading, error, fetchMyVisits, confirmVisit, completeVisit, cancelVisit } = useVisits();

  useEffect(() => {
    fetchMyVisits();
  }, [fetchMyVisits]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      [VisitStatus.PENDING]: "default",
      [VisitStatus.CONFIRMED]: "secondary",
      [VisitStatus.COMPLETED]: "outline",
      [VisitStatus.CANCELLED]: "destructive",
    };
    return variants[status] || "outline";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Mis Visitas</h1>
        <p className="text-muted-foreground mt-2">
          Gestiona tus visitas programadas
        </p>
      </div>

      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Cargando visitas...</div>
      ) : visits.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No tienes visitas programadas
        </div>
      ) : (
        <div className="space-y-4">
          {visits.map((visit) => (
            <Card key={visit.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Visita #{visit.id.slice(0, 8)}
                </CardTitle>
                <Badge variant={getStatusBadge(visit.status)}>
                  {VISIT_STATUS_LABELS[visit.status as VisitStatus] || visit.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Fecha:</span>{" "}
                    {formatDateTime(visit.scheduled_at)}
                  </div>
                  {visit.property && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Propiedad:</span>{" "}
                      {visit.property.title}
                    </div>
                  )}
                  {visit.note && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">Nota:</span>{" "}
                      {visit.note}
                    </div>
                  )}
                </div>
                {visit.status === VisitStatus.PENDING && (
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => confirmVisit(visit.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Confirmar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => cancelVisit(visit.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancelar
                    </Button>
                  </div>
                )}
                {visit.status === VisitStatus.CONFIRMED && (
                  <div className="mt-4">
                    <Button
                      size="sm"
                      onClick={() => completeVisit(visit.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Completar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}