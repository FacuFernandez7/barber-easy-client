import { Turn, TurnStatus } from "@/types/turn";
import { Calendar, Clock, User, Scissors, Timer } from "lucide-react";

const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const STATUS_STYLES: Record<TurnStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  DONE: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-600",
};

const STATUS_LABELS: Record<TurnStatus, string> = {
  PENDING: "Pendiente",
  DONE: "Realizado",
  CANCELLED: "Cancelado",
};

export default function TurnCard({
  turn,
  onClick,
}: {
  turn: Turn;
  onClick: () => void;
}) {
  const dateStr = turn.appointmentDate ?? "";
  const [y, m, d] = dateStr.slice(0, 10).split("-").map(Number);
  const hour = dateStr.slice(11, 16);

  return (
    <div
      onClick={onClick}
      className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white cursor-pointer hover:bg-gray-50 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-700">
          <User className="w-4 h-4 text-[#0094d9]" />
          <span className="font-semibold">{turn.customerName}</span>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[turn.status ?? "PENDING"]}`}>
          {STATUS_LABELS[turn.status ?? "PENDING"]}
        </span>
      </div>
      <div className="flex items-center gap-2 text-gray-700">
        <Calendar className="w-4 h-4 text-[#0094d9]" />
        <span>{d} de {MONTHS[m - 1]} {y}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-700">
        <Clock className="w-4 h-4 text-[#0094d9]" />
        <span>{hour} hs</span>
      </div>
      <div className="flex items-center gap-2 text-gray-700">
        <Scissors className="w-4 h-4 text-[#0094d9]" />
        <span className="text-sm">{turn.barberService.name}</span>
      </div>
      {turn.barberService.timeOnMinutes != null && (
        <div className="flex items-center gap-2 text-gray-700">
          <Timer className="w-4 h-4 text-[#0094d9]" />
          <span className="text-sm">{turn.barberService.timeOnMinutes} min</span>
        </div>
      )}
    </div>
  );
}
