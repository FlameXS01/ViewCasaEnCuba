"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Building,
  Calendar,
  MessageSquare,
  User,
  PlusCircle,
  Settings,
} from "lucide-react";
import { useAuthStore } from "@/features/auth/store";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Mis Propiedades", href: "/dashboard/my-properties", icon: Building },
  { name: "Visitas", href: "/dashboard/visits", icon: Calendar },
  { name: "Mensajes", href: "/dashboard/messages", icon: MessageSquare },
  { name: "Perfil", href: "/dashboard/profile", icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const isSeller = user?.role === "seller" || user?.role === "admin";

  return (
    <div className="hidden border-r bg-background md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex h-14 items-center border-b px-6">
          <Link href="/" className="font-bold text-xl">
            CasaEnCuba
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
          {isSeller && (
            <Link
              href="/dashboard/my-properties/new"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              <PlusCircle className="h-5 w-5" />
              Nueva Propiedad
            </Link>
          )}
        </nav>
        <div className="border-t p-4">
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <Settings className="h-5 w-5" />
            Configuración
          </Link>
        </div>
      </div>
    </div>
  );
}