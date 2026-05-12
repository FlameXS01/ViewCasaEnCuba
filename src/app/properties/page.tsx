"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useProperties } from "@/features/properties/hooks";
import { PropertyCard } from "@/components/property/PropertyCard";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyType } from "@/types/enums";

const propertyTypes = [
  { value: "", label: "Todos los tipos" },
  { value: PropertyType.HOUSE, label: "Casa" },
  { value: PropertyType.APARTMENT, label: "Apartamento" },
  { value: PropertyType.LAND, label: "Terreno" },
  { value: PropertyType.PENTHOUSE, label: "Penthouse" },
  { value: PropertyType.DUPLEX, label: "Dúplex" },
];

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const { properties, isLoading, error, fetchProperties } = useProperties();
  const [filters, setFilters] = useState({
    property_type: searchParams.get("property_type") || "",
    municipality: "",
    page: 1,
  });

  useEffect(() => {
    const type = searchParams.get("property_type");
    if (type) {
      setFilters((prev) => ({ ...prev, property_type: type }));
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProperties(filters);
  }, [filters, fetchProperties]);

  const handleSearch = () => {
    fetchProperties({ ...filters, page: 1 });
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Propiedades</h1>
        <p className="text-muted-foreground mt-2">
          Explora todas las propiedades disponibles en Cuba
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Select
          options={propertyTypes}
          placeholder="Tipo de propiedad"
          value={filters.property_type}
          onChange={(e) =>
            setFilters({ ...filters, property_type: e.target.value })
          }
          className="w-full md:w-48"
        />
        <Input
          placeholder="Municipio"
          value={filters.municipality}
          onChange={(e) =>
            setFilters({ ...filters, municipality: e.target.value })
          }
          className="w-full md:w-48"
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>

      {error && (
        <div className="p-4 mb-4 text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Cargando propiedades...</div>
      ) : properties.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No se encontraron propiedades
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}