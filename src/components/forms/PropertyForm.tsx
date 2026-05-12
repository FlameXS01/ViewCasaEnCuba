"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { propertySchema, type PropertyFormData } from "@/lib/schemas/property";
import { useCreateProperty } from "@/features/properties/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PropertyType } from "@/types/enums";

const propertyTypes = [
  { value: PropertyType.HOUSE, label: "Casa" },
  { value: PropertyType.APARTMENT, label: "Apartamento" },
  { value: PropertyType.LAND, label: "Terreno" },
  { value: PropertyType.PENTHOUSE, label: "Penthouse" },
  { value: PropertyType.DUPLEX, label: "Dúplex" },
];

export function PropertyForm() {
  const router = useRouter();
  const { createProperty, isLoading, error } = useCreateProperty();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  const onSubmit = async (data: PropertyFormData) => {
    try {
      const property = await createProperty(data);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/dashboard/properties/${property.id}`);
      }, 1500);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {success && (
        <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md">
          Propiedad creada correctamente
        </div>
      )}
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
          <CardDescription>
            Datos principales de la propiedad
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" placeholder="Casa moderna en Centro Habana" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe tu propiedad en detalle..."
              rows={5}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="property_type">Tipo de Propiedad</Label>
            <Select
              id="property_type"
              options={propertyTypes}
              placeholder="Selecciona el tipo"
              {...register("property_type")}
            />
            {errors.property_type && (
              <p className="text-sm text-red-500">{errors.property_type.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ubicación</CardTitle>
          <CardDescription>Dirección y ubicación geográfica</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input id="address" placeholder="Calle 123 #456" {...register("address")} />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="municipality">Municipio</Label>
            <Input id="municipality" placeholder="Habana del Este" {...register("municipality")} />
            {errors.municipality && (
              <p className="text-sm text-red-500">{errors.municipality.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitud</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                placeholder="23.1136"
                {...register("latitude", { valueAsNumber: true })}
              />
              {errors.latitude && (
                <p className="text-sm text-red-500">{errors.latitude.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitud</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                placeholder="-82.3666"
                {...register("longitude", { valueAsNumber: true })}
              />
              {errors.longitude && (
                <p className="text-sm text-red-500">{errors.longitude.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Características</CardTitle>
          <CardDescription>Detalles de la propiedad</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="area_sqm">Área (m²)</Label>
            <Input
              id="area_sqm"
              type="number"
              placeholder="150"
              {...register("area_sqm", { valueAsNumber: true })}
            />
            {errors.area_sqm && (
              <p className="text-sm text-red-500">{errors.area_sqm.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rooms">Habitaciones</Label>
              <Input
                id="rooms"
                type="number"
                placeholder="3"
                {...register("rooms", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Baños</Label>
              <Input
                id="bathrooms"
                type="number"
                placeholder="2"
                {...register("bathrooms", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kitchens">Cocinas</Label>
              <Input
                id="kitchens"
                type="number"
                placeholder="1"
                {...register("kitchens", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="floors">Plantas</Label>
              <Input
                id="floors"
                type="number"
                placeholder="2"
                {...register("floors", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year_built">Año de Construcción</Label>
              <Input
                id="year_built"
                type="number"
                placeholder="2020"
                {...register("year_built", { valueAsNumber: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="conservation_state">Estado de Conservación</Label>
              <Input
                id="conservation_state"
                placeholder="Excelente"
                {...register("conservation_state")}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creando..." : "Crear Propiedad"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}