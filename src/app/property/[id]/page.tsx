"use client";

import { use, useEffect } from "react";
import { useProperty } from "@/features/properties/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROPERTY_TYPE_LABELS, PropertyType, PropertyStatus, PROPERTY_STATUS_LABELS } from "@/types/enums";
import { MapPin, Bed, Bath, Square, Calendar, User, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { property, isLoading, error, fetchProperty } = useProperty(id);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="text-center">Cargando propiedad...</div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container py-8">
        <div className="text-center text-red-500">
          {error || "Propiedad no encontrada"}
        </div>
      </div>
    );
  }

  const typeLabel = PROPERTY_TYPE_LABELS[property.property_type as PropertyType] || property.property_type;
  const statusLabel = PROPERTY_STATUS_LABELS[property.status as PropertyStatus] || property.status;

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">Galería de imágenes</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{property.title}</h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {property.address}, {property.municipality}
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">{typeLabel}</Badge>
              <Badge>{statusLabel}</Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Descripción</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap">{property.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Características</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {property.area_sqm > 0 && (
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <Square className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-2xl font-bold">{property.area_sqm}</div>
                    <div className="text-sm text-muted-foreground">m²</div>
                  </div>
                )}
                {property.rooms > 0 && (
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <Bed className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-2xl font-bold">{property.rooms}</div>
                    <div className="text-sm text-muted-foreground">Habitaciones</div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-2xl font-bold">{property.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Baños</div>
                  </div>
                )}
                {property.floors > 0 && (
                  <div className="text-center p-4 rounded-lg bg-muted">
                    <div className="text-2xl font-bold">{property.floors}</div>
                    <div className="text-sm text-muted-foreground">Plantas</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo</span>
                <span className="font-medium">{typeLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Municipio</span>
                <span className="font-medium">{property.municipality}</span>
              </div>
              {property.year_built && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Año de construcción</span>
                  <span className="font-medium">{property.year_built}</span>
                </div>
              )}
              {property.conservation_state && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estado de conservación</span>
                  <span className="font-medium">{property.conservation_state}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {property.receives_visits && (
            <Card>
              <CardHeader>
                <CardTitle>Agendar Visita</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  ¿Te gustaría visitar esta propiedad?
                </p>
                <Link href={`/dashboard/visits/new?property=${property.id}`} className="block">
                  <Button className="w-full" variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar Visita
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Contactar Vendedor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                ¿Tienes preguntas sobre esta propiedad?
              </p>
              <Link href={`/dashboard/messages?property=${property.id}`} className="block">
                <Button className="w-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Enviar Mensaje
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}