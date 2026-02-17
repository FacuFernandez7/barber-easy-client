import { useState } from "react";
import type { Catalog } from "@/types/catalog"; 

type CatalogInput = Omit<Catalog, "id">;

export default function FormModal({
  isOpen,
  onClose,
  onSave,
  onDelete,  // ← nueva prop, opcional
  catalog,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (service: CatalogInput) => void;
  onDelete?: () => void;  // ← solo existe si es edición
  catalog?: Catalog;
}) {
  const [name, setName] = useState(catalog?.name || "");
  const [description, setDescription] = useState(catalog?.description || "");
  const [price, setPrice] = useState(catalog?.price?.toString() || "");
  const [timeOnMinutes, setTimeOnMinutes] = useState(catalog?.timeOnMinutes?.toString() || "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-[#0094d9] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-lg"
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Servicio</h2>

        <div className="flex flex-col gap-3">
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            className="border p-2 rounded"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Duración en minutos"
            value={timeOnMinutes}
            onChange={(e) => setTimeOnMinutes(e.target.value)}
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          {/* El botón solo aparece si onDelete existe, es decir, en modo edición */}
          {onDelete && (
            <button
              onClick={onDelete}
              className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
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
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}