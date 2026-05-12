import { PropertyForm } from "@/components/forms/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Nueva Propiedad</h1>
        <p className="text-muted-foreground mt-2">
          Publica una nueva propiedad en el marketplace
        </p>
      </div>
      <PropertyForm />
    </div>
  );
}