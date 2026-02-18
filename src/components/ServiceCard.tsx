import { Service } from "@/types/service";

export default function ServiceCard({ service, onClick }: { service: Service | null, onClick?: () => void }) {
  const isAddCard = service === null;
  return (
    <div
      onClick={onClick}
      className={`border p-4 rounded border-[#0094d9] bg-[#eeeeee] shadow-sm flex flex-col justify-between 
        ${isAddCard ? 'items-center justify-center cursor-pointer hover:bg-[#e0e0e0]' : 'cursor-pointer hover:bg-[#e6e6e6]'}`}
    >
      {isAddCard ? (
        <>
          <h3 className="text-3xl font-bold text-[#0a2f4a] mb-2">+</h3>
          <p className="text-lg font-semibold text-[#0a2f4a] mb-1 truncate">Agregar</p>
        </>
      ) : (
        <>
          <div>
            <h3 className="text-lg font-semibold text-[#0a2f4a] mb-1 truncate">
              {service.name}
            </h3>
            <p className="text-sm text-gray-700 line-clamp-3">
              {service.description}
            </p>
          </div>
          <p className="text-sm text-gray-700 font-medium">${service.price}</p>
          <p className="text-sm text-gray-700">{service.timeOnMinutes} min</p>
        </>
      )}
    </div>
  );
}




