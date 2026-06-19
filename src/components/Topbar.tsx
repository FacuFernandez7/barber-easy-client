"use client";

import { usePathname } from "next/navigation";
import { useTopbarActionValue } from "@/contexts/TopbarActionContext";

const PAGE_TITLES: Record<string, string> = {
  "/": "Inicio",
  "/profile": "Perfil",
  "/service": "Servicios",
  "/turn": "Turnos",
};

export default function Topbar() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "BarberEasy";
  const action = useTopbarActionValue();

  const today = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <div className="flex items-center gap-4">
        {action}
        <span className="text-sm text-gray-500 capitalize">{today}</span>
      </div>
    </header>
  );
}
