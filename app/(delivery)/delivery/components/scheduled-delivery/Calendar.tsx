// components/scheduled-delivery/Calendar.tsx - UPDATE THIS FILE
"use client";

import Image from "next/image";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { closeCalendar } from "../../store/scheduledDeliverySlice";

// Interface for scheduled delivery data from API
export interface ScheduledDelivery {
  date: Date | string;
  id?: string;
  status?: string;
}

interface CalendarProps {
  scheduledDeliveries?: ScheduledDelivery[];
  selectedDate?: Date | null;
  onDateSelect?: (date: Date) => void;
  month?: number;
  year?: number;
  onMonthChange?: (month: number, year: number) => void;
  onMonthClick?: () => void; // NEW: Handle month title click
  weekDayTextColor?: string;
  dateTextColor?: string;
  selectedDateBgColor?: string;
  selectedDateTextColor?: string;
  todayBgColor?: string;
  todayTextColor?: string;
  pastDeliveryTextColor?: string;
  pastDeliveryDotColor?: string;
  inactiveDateColor?: string;
  headerTextColor?: string;
  backgroundColor?: string;
  borderRadius?: string;
  padding?: string;
  cellSize?: string;
  fontSize?: string;
  showNavigation?: boolean;
  className?: string;
  cellClassName?: string;
  headerClassName?: string;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  onContinue?: () => void; // NEW: Handle continue button
  onCancel?: () => void; // NEW: Handle cancel button
}

const Calendar: React.FC<CalendarProps> = ({
  scheduledDeliveries = [
    { date: new Date(2025, 10, 2) },
    { date: new Date(2025, 10, 1) },
    { date: new Date(2025, 9, 10) },
    { date: new Date(2025, 9, 28) },
  ],
  selectedDate,
  onDateSelect,
  month: propMonth,
  year: propYear,
  onMonthChange,
  onMonthClick, // NEW
  weekDayTextColor = "#999999",
  dateTextColor = "#333333",
  selectedDateBgColor = "#4A90E2",
  selectedDateTextColor = "#FFFFFF",
  todayBgColor = "#FFEEE8",
  todayTextColor = "#FE581C",
  pastDeliveryTextColor = "#999999",
  pastDeliveryDotColor = "#FF6B6B",
  inactiveDateColor = "#CCCCCC",
  headerTextColor = "#333333",
  backgroundColor = "",
  borderRadius = "12px",
  padding = "",
  cellSize = "40px",
  fontSize = "14px",
  showNavigation = true,
  className = "",
  cellClassName = "",
  headerClassName = "",
  disableFutureDates = false,
  disablePastDates = false,
  onContinue, // NEW
  onCancel, // NEW
}) => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    propMonth ?? currentDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState(
    propYear ?? currentDate.getFullYear()
  );

  if (propMonth !== undefined && propMonth !== currentMonth) {
    setCurrentMonth(propMonth);
  }
  if (propYear !== undefined && propYear !== currentYear) {
    setCurrentYear(propYear);
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isPastDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate < today;
  };

  const isFutureDate = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate > today;
  };

  const hasScheduledDelivery = (
    day: number,
    month: number,
    year: number
  ): boolean => {
    const checkDate = new Date(year, month, day);
    return scheduledDeliveries.some((delivery) => {
      const deliveryDate =
        typeof delivery.date === "string"
          ? new Date(delivery.date)
          : delivery.date;
      return isSameDay(checkDate, deliveryDate);
    });
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const daysInPrevMonth = getDaysInMonth(
    currentMonth === 0 ? 11 : currentMonth - 1,
    currentMonth === 0 ? currentYear - 1 : currentYear
  );

  const calendarDays = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isPrevMonth: true,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: true,
      isPrevMonth: false,
    });
  }

  const remainingDays = 42 - calendarDays.length;
  for (let i = 1; i <= remainingDays; i++) {
    calendarDays.push({
      day: i,
      isCurrentMonth: false,
      isPrevMonth: false,
    });
  }

  const handlePrevMonth = () => {
    const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    onMonthChange?.(newMonth, newYear);
  };

  const handleNextMonth = () => {
    const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    onMonthChange?.(newMonth, newYear);
  };

  const handleDateClick = (day: number, isCurrentMonth: boolean) => {
    if (!isCurrentMonth) return;

    const clickedDate = new Date(currentYear, currentMonth, day);

    if (disableFutureDates && isFutureDate(clickedDate)) return;
    if (disablePastDates && isPastDate(clickedDate)) return;

    if (onDateSelect) {
      onDateSelect(clickedDate);
    }
  };

  const isToday = (day: number) => {
    return (
      day === currentDate.getDate() &&
      currentMonth === currentDate.getMonth() &&
      currentYear === currentDate.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    const checkDate = new Date(currentYear, currentMonth, day);
    const selected =
      typeof selectedDate === "string" ? new Date(selectedDate) : selectedDate;
    return isSameDay(checkDate, selected);
  };

  const dispatch = useAppDispatch();

  const handleCloseCalendar = () => {
    if (window.innerWidth <= 1024) {
      dispatch(closeCalendar());
    }
  };

  return (
    <div
      className={`${className} bg-[#F8F8F8] lg:bg-[#FFFFFF] p-10 lg:p-8`}
      style={{
        backgroundColor,
        borderRadius,
        padding,
      }}
    >
      {/* Header */}
      {showNavigation && (
        <div
          className={`flex justify-center gap-6 items-center mb-4 ${headerClassName}`}
          style={{ color: headerTextColor }}
        >
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Previous month"
          >
            <Image
              src={"/icons/arrow-left.svg"}
              alt="icon"
              height={20}
              width={20}
            />
          </button>
          <button
            onClick={onMonthClick}
            className="text-lg font-semibold hover:text-[#FE581C] transition-colors cursor-pointer"
          >
            {monthNames[currentMonth]}
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Next month"
          >
            <Image
              src={"/icons/arrow-right.svg"}
              alt="icon"
              height={20}
              width={20}
            />
          </button>
        </div>
      )}

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center font-medium"
            style={{
              color: weekDayTextColor,
              fontSize,
              width: cellSize,
              height: cellSize,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((item, index) => {
          if (!item.isCurrentMonth) {
            return (
              <div
                key={index}
                className="flex items-center justify-center"
                style={{
                  width: cellSize,
                  height: cellSize,
                  color: inactiveDateColor,
                  fontSize,
                }}
              >
                {item.day}
              </div>
            );
          }

          const dateObj = new Date(currentYear, currentMonth, item.day);
          const hasPastDelivery =
            hasScheduledDelivery(item.day, currentMonth, currentYear) &&
            isPastDate(dateObj);
          const isSelectedDate = isSelected(item.day);
          const isTodayDate = isToday(item.day);
          const isPast = isPastDate(dateObj);
          const isFuture = isFutureDate(dateObj);

          const isDisabled =
            (disableFutureDates && isFuture) || (disablePastDates && isPast);

          let bgColor = "transparent";
          let textColor = dateTextColor;

          if (isSelectedDate) {
            bgColor = selectedDateBgColor;
            textColor = selectedDateTextColor;
          } else if (isTodayDate) {
            bgColor = todayBgColor;
            textColor = todayTextColor;
          } else if (hasPastDelivery) {
            textColor = pastDeliveryTextColor;
          }

          if (isDisabled) {
            textColor = inactiveDateColor;
          }

          return (
            <button
              key={index}
              onClick={() => handleDateClick(item.day, item.isCurrentMonth)}
              disabled={isDisabled}
              className={`flex flex-col items-center justify-center transition-all ${
                isDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:scale-105"
              } ${cellClassName}`}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: bgColor,
                color: textColor,
                fontSize,
                borderRadius: "20px",
                fontWeight: isSelectedDate || isTodayDate ? "600" : "400",
                gap: "2px",
              }}
            >
              <span>{item.day}</span>
              {hasPastDelivery && (
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    backgroundColor: pastDeliveryDotColor,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* buttons */}
      <div className="flex items-center justify-center gap-[0.875rem] mt-2 unageo-regular">
        <button
          onClick={onContinue}
          disabled={!selectedDate}
          className="flex py-2 px-4 items-center justify-center rounded-[1rem] bg-[#FE581C] hover:bg-[#f54708] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-500 ease-in-out text-white text-[0.5rem] leading-[0.7rem] cursor-pointer"
        >
          Continue
        </button>
        <button
          onClick={() => {
            // onCancel?.();
            handleCloseCalendar();
          }}
          className="flex py-2 px-4 items-center justify-center rounded-[1rem] border border-black text-[#FE581C] text-[0.5rem] leading-[0.7rem] cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Calendar;
