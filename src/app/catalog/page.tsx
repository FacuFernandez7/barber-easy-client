"use client";

import CatalogCard from "@/components/CatalogCard";
import FormModal from "@/components/FormModal";
import { useCatalog } from "@/hooks/useCatalog";

export default function CatalogPage() {
  const { catalog, selectedCatalog, showModal, handleCardClick, closeModal, handleSave, handleDelete } = useCatalog();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Catálogo de Servicios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {catalog.map((s) => (
          <CatalogCard key={s.id} catalog={s} onClick={() => handleCardClick(s)} />
        ))}
        <CatalogCard key="-1" catalog={null} onClick={() => handleCardClick(null)} />
      </div>

      {showModal && (
        <FormModal
          isOpen={showModal}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={selectedCatalog ? () => handleDelete(selectedCatalog.id) : undefined}
          catalog={selectedCatalog ?? undefined}
        />
      )}
    </div>
  );
}