"use client";

import ServiceCard from "@/components/ServiceCard";
import FormModal from "@/components/FormModal";
import { useService } from "@/hooks/useServices";

export default function ServicePage() {
  const { service, selectedService, showModal, handleCardClick, closeModal, handleSave, handleDelete } = useService();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Servicios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {service.map((s) => (
          <ServiceCard key={s.id} service={s} onClick={() => handleCardClick(s)} />
        ))}
        <ServiceCard key="-1" service={null} onClick={() => handleCardClick(null)} />
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