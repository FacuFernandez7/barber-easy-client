import api from "@/lib/axios"

const dummyServices = [
  {
    id: 1,
    name: "Corte clásico",
    description: "Corte de cabello tradicional con tijera y máquina.",
    price: 8000,
  },
  {
    id: 2,
    name: "Corte + Barba",
    description: "Corte de cabello tradicional + Afeitado de barba con navaja",
    price: 11000,
  },
  {
    id: 3,
    name: "Perfilado de barba",
    description: "Definición y recorte de barba.",
    price: 3500,
  },
  { 
    id: 4,
    name: "Afeitado completo",
    description: "Afeitado con toalla caliente y navaja.",
    price: 5000,
  }
]


export const getServicesCatalog = async () => {
  //const res = await api.get("/catalog/service") //TODO 
  //return res.data
  return dummyServices;
}


export const AddServiceToCatalog = async (service: {
  name: string
  description: string
  price: number
}) => {
  const res = await api.post("/catalog/service", service)
  return res.data
}
