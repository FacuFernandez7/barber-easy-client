import { useState, useEffect } from "react";
import { Turn, TurnStatus } from "@/types/turn";
import { createTurn, getTurns, updateTurn, deleteTurn } from "@/services/turn";
import { getServices } from "@/services/service";
import { Service } from "@/types/service";

export function useTurn() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [savedDate, setSavedDate] = useState<Date | null>(null);
  const [savedHour, setSavedHour] = useState<string | null>(null);
  const [selectedTurn, setSelectedTurn] = useState<Turn | null>(null);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [selectedBarberService, setSelectedBarberService] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<TurnStatus>("PENDING");

  useEffect(() => {
    getTurns().then(setTurns);
    getServices().then(setServices);
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const handleDayClick = (day: number) => {
    const date = new Date(year, month, day);
    if (date < today) return;
    setSelectedDate(date);
    setSelectedHour(null);
  };

  const openModal = () => {
    setSelectedTurn(null);
    setSelectedDate(null);
    setSelectedHour(null);
    setCustomerName("");
    setSelectedBarberService("");
    setSelectedStatus("PENDING");
    setShowCalendar(true);
    setShowModal(true);
  };

  const handleCardClick = (turn: Turn) => {
    const dateStr = turn.appointmentDate.slice(0, 10); // "yyyy-MM-dd"
    const hourStr = turn.appointmentDate.slice(11, 16); // "HH:mm"
    const [y, m, d] = dateStr.split("-").map(Number);

    setSelectedTurn(turn);
    setCurrentMonth(new Date(y, m - 1, 1));
    setSelectedDate(new Date(y, m - 1, d));
    setSelectedHour(hourStr);
    setCustomerName(turn.customerName);
    setSelectedBarberService(turn.barberService.id);
    setSelectedStatus(turn.status ?? "PENDING");
    setShowCalendar(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowCalendar(false);
    setSelectedTurn(null);
  };

  const openCalendar = () => {
    setSavedDate(selectedDate);
    setSavedHour(selectedHour);
    setShowCalendar(true);
  };

  const confirmCalendar = () => {
    setShowCalendar(false);
  };

  const cancelCalendar = () => {
    setSelectedDate(savedDate);
    setSelectedHour(savedHour);
    setShowCalendar(false);
  };

  const handleConfirm = async () => {
    if (!selectedDate || !selectedHour || !customerName || !selectedBarberService) return;

    const pad = (n: number) => String(n).padStart(2, "0");
    const appointmentDate = `${selectedDate.getFullYear()}-${pad(selectedDate.getMonth() + 1)}-${pad(selectedDate.getDate())}T${selectedHour}:00`;

    if (selectedTurn) {
      const updated = await updateTurn(selectedTurn.id, {
        appointmentDate,
        status: selectedStatus,
        customerName,
        barberService: selectedBarberService,
      });
      setTurns((prev) => prev.map((t) => t.id === updated.id ? updated : t));
    } else {
      const newTurn = await createTurn({ appointmentDate, customerName, barberService: selectedBarberService });
      setTurns((prev) => [...prev, newTurn]);
    }
    closeModal();
  };

  const handleDelete = async () => {
    if (!selectedTurn) return;
    await deleteTurn(selectedTurn.id);
    setTurns((prev) => prev.filter((t) => t.id !== selectedTurn.id));
    closeModal();
  };

  const isSelected = (day: number) =>
    !!selectedDate &&
    selectedDate.getFullYear() === year &&
    selectedDate.getMonth() === month &&
    selectedDate.getDate() === day;

  const isToday = (day: number) =>
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day;

  const isPast = (day: number) => new Date(year, month, day) < today;

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const turnsWithDuration = turns.map((t) => ({
    ...t,
    barberService: {
      ...t.barberService,
      timeOnMinutes: services.find((s) => s.id === t.barberService.id)?.timeOnMinutes,
    },
  }));

  const pad = (n: number) => String(n).padStart(2, "0");
  const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;
  const todayTurns = turns.filter((t) => t.appointmentDate.slice(0, 10) === todayStr);
  const todayTurnsCount = todayTurns.length;
  const pendingTodayCount = todayTurns.filter((t) => (t.status ?? "PENDING") === "PENDING").length;
  const doneTodayCount = todayTurns.filter((t) => t.status === "DONE").length;

  return {
    turns: turnsWithDuration,
    todayTurnsCount,
    pendingTodayCount,
    doneTodayCount,
    services,
    showModal,
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
    showCalendar,
    openCalendar,
    confirmCalendar,
    cancelCalendar,
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
  };
}
