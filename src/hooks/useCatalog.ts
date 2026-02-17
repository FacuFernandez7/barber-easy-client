import { useEffect, useState } from "react";
import { Catalog } from "@/types/catalog";
import { getServicesCatalog, AddServiceToCatalog, updateServiceInCatalog, deleteServiceFromCatalog } from "@/services/catalog";

export function useCatalog() {
  const [catalog, setCatalog] = useState<Catalog[]>([]);
  const [selectedCatalog, setSelectedCatalog] = useState<Catalog | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getServicesCatalog().then(setCatalog);
  }, []);

  const handleCardClick = (item: Catalog | null) => {
    setSelectedCatalog(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCatalog(null);
    setShowModal(false);
  };

  const handleSave = async (data: Omit<Catalog, "id">) => {
    if (selectedCatalog) {
      const updated = await updateServiceInCatalog(selectedCatalog.id, data);
      setCatalog(prev => prev.map(item => item.id === updated.id ? updated : item));
    } else {
      const created = await AddServiceToCatalog(data);
      setCatalog(prev => [...prev, created]);
    }
    closeModal();
  };

  const handleDelete = async (id: number) => {
    await deleteServiceFromCatalog(id);
    setCatalog(prev => prev.filter(item => item.id !== id));
    closeModal();
  };

  return {
    catalog,
    selectedCatalog,
    showModal,
    handleCardClick,
    closeModal,
    handleSave,
    handleDelete,
  };
}