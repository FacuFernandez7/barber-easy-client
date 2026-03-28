import api from "@/lib/axios"
import { Service } from "@/types/service"

let servicesCache: Service[] | null = null;
let servicesFetch: Promise<Service[]> | null = null;

export const getServices = async (): Promise<Service[]> => {
  if (servicesCache) return servicesCache;
  if (!servicesFetch) {
    servicesFetch = api.get<Service[]>("/service").then((res) => {
      servicesCache = res.data;
      return res.data;
    });
  }
  return servicesFetch;
};

export const invalidateServicesCache = () => {
  servicesCache = null;
  servicesFetch = null;
};

export const AddService = async (service: {
  name: string
  description: string
  price: number
  timeOnMinutes: number
}) => {
  const res = await api.post("/service", service)
  return res.data
}

export const deleteService = async (id: string) => {
  const res = await api.delete(`/service/${id}`);
  return res.data;
};


export const updateService = async (id: string, service: {
  name: string
  description: string
  price: number
  timeOnMinutes: number
}) => {
  const res = await api.put(`/service/${id}`, service)
  return res.data
}