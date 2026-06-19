"use client";

import ServiceCard from "@/components/ServiceCard";
import FormModal from "@/components/FormModal";
import { useService } from "@/hooks/useServices";
import { useTopbarAction } from "@/contexts/TopbarActionContext";

export default function ServicePage() {
  const { service, selectedService, showModal, handleCardClick, closeModal, handleSave, handleDelete } = useService();

  useTopbarAction(
    <button
      onClick={() => handleCardClick(null)}
      className="bg-[#1a1a2e] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#22223a] transition-colors cursor-pointer"
    >
      + Servicio
    </button>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {service.map((s) => (
          <ServiceCard key={s.id} service={s} onClick={() => handleCardClick(s)} />
        ))}
      </div>

      {showModal && (
        <FormModal
          isOpen={showModal}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={selectedService ? () => handleDelete(selectedService.id) : undefined}
          service={selectedService ?? undefined}
        />
      )}
    </div>
  );
}