export type TurnStatus = "PENDING" | "DONE" | "CANCELLED"

export type Turn = {
  id: string
  appointmentDate: string  // ISO datetime, e.g. "2026-03-28T10:30:00"
  status: TurnStatus | null
  customerName: string
  barberService: { id: string; name: string }
}
