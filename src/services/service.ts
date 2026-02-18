import api from "@/lib/axios"


export const getServices = async () => {
  const res = await api.get("/service")
  return res.data
}

export const AddService = async (service: {
  name: string
  description: string
  price: number
  timeOnMinutes: number
}) => {
  const res = await api.post("/service", service)
  return res.data
}

export const deleteService = async (id: number) => {
  const res = await api.delete(`/service/${id}`);
  return res.data;
};


export const updateService = async (id: number, service: {
  name: string
  description: string
  price: number
  timeOnMinutes: number
}) => {
  const res = await api.put(`/service/${id}`, service)
  return res.data
}