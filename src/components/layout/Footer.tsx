import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">CasaEnCuba</h3>
            <p className="text-sm text-muted-foreground">
              Encuentra tu hogar ideal en Cuba
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Explorar</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/properties?type=house" className="hover:text-foreground">
                  Casas
                </Link>
              </li>
              <li>
                <Link href="/properties?type=apartment" className="hover:text-foreground">
                  Apartamentos
                </Link>
              </li>
              <li>
                <Link href="/properties?type=land" className="hover:text-foreground">
                  Terrenos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground">
                  Términos
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} CasaEnCuba. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}