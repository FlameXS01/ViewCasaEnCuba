"use client";

import Link from "next/link";
import { useAuthStore } from "@/features/auth/store";
import { Button } from "@/components/ui/button";
import { Home, User, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">CasaEnCuba</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/properties" className="transition-colors hover:text-foreground/80">
              Propiedades
            </Link>
          </nav>
        </div>
        <button
          className="inline-flex items-center justify-center p-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <div className="flex flex-1 items-center justify-end space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/dashboard/profile">
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  {user?.full_name}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => logout()}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Registrarse</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/properties" className="text-sm font-medium">
              Propiedades
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/dashboard/profile" className="text-sm font-medium">
                  Perfil
                </Link>
                <button onClick={() => logout()} className="text-sm font-medium text-left">
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium">
                  Iniciar Sesión
                </Link>
                <Link href="/register" className="text-sm font-medium">
                  Registrarse
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}