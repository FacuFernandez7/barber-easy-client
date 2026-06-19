import { useState } from "react";
import type { Service } from "@/types/service";

type ServiceInput = Omit<Service, "id">;

export default function FormModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  service,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: ServiceInput) => void;
  onDelete?: () => void;
  service?: Service;
}) {
  const [name, setName] = useState(service?.name || "");
  const [description, setDescription] = useState(service?.description || "");
  const [price, setPrice] = useState(service?.price?.toString() || "");
  const [timeOnMinutes, setTimeOnMinutes] = useState(service?.timeOnMinutes?.toString() || "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl border border-[#0094d9] p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto w-full max-w-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">{service ? "Editar servicio" : "Nuevo servicio"}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer leading-none"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        {/* Campos */}
        <div className="flex flex-col gap-3">
          <input
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0094d9]"
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0094d9]"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0094d9]"
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0094d9]"
            type="number"
            placeholder="Duración en minutos"
            value={timeOnMinutes}
            onChange={(e) => setTimeOnMinutes(e.target.value)}
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2">
          {onDelete && (
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-white text-[#5b9df6] border border-[#5b9df6] rounded-lg hover:bg-[#eaf2ff] font-semibold transition-colors cursor-pointer"
            >
              Borrar
            </button>
          )}
          <button
            onClick={() => {
              onSave({
                name,
                description,
                price: parseFloat(price),
                timeOnMinutes: parseInt(timeOnMinutes),
              });
            }}
            className="bg-[#0094d9] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#007ab8] transition-colors cursor-pointer"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
