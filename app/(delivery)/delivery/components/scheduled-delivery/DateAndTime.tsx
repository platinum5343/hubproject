import Image from "next/image";

const DateAndTime = () => {
  return (
    <div className="flex w-full items-start gap-4">
      <div className="flex flex-col w-full items-start gap-1">
        <label
          htmlFor="date"
          className="text-[0.875rem] leading-[1.5rem] text-[#616161]"
        >
          Date
        </label>
        <div className="flex h-[2.5rem] px-[0.25rem] justify-between items-center border-b border-b-[#808080] w-full">
          <div className="flex items-center gap-1">
            <Image
              onClick={() =>
                (
                  document.getElementById("dateInput") as HTMLInputElement
                )?.showPicker()
              }
              src={"/delivery/icons/calendar2.png"}
              alt="icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <input
              id="dateInput"
              type="date"
              className="py-1 w-full focus:outline-none placeholder:text-[#A5A5A5] text-[0.875rem] leading-[1.125rem]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-start gap-1">
        <label
          htmlFor="time"
          className="text-[0.875rem] leading-[1.5rem] text-[#616161]"
        >
          Time
        </label>
        <div className="flex h-[2.5rem] px-[0.25rem] justify-between items-center border-b border-b-[#808080] w-full">
          <div className="flex items-center gap-1">
            <Image
              onClick={() =>
                (
                  document.getElementById("timeInput") as HTMLInputElement
                )?.showPicker()
              }
              src={"/delivery/icons/clock.png"}
              alt="icon"
              width={16}
              height={16}
              className="cursor-pointer"
            />
            <input
              id="timeInput"
              type="time"
              className="py-1 w-full focus:outline-none placeholder:text-[#A5A5A5] text-[0.875rem] leading-[1.125rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateAndTime;
