import api from "@/lib/axios"
import { Turn } from "@/types/turn"

export const getTurns = async () => {
  const res = await api.get("/turn")
  return res.data
}

export const createTurn = async (turn: {
  appointmentDate: string
  customerName: string
  barberService: string
}) => {
  const res = await api.post("/turn", { ...turn, status: "PENDING" })
  console.log(res.data)
  return res.data as Turn
}

export const updateTurn = async (id: string, turn: {
  appointmentDate: string
  status: string
  customerName: string
  barberService: string
}) => {
  const res = await api.put(`/turn/${id}`, turn)
  return res.data as Turn
}

export const deleteTurn = async (id: string) => {
  const res = await api.delete(`/turn/${id}`)
  return res.data
}
