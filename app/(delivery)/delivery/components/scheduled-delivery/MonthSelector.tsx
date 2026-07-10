// components/scheduled-delivery/MonthSelector.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface MonthSelectorProps {
  currentMonth: number; // 0-11
  currentYear: number;
  onMonthSelect: (month: number, year: number) => void;
  onCancel: () => void;
}

const MonthSelector: React.FC<MonthSelectorProps> = ({
  currentMonth,
  currentYear,
  onMonthSelect,
  onCancel,
}) => {
  const [displayYear, setDisplayYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const months = [
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

  const handlePrevYear = () => setDisplayYear(displayYear - 1);
  const handleNextYear = () => setDisplayYear(displayYear + 1);

  const handleMonthClick = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
  };

  const handleContinue = () => {
    onMonthSelect(selectedMonth, displayYear);
  };

  return (
    <div className="flex flex-col items-center p-8 lg:p-10 bg-[#F8F8F8] lg:bg-white rounded-[1.25rem] w-full">
      <h2 className="text-[1.5rem] font-semibold mb-6 text-[#141522] unageo-regular">
        Select Month
      </h2>

      {/* Year Navigation */}
      <div className="flex items-center justify-center gap-6 mb-8">
        <button
          onClick={handlePrevYear}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Previous year"
        >
          <Image
            src="/icons/arrow-left.png"
            alt="Previous"
            height={12}
            width={12}
          />
        </button>
        <h3 className="text-lg font-semibold min-w-[80px] text-center">
          {displayYear}
        </h3>
        <button
          onClick={handleNextYear}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          aria-label="Next year"
        >
          <Image
            src="/icons/arrow-right.png"
            alt="Next"
            height={12}
            width={12}
          />
        </button>
      </div>

      {/* Months Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8 w-full max-w-md">
        {months.map((month, index) => {
          const isSelected =
            index === selectedMonth && displayYear === currentYear;
          return (
            <button
              key={month}
              onClick={() => handleMonthClick(index)}
              className={`py-3 px-4 rounded-[1rem] text-sm font-medium w-[6rem] transition-all unageo-regular ${
                isSelected
                  ? "bg-gray-100  text-gray-900 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {month}
            </button>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-[0.875rem] w-full unageo-regular">
        <button
          onClick={handleContinue}
          className="flex py-2 px-4 items-center justify-center rounded-[1rem] bg-[#FE581C] hover:bg-[#f54708] transition-colors duration-500 ease-in-out text-white text-[0.5rem] leading-[0.7rem] cursor-pointer"
        >
          Continue
        </button>
        <button
          onClick={onCancel}
          className="flex py-2 px-4 items-center justify-center rounded-[1rem] border border-black text-[#FE581C] text-[0.5rem] leading-[0.7rem] cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default MonthSelector;
