import { Service } from "@/types/service";
import { Scissors } from "lucide-react";

export default function ServiceCard({ service, onClick }: { service: Service; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="border border-gray-200 rounded-xl p-5 shadow-sm bg-white cursor-pointer hover:bg-gray-50 flex flex-col justify-between"
    >
      <div>
        <h3 className="flex items-center gap-2 text-lg font-semibold text-[#0a2f4a] mb-1 truncate">
          <Scissors className="w-4 h-4 text-[#0094d9]" />
          {service.name}
        </h3>
        <p className="text-sm text-gray-700 line-clamp-3">
          {service.description}
        </p>
      </div>
      <p className="text-sm text-gray-700 font-medium">${service.price}</p>
      <p className="text-sm text-gray-700">{service.timeOnMinutes} min</p>
    </div>
  );
}
