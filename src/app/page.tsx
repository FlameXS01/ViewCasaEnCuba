import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Home, Building2, MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative flex items-center justify-center min-h-[600px] bg-gradient-to-b from-muted/50 to-background">
        <div className="container px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Encuentra tu hogar ideal en Cuba
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Explora miles de propiedades en venta y alquiler en toda Cuba. 
            Casas, apartamentos, terrenos y más.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button size="lg" className="gap-2">
                <Search className="h-4 w-4" />
                Explorar Propiedades
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">
                Publicar Propiedad
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Qué buscas?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/properties?property_type=house" className="group">
              <div className="p-8 rounded-lg border bg-card text-center transition-all group-hover:shadow-lg">
                <Home className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Casas</h3>
                <p className="text-muted-foreground">
                  Encuentra casas independientes con jardín y espacio
                </p>
              </div>
            </Link>
            <Link href="/properties?property_type=apartment" className="group">
              <div className="p-8 rounded-lg border bg-card text-center transition-all group-hover:shadow-lg">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Apartamentos</h3>
                <p className="text-muted-foreground">
                  Apartamentos en edificios residenciales
                </p>
              </div>
            </Link>
            <Link href="/properties?property_type=land" className="group">
              <div className="p-8 rounded-lg border bg-card text-center transition-all group-hover:shadow-lg">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Terrenos</h3>
                <p className="text-muted-foreground">
                  Terrenos para construir tu sueño
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <p className="text-muted-foreground">Propiedades</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Clientes satisfechos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Vendedores</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-muted-foreground">Soporte</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Tienes una propiedad para vender?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a nuestra plataforma y reacha miles de compradores potenciales
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary">
              Empezar Ahora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}