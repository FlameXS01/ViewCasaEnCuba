"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROPERTY_TYPE_LABELS, PropertyType } from "@/types/enums";
import { MapPin, Bed, Bath, Square, Calendar } from "lucide-react";
import type { PropertyDTO } from "@/types/api";

interface PropertyCardProps {
  property: PropertyDTO;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const typeLabel = PROPERTY_TYPE_LABELS[property.property_type as PropertyType] || property.property_type;

  return (
    <Link href={`/property/${property.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-video relative overflow-hidden bg-muted">
          {property.is_featured && (
            <Badge className="absolute top-2 left-2 z-10" variant="secondary">
              Destacado
            </Badge>
          )}
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-muted-foreground">Sin imagen</span>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold line-clamp-1">{property.title}</h3>
            <Badge variant="outline" className="shrink-0">
              {typeLabel}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{property.address}, {property.municipality}</span>
          </div>
          <div className="flex items-center gap-4 mt-3 text-sm">
            {property.rooms > 0 && (
              <span className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                {property.rooms}
              </span>
            )}
            {property.bathrooms > 0 && (
              <span className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                {property.bathrooms}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Square className="h-4 w-4" />
              {property.area_sqm} m²
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Creado {new Date(property.created_at).toLocaleDateString("es-ES")}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}