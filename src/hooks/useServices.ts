import { useEffect, useState } from "react";
import { Service } from "@/types/service";
import { getServices, AddService, updateService, deleteService } from "@/services/service";

export function useService() {
  const [service, setService] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getServices().then(setService);
  }, []);

  const handleCardClick = (item: Service | null) => {
    setSelectedService(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setShowModal(false);
  };

  const handleSave = async (data: Omit<Service, "id">) => {
    if (selectedService) {
      const updated = await updateService(selectedService.id, data);
      setService(prev => prev.map(item => item.id === updated.id ? updated : item));
    } else {
      const created = await AddService(data);
      setService(prev => [...prev, created]);
    }
    closeModal();
  };

  const handleDelete = async (id: number) => {
    await deleteService(id);
    setService(prev => prev.filter(item => item.id !== id));
    closeModal();
  };

  return {
    service,
    selectedService,
    showModal,
    handleCardClick,
    closeModal,
    handleSave,
    handleDelete,
  };
}