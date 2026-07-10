"use client";
export const dynamic = "force-dynamic";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import DeliveryData, { type ScheduledDeliveryItem } from "../components/scheduled-delivery/DeliveryData";
import { useEffect, useState } from "react";
import { openCalender } from "../store/scheduledDeliverySlice";
import Calendar, { type ScheduledDelivery } from "../components/scheduled-delivery/Calendar";
import MonthSelector from "../components/scheduled-delivery/MonthSelector";
import TimePicker from "../components/scheduled-delivery/TimePicker";
import { setStep, setMonth, setDate, setTime, resetBooking } from "../store/bookingSlice";
import { useRouter } from "next/navigation";
import ActiveRide, { type ActiveRideData } from "../components/scheduled-delivery/ActiveRide";
import EditSchedule from "../components/scheduled-delivery/EditSchedule";
import { openSidebar } from "../store/sidebarSlice";
import AuthGuard from "../components/AuthGuard";

const ScheduledDelivery = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // ── State ──────────────────────────────────────────────────────────────────
  // Backend will populate these — start empty, no hardcoded data
  const [deliveries, setDeliveries] = useState<ScheduledDelivery[]>([]);
  const [scheduledItems, setScheduledItems] = useState<ScheduledDeliveryItem[]>([]);
  const [activeRides, setActiveRides] = useState<ActiveRideData[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // ── Redux state ────────────────────────────────────────────────────────────
  const isExpanded = useAppSelector((state) => state.sidebar.expanded);
  const calendar = useAppSelector((state) => state.scheduledDelivery.calenderState);
  const editSchedule = useAppSelector((state) => state.scheduledDelivery.selectedSchedule);
  const bookingStep = useAppSelector((state) => state.booking.step);
  const bookingData = useAppSelector((state) => state.booking);

  // ── Fetch from backend (no-op until API is wired) ─────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        // TODO: replace with real backend endpoints
        const [schedRes, activeRes] = await Promise.all([
          fetch("/api/scheduled-deliveries"),
          fetch("/api/active-rides"),
        ]);

        if (schedRes.ok) {
          const data = await schedRes.json();
          if (Array.isArray(data)) {
            setScheduledItems(data);
            setDeliveries(data);
          }
        }

        if (activeRes.ok) {
          const data = await activeRes.json();
          if (Array.isArray(data)) setActiveRides(data);
        }
      } catch {
        // APIs not connected yet — components show empty state
      }
    };

    fetchData();
  }, []);

  // ── Calendar logic ─────────────────────────────────────────────────────────
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    dispatch(setDate({ date: date.getDate(), month: date.getMonth(), year: date.getFullYear() }));
  };

  const handleMonthClick = () => dispatch(setStep("month"));

  const handleMonthSelect = (month: number, year: number) => {
    dispatch(setMonth({ month, year }));
    dispatch(setStep("calendar"));
  };

  const handleContinueFromCalendar = () => {
    if (selectedDate) dispatch(setStep("time"));
  };

  const handleTimeSelect = (time: string, period: "AM" | "PM") => {
    dispatch(setTime({ time, period }));
    // TODO: POST booking to backend, then navigate
    router.push("/dashboard");
  };

  const handleCancel = () => {
    dispatch(resetBooking());
    dispatch(setStep("calendar"));
    setSelectedDate(null);
  };

  // Open calendar on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) dispatch(openCalender());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <AuthGuard>
      <div
        className={`md:bg-[#FAFAFA] inline-flex md:pr-8 items-start w-full transition-all duration-500 min-h-screen ease-in-out ${
          isExpanded ? "md:pl-[16rem]" : "md:pl-20"
        }`}
      >
        {/* ── Main content ──────────────────────────────────────────────── */}
        <div className="flex flex-col items-start gap-4 p-4 sm:p-6 md:p-8 lg:py-13 w-full">
          {/* Header */}
          <div className="w-full flex justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <Image
                onClick={() => dispatch(openSidebar())}
                src="/delivery/icons/profile.png"
                alt="menu"
                className="w-8 h-8 md:hidden cursor-pointer"
                width={32}
                height={32}
              />
              <h2 className="unageo-regular text-[1.25rem] md:text-[2rem] font-semibold leading-8 md:leading-10">
                Scheduled Delivery
              </h2>
            </div>
            <div className="lg:hidden cursor-pointer flex p-[10px] items-center justify-center rounded-full bg-[#F4F4F4]">
              <Image
                onClick={() => dispatch(openCalender())}
                src="/delivery/icons/calendar-add.svg"
                alt="calendar"
                className="w-6 h-6"
                width={24}
                height={24}
              />
            </div>
          </div>

          {/* Delivery list */}
          <div className="flex flex-col items-start md:items-center gap-4 md:pl-[2.56rem] md:pr-[0.94rem] md:pt-[0.56rem] md:bg-white md:rounded-[1.25rem] w-full">
            <DeliveryData items={scheduledItems} />
          </div>
        </div>

        {/* ── Side panel (calendar + active ride) ───────────────────────── */}
        <div className="flex flex-col gap-6">
          {calendar && (
            <div className="flex flex-col items-center gap-8">
              <div className="fixed bg-white lg:bg-[#FFF]/0 lg:relative inset-0 lg:inset-auto z-50 lg:z-auto lg:w-full md:rounded-[1.25rem] overflow-y-auto lg:mt-[4rem] px-4 lg:px-0">
                <h2 className="unageo-regular text-[1.5rem] font-semibold leading-8 text-[#141522] mb-8 lg:mb-4 mt-10 lg:mt-0 ml-4 lg:ml-0">
                  {bookingStep === "month" ? "Select Month" : bookingStep === "time" ? "Select Time" : "Calendar"}
                </h2>

                {bookingStep === "calendar" && (
                  <Calendar
                    scheduledDeliveries={deliveries}
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                    month={bookingData.selectedMonth ?? undefined}
                    year={bookingData.selectedYear ?? undefined}
                    onMonthClick={handleMonthClick}
                    onContinue={handleContinueFromCalendar}
                    onCancel={handleCancel}
                    pastDeliveryTextColor="#999999"
                    pastDeliveryDotColor="#FF6B6B"
                    selectedDateBgColor="#4A90E2"
                    selectedDateTextColor="#FFFFFF"
                  />
                )}
                {bookingStep === "month" && (
                  <MonthSelector
                    currentMonth={bookingData.selectedMonth ?? new Date().getMonth()}
                    currentYear={bookingData.selectedYear ?? new Date().getFullYear()}
                    onMonthSelect={handleMonthSelect}
                    onCancel={() => dispatch(setStep("calendar"))}
                  />
                )}
                {bookingStep === "time" && (
                  <TimePicker
                    onTimeSelect={handleTimeSelect}
                    onCancel={() => dispatch(setStep("calendar"))}
                  />
                )}
              </div>

              {/* Active ride — bottom-right of desktop side panel */}
              <ActiveRide rides={activeRides} />
            </div>
          )}

          {editSchedule && <EditSchedule />}
        </div>
      </div>
    </AuthGuard>
  );
};

export default ScheduledDelivery;