// components/scheduled-delivery/TimePicker.tsx
"use client";

import { useState } from "react";

interface TimePickerProps {
  onTimeSelect: (time: string, period: "AM" | "PM") => void;
  onCancel: () => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeSelect, onCancel }) => {
  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState<"AM" | "PM">("AM");
  const [mode, setMode] = useState<"hour" | "minute">("hour"); // Track selection mode

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5); // 0, 5, 10, 15, ..., 55

  const getClockHandRotation = () => {
    if (mode === "hour") {
      const hourAngle = (hour % 12) * 30;
      return hourAngle;
    } else {
      const minuteAngle = minute * 6; // 360 / 60 = 6 degrees per minute
      return minuteAngle;
    }
  };

  const handleHourClick = (h: number) => {
    setHour(h);
    // Automatically switch to minute selection after selecting hour
    setTimeout(() => setMode("minute"), 300);
  };

  const handleMinuteClick = (m: number) => {
    setMinute(m);
  };

  const handleContinue = () => {
    const formattedTime = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    onTimeSelect(formattedTime, period);
  };

  const toggleMode = () => {
    setMode(mode === "hour" ? "minute" : "hour");
  };

  return (
    <div className="flex flex-col items-center p-8 lg:p-10 bg-[#F8F8F8] lg:bg-white rounded-[1.25rem] w-full">
      <h2 className="text-[1.5rem] font-semibold mb-6 text-[#141522] unageo-regular">
        Pick time
      </h2>

      {/* Digital Display */}
      <div className="flex items-center gap-2 mb-8">
        <div className="flex items-baseline gap-1">
          <button
            onClick={() => setMode("hour")}
            className={`text-6xl font-bold transition-colors cursor-pointer ${
              mode === "hour" ? "text-gray-900" : "text-gray-300"
            }`}
          >
            {hour}
          </button>
          <span className="text-6xl font-bold text-gray-300">:</span>
          <button
            onClick={() => setMode("minute")}
            className={`text-6xl font-bold transition-colors cursor-pointer ${
              mode === "minute" ? "text-gray-900" : "text-gray-300"
            }`}
          >
            {minute.toString().padStart(2, "0")}
          </button>
        </div>
        <div className="flex flex-col ml-4">
          <button
            onClick={() => setPeriod("AM")}
            className={`text-sm font-medium px-3 py-1 rounded transition-colors ${
              period === "AM" ? "text-gray-900 font-semibold" : "text-gray-400"
            }`}
          >
            AM
          </button>
          <button
            onClick={() => setPeriod("PM")}
            className={`text-sm font-medium px-3 py-1 rounded transition-colors ${
              period === "PM" ? "text-gray-900 font-semibold" : "text-gray-400"
            }`}
          >
            PM
          </button>
        </div>
      </div>

      {/* Mode Indicator */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setMode("hour")}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
            mode === "hour"
              ? "bg-[#FE581C] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Hour
        </button>
        <button
          onClick={() => setMode("minute")}
          className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
            mode === "minute"
              ? "bg-[#FE581C] text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          Minute
        </button>
      </div>

      {/* Clock Face */}
      <div className="relative w-64 h-64 mb-8">
        {/* Clock Circle Background */}
        <div className="absolute inset-0 bg-gray-50 rounded-full"></div>

        {/* Hour Numbers or Minute Numbers */}
        {mode === "hour"
          ? hours.map((h) => {
              const angle = (h * 30 - 90) * (Math.PI / 180);
              const radius = 100;
              const x = 128 + radius * Math.cos(angle);
              const y = 128 + radius * Math.sin(angle);

              return (
                <button
                  key={h}
                  onClick={() => handleHourClick(h)}
                  className={`absolute w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                    hour === h
                      ? "bg-[#FE581C] text-white scale-110"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  style={{
                    left: `${x - 16}px`,
                    top: `${y - 16}px`,
                  }}
                >
                  {h}
                </button>
              );
            })
          : minutes.map((m) => {
              const angle = (m * 6 - 90) * (Math.PI / 180);
              const radius = 100;
              const x = 128 + radius * Math.cos(angle);
              const y = 128 + radius * Math.sin(angle);

              return (
                <button
                  key={m}
                  onClick={() => handleMinuteClick(m)}
                  className={`absolute w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-all ${
                    minute === m
                      ? "bg-[#FE581C] text-white scale-110"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                  style={{
                    left: `${x - 16}px`,
                    top: `${y - 16}px`,
                  }}
                >
                  {m.toString().padStart(2, "0")}
                </button>
              );
            })}

        {/* Clock Hand */}
        <div
          className="absolute left-1/2 top-1/2 origin-bottom"
          style={{
            width: "3px",
            height: "80px",
            backgroundColor: "#FE581C",
            transform: `translate(-50%, -100%) rotate(${getClockHandRotation()}deg)`,
            transition: "transform 0.3s ease",
          }}
        >
          <div className="absolute -top-2 -left-[5px] w-4 h-4 bg-[#FE581C] rounded-full"></div>
        </div>

        {/* Center Dot */}
        <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-[#FE581C] rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
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

export default TimePicker;
