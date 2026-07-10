"use client";
import { ScheduledDeliveryType } from "../../utils/scheduled-delivery";

import Image from "next/image";
import { useAppDispatch } from "../../store/hooks";
import { openEditSchedule } from "../../store/scheduledDeliverySlice";

// ── Types ─────────────────────────────────────────────────────────────────────
// Alias to ScheduledDeliveryType so openEditSchedule() types align.
// status is optional — add it to ScheduledDeliveryType if the backend sends it.
export type ScheduledDeliveryItem = ScheduledDeliveryType & { status?: string };

interface Props {
  items: ScheduledDeliveryItem[];
}

// ── Empty state ───────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center w-full py-20 gap-4">
    <div className="w-16 h-16 bg-[#F4F4F4] rounded-full flex items-center justify-center">
      <Image
        src="/icons/clock.svg"
        alt="empty"
        width={28}
        height={28}
        className="w-7 h-7 opacity-40"
      />
    </div>
    <div className="flex flex-col items-center gap-1 text-center">
      <h3 className="unageo-regular text-[1rem] font-semibold text-[#333]">
        No scheduled deliveries
      </h3>
      <p className="unageo-regular text-[0.875rem] text-[#A5A5A5] max-w-[18rem]">
        You have no upcoming scheduled deliveries. Use the calendar to book one.
      </p>
    </div>
  </div>
);

// ── DeliveryData ──────────────────────────────────────────────────────────────
const DeliveryData = ({ items }: Props) => {
  const dispatch = useAppDispatch();

  if (!items || items.length === 0) return <EmptyState />;

  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex flex-col md:h-[12.8rem] p-4 md:p-8 gap-2 justify-center items-start rounded-[0.9375rem] bg-[#FDFDFD] w-full"
        >
          <div className="flex justify-between items-center w-full">
            <h2 className="unageo-regular text-[1rem] font-semibold leading-[1.25rem]">
              Package Delivery
            </h2>
            <p className="unageo-regular text-[0.625rem] font-medium leading-[1.25rem] text-[#A5A5A5]">
              {item.status ?? "Waiting"}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-4 w-full">
            {/* Date + time + edit button */}
            <div className="flex flex-col justify-center items-start gap-4">
              <div className="flex flex-col justify-center items-start gap-1">
                <h3 className="unageo-regular text-[0.875rem] font-medium leading-[1.125rem]">
                  {item.date}
                </h3>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center gap-[0.6875rem]">
                    <Image
                      src="/icons/clock.svg"
                      alt="icon"
                      className="w-[0.75rem] h-[0.75rem] mb-[0.2rem]"
                      width={12}
                      height={12}
                    />
                    <h4 className="unageo-regular text-[0.75rem] leading-[1rem]">
                      {item.duration}
                    </h4>
                  </div>
                  <h4 className="unageo-regular text-[0.75rem] leading-[1rem]">
                    {item.time}
                  </h4>
                </div>
              </div>

              {/* Desktop edit button */}
              <div className="md:flex hidden items-center gap-2">
                <button
                  onClick={() => dispatch(openEditSchedule(item))}
                  className="bg-[#FE581c] flex w-[15.625rem] px-[1.13rem] py-[0.6rem] items-center justify-center rounded-[1.13rem] gap-2 cursor-pointer hover:bg-[#f54708] transition-colors duration-500 ease-in-out"
                >
                  <p className="unageo-regular text-[0.6rem] leading-[0.8rem] text-white">Edit</p>
                  <Image src="/icons/edit.png" alt="icon" className="w-[0.6rem] h-[0.6rem]" height={10} width={10} />
                </button>
                <Image src="/icons/delete.svg" alt="delete" className="h-[18px] w-[18px] cursor-pointer hover:opacity-70" width={28} height={28} />
              </div>
            </div>

            {/* Route */}
            <div className="flex items-start gap-2">
              <div className="flex flex-col w-[0.625rem] h-[3rem] md:h-[4.1875rem] py-1 justify-between items-center">
                <Image src="/icons/icon1.png" alt="from" height={10} width={10} className="h-[10px] w-[10px]" />
                <div className="h-[1.25rem] md:h-[2.4375rem] border-[0.0625rem] border-[#808080] border-dashed" />
                <Image src="/icons/icon2.png" alt="to" height={10} width={10} className="h-[10px] w-[10px]" />
              </div>
              <div className="flex flex-col justify-center items-start gap-2">
                <h3 className="md:max-w-[8.375rem] unageo-regular text-[0.75rem] font-medium leading-[1rem]">{item.from}</h3>
                <h3 className="md:max-w-[8.375rem] unageo-regular text-[0.75rem] font-medium leading-[1rem]">{item.to}</h3>
              </div>
            </div>

            {/* Mobile edit button */}
            <div className="flex md:hidden items-center gap-2 w-full justify-between">
              <button
                onClick={() => dispatch(openEditSchedule(item))}
                className="bg-[#FE581c] flex w-[15.625rem] px-[1.13rem] py-[0.6rem] items-center justify-center rounded-[1.13rem] gap-2 cursor-pointer hover:bg-[#f54708] transition-colors duration-500 ease-in-out"
              >
                <p className="unageo-regular text-[0.6rem] leading-[0.8rem] text-white">Edit</p>
                <Image src="/icons/edit.png" alt="icon" className="w-[0.6rem] h-[0.6rem]" height={10} width={10} />
              </button>
              <Image src="/icons/delete.svg" alt="delete" className="h-[18px] w-[18px] cursor-pointer hover:opacity-70" width={28} height={28} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DeliveryData;