import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeExpenses } from "../../store/walletSlice";
import { FaChevronDown } from "react-icons/fa";

const Expenses = () => {
  const dispatch = useAppDispatch();
  const [selectedMonth, setSelectedMonth] = useState("July");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const payments = useAppSelector((state) => state.wallet.numberOfPayments)

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed lg:relative bg-white inset-0 lg:inset-auto z-50 lg:z-auto lg:w-[35%] xl:w-[43%] lg:rounded-[1.25rem] overflow-y-auto lg:mt-[4rem] px-8 lg:py-[2.69rem] xl:py-[3.2rem] py-8 lg:h-[26rem] xl:h-[24rem]">
      <div className="flex lg:block flex-col">
        <div className="flex lg:hidden h-8 items-center gap-2">
          <Image
            onClick={() => dispatch(closeExpenses())}
            src={"/delivery/back-arrow.svg"}
            alt="arrow"
            width={24}
            height={24}
            className="h-6 w-6"
          />
          <h2 className="text-[1.25rem] font-semibold leading-[1.75rem]">
            Expenses
          </h2>
        </div>
        <div className="py-[2.69rem] lg:py-0 px-8 lg:px-0 bg-[#F8F8F8] lg:bg-[#F8F8F8]/0 flex flex-col items-center justify-center rounded-[1.25rem] mt-8 lg:mt-0 gap-6">
          <div className="flex w-full justify-between items-center">
            <h3 className="text-[#070A0D] text-[1rem] font-semibold leading-[1.25rem]">
              Total Expenses
            </h3>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex py-[0.125rem] px-[0.25rem] items-center gap-2 cursor-pointer hover:bg-gray-100 rounded transition-colors"
              >
                <h4 className="text-[0.875rem] font-medium leading-[1.125rem] text-[#070A0D]">
                  {selectedMonth}
                </h4>
                <FaChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10 max-h-60 overflow-y-auto">
                  {months.map((month) => (
                    <button
                      key={month}
                      onClick={() => handleMonthSelect(month)}
                      className={`w-full text-left px-4 py-2 text-[0.875rem] font-medium hover:bg-gray-100 transition-colors ${
                        selectedMonth === month
                          ? "bg-gray-100 text-[#070A0D]"
                          : "text-gray-700"
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-44 h-44">
              {/* Outer Circle with Progress */}
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `${
                    payments > 0
                      ? "conic-gradient(#000 0% 65%, #F3F3F3 65% 100%)"
                      : "conic-gradient(#000 0% 0%, #F3F3F3 1% 100%)"
                  } `, // blue = progress, gray = remaining
                }}
              ></div>

              {/* Inner White Circle (for hollow center) */}
              <div className="absolute inset-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-2xl font-semibold text-[#070A0D]">
                  {payments > 0 ? "₦2000" : "₦0"}
                </span>
              </div>
            </div>

            <h3 className="text-[1rem] font-medium leading-[1.25rem] text-center mt-6">
              {payments > 0
                ? "This is your total balance spent this month"
                : "Start a delivery to track your monthly expenses here."}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
