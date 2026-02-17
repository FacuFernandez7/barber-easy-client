import api from "@/lib/axios"


export const getServicesCatalog = async () => {
  const res = await api.get("/catalog")
  return res.data
}

export const AddServiceToCatalog = async (service: {
  name: string
  description: string
  price: number
  timeOnMinutes: number
}) => {
  const res = await api.post("/catalog", service)
  return res.data
}

export const deleteServiceFromCatalog = async (id: number) => {
  const res = await api.delete(`/catalog/${id}`);
  return res.data;
};


export const updateServiceInCatalog = async (id: number, service: {
  name: string
  description: string
  price: number
  timeOnMinutes: number
}) => {
  const res = await api.put(`/catalog/${id}`, service)
  return res.data
}