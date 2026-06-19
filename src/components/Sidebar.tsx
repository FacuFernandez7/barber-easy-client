"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Scissors, Calendar } from "lucide-react";

const NAV_ITEMS = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/profile", label: "Perfil", icon: User },
  { href: "/service", label: "Servicios", icon: Scissors },
  { href: "/turn", label: "Turnos", icon: Calendar },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1a1a2e] text-white py-6 px-4">
      <h1 className="text-2xl font-semibold mb-10 px-2">BarberEasy</h1>
      <nav className="flex flex-col gap-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center text-lg no-underline px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-[#1f2b4d] text-[#5b9df6]"
                  : "text-gray-300 hover:bg-white/5 hover:text-gray-200"
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
