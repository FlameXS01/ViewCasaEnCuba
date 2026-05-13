"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useProperties } from "@/features/properties/hooks";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useAuthStore } from "@/features/auth/store";

export default function DashboardPropertiesPage() {
  const { user } = useAuthStore();
  const isSeller = user?.role === "seller" || user?.role === "admin";
  const { properties, isLoading, fetchProperties } = useProperties();

  useEffect(() => {
    fetchProperties({ per_page: 50 });
  }, [fetchProperties]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Mis Propiedades</h1>
          <p className="text-muted-foreground mt-2">
            Gestiona tus propiedades publicadas
          </p>
        </div>
        {isSeller && (
          <Link href="/dashboard/my-properties/new">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Nueva Propiedad
            </Button>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-8">Cargando propiedades...</div>
      ) : properties.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            No tienes propiedades publicadas
          </p>
          {isSeller && (
            <Link href="/dashboard/my-properties/new">
              <Button variant="outline">
                <PlusCircle className="h-4 w-4 mr-2" />
                Crear primera propiedad
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}