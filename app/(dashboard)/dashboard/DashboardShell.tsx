"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Settings, Shield, Activity, Menu } from "lucide-react";
import { Header } from "../layout"; // ensure Header itself is "use client"
import { useSession } from "@/lib/auth-client"; // client‐side session hook

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();

  // if useSession() can be null client‐side you can still redirect:
  if (!session) {
    // optional: return a loader while next/navigation replace runs
    return null;
  }

  const navItems = [
    { href: "/dashboard/factures", icon: Activity, label: "Factures" },
    { href: "/dashboard/generale", icon: Settings, label: "Générale" },
    { href: "/dashboard/security", icon: Shield, label: "Paramètre" },
    { href: "/dashboard/payment", icon: Shield, label: "Paiement" },
    { href: "/dashboard/dossier", icon: Shield, label: "Dossier" },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100dvh-68px)] max-w-7xl mx-auto w-full">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-200 p-4">
        <span className="font-medium">Accueil</span>
        <Button variant="ghost" onClick={() => setIsSidebarOpen((o) => !o)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-white lg:bg-gray-50 border-r border-gray-200 lg:block transition-transform duration-300 ease-in-out ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="h-full overflow-y-auto p-4 space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.href}
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Header /> {/* make sure Header is also a Client Component */}
          {children}
        </main>
      </div>
    </div>
  );
}
