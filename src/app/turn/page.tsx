"use client";

import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useTurn } from "@/hooks/useTurn";
import TurnCard from "@/components/TurnCard";
import { TurnStatus } from "@/types/turn";
import { useTopbarAction } from "@/contexts/TopbarActionContext";

const DAYS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTHS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30",
];
const STATUS_OPTIONS: { value: TurnStatus; label: string }[] = [
  { value: "PENDING", label: "Pendiente" },
  { value: "DONE", label: "Realizado" },
  { value: "CANCELLED", label: "Cancelado" },
];

export default function TurnPage() {
  const {
    turns,
    todayTurnsCount,
    pendingTodayCount,
    doneTodayCount,
    services,
    showModal,
    showCalendar,
    openCalendar,
    confirmCalendar,
    cancelCalendar,
    selectedTurn,
    year,
    month,
    selectedDate,
    selectedHour,
    customerName,
    selectedBarberService,
    selectedStatus,
    cells,
    prevMonth,
    nextMonth,
    handleDayClick,
    openModal,
    handleCardClick,
    closeModal,
    handleConfirm,
    handleDelete,
    setSelectedHour,
    setCustomerName,
    setSelectedBarberService,
    setSelectedStatus,
    isSelected,
    isToday,
    isPast,
  } = useTurn();

  const canConfirm = !!selectedDate && !!selectedHour && !!customerName && !!selectedBarberService;

  const dateLabel = selectedDate && selectedHour
    ? `${selectedDate.getDate()} de ${MONTHS[selectedDate.getMonth()]} · ${selectedHour} hs`
    : "Seleccioná fecha y hora";

  useTopbarAction(
    <button
      onClick={openModal}
      className="bg-[#1a1a2e] text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-[#22223a] transition-colors cursor-pointer"
    >
      + Turno
    </button>
  );

  return (
    <div className="p-6">
      {/* Métricas del día */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Turnos hoy</p>
          <p className="text-3xl font-bold text-gray-800">{todayTurnsCount}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Pendientes</p>
          <p className="text-3xl font-bold text-yellow-600">{pendingTodayCount}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">Realizados</p>
          <p className="text-3xl font-bold text-green-600">{doneTodayCount}</p>
        </div>
      </div>

      {/* Grid de turnos */}
      {turns.length === 0 ? (
        <p className="text-gray-400 text-sm">No hay turnos reservados aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {turns.map((turn) => (
            <TurnCard key={turn.id} turn={turn} onClick={() => handleCardClick(turn)} />
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-[#0094d9] p-8 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">{selectedTurn ? "Editar turno" : "Nuevo turno"}</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer leading-none"
              >
                ×
              </button>
            </div>

            {/* Campos del turno */}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nombre del cliente"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0094d9]"
              />
              <select
                value={selectedBarberService}
                onChange={(e) => setSelectedBarberService(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0094d9] text-gray-700"
              >
                <option value="">Seleccioná un servicio</option>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              {selectedTurn && (
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as TurnStatus)}
                  className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-[#0094d9] text-gray-700"
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              )}

              {/* Campo de fecha/hora */}
              <div className="flex items-center border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-700">
                <span className="flex-1">{dateLabel}</span>
                <button
                  onClick={openCalendar}
                  className="text-[#0094d9] hover:text-[#007ab8] cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal de calendario */}
            {showCalendar && (
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-60">
                <div className="bg-white rounded-2xl shadow-xl border border-[#0094d9] p-8 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">Elegí fecha y hora</h3>
                    <button
                      onClick={cancelCalendar}
                      className="text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer leading-none"
                    >
                      ×
                    </button>
                  </div>

                  <div className="flex gap-6 items-start">
                    {/* Calendario */}
                    <div className="w-[380px]">
                      <div className="flex items-center justify-between mb-5">
                        <button
                          onClick={prevMonth}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <span className="font-semibold text-gray-800">
                          {MONTHS[month]} {year}
                        </span>
                        <button
                          onClick={nextMonth}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 mb-2">
                        {DAYS.map((d) => (
                          <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">
                            {d}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-y-1">
                        {cells.map((day, i) => {
                          if (!day) return <div key={i} />;
                          const past = isPast(day);
                          const selected = isSelected(day);
                          const todayCell = isToday(day);
                          return (
                            <button
                              key={i}
                              onClick={() => handleDayClick(day)}
                              disabled={past}
                              className={[
                                "h-10 w-10 mx-auto rounded-full text-sm font-medium transition-colors",
                                past ? "text-gray-300 cursor-not-allowed" : "cursor-pointer",
                                selected ? "bg-[#0094d9] text-white" : "",
                                !selected && todayCell ? "border border-[#0094d9] text-[#0094d9]" : "",
                                !selected && !past && !todayCell ? "hover:bg-gray-100 text-gray-700" : "",
                              ].join(" ")}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Selector de horario */}
                    <div className="w-52">
                      <h3 className="font-semibold text-gray-800 mb-3">
                        {selectedDate
                          ? `${selectedDate.getDate()} de ${MONTHS[selectedDate.getMonth()]}`
                          : "Seleccioná un día"}
                      </h3>

                      {selectedDate ? (
                        <div className="flex flex-col gap-2 overflow-y-auto max-h-[240px]">
                          {TIME_SLOTS.map((hour) => (
                            <button
                              key={hour}
                              onClick={() => setSelectedHour(hour)}
                              className={[
                                "py-2 px-4 rounded-lg text-sm font-medium border transition-colors cursor-pointer",
                                selectedHour === hour
                                  ? "bg-[#0094d9] text-white border-[#0094d9]"
                                  : "border-gray-200 text-gray-700 hover:border-[#0094d9] hover:text-[#0094d9]",
                              ].join(" ")}
                            >
                              {hour} hs
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-400">
                          Elegí un día para ver los horarios disponibles.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={cancelCalendar}
                      className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-semibold transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={confirmCalendar}
                      className="bg-[#0094d9] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#007ab8] transition-colors cursor-pointer"
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex justify-end gap-2">
              {selectedTurn && (
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 font-semibold transition-colors cursor-pointer"
                >
                  Borrar
                </button>
              )}
              <button
                onClick={handleConfirm}
                disabled={!canConfirm}
                className="bg-[#0094d9] text-white font-semibold px-6 py-2 rounded-lg hover:bg-[#007ab8] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {selectedTurn ? "Guardar cambios" : "Confirmar turno"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
