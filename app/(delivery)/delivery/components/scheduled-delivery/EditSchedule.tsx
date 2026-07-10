import Image from "next/image";
import React from "react";
import DateAndTime from "./DateAndTime";
import { useAppDispatch } from "../../store/hooks";
import { closeEditSchedule } from "../../store/scheduledDeliverySlice";

const EditSchedule = () => {
  const dispatch = useAppDispatch()
  return (
    <div className="fixed bg-white lg:relative inset-0 lg:inset-auto z-50 lg:z-auto overflow-y-auto lg:w-[23rem] md:rounded-[1.25rem] lg:mt-[7rem] px-4 lg:px-8 py-[1.25rem] unageo-regular">
      {/* Scheduled delivery */}
      <div className="flex items-center gap-2">
        <Image
          src={"/delivery/icons/arrow-square-left.png"}
          alt="arrow"
          className="w-6 h-6 cursor-pointer"
          width={24}
          height={24}
          onClick={() => dispatch(closeEditSchedule())}
        />

        <h2 className="text-[1.25rem] font-medium leading-[1.75rem]">
          Edit Package
        </h2>
      </div>
      <form className="flex flex-col items-start gap-4 mt-[1.25rem]">
        <div className="flex flex-col w-full h-[12.5rem] py-4 items-center gap-2 rounded-[1rem] border border-[#808080] bg-[#FDFDFD]">
          <div className="flex px-2 items-center justify-between w-full">
            <h4 className="text-[0.875rem] leading-[1.125rem] text-[#616161]">
              Package Description
            </h4>
            <Image
              src={"/delivery/icons/info.png"}
              alt="icon"
              height={15}
              width={15}
            />
          </div>
          <textarea
            rows={6}
            className="w-[90%] focus:outline-none text-[0.875rem] leading-[1.125rem]"
            placeholder="What type of package are you sending"
          ></textarea>
        </div>
        <DateAndTime />
        <div className="flex flex-col items-start gap-1 w-full">
          <label
            htmlFor="packages"
            className="text-[0.875rem] leading-[1.5rem] text-[#616161]"
          >
            Number of packages
          </label>
          <div className="flex w-full h-10 px-1 items-center justify-center gap-1 border-b border-[#808080]">
            <Image
              src={"/delivery/icons/package1.png"}
              alt="icons"
              height={16}
              width={16}
            />
            <input
              type="text"
              className="w-full py-1 focus:outline-none text-[0.875rem] leading-[1.125rem]"
              placeholder="eg: 3"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <label
            htmlFor="fullname"
            className="text-[0.875rem] leading-[1.5rem] text-[#616161]"
          >
            Sender's full name
          </label>
          <div className="flex w-full h-10 px-1 items-center justify-center gap-1 border-b border-[#808080]">
            <Image
              src={"/delivery/icons/user.png"}
              alt="icons"
              height={16}
              width={16}
            />
            <input
              type="text"
              className="w-full py-1 focus:outline-none text-[0.875rem] leading-[1.125rem]"
              placeholder="Enter full name of the sender"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <label
            htmlFor="phone"
            className="text-[0.875rem] leading-[1.5rem] text-[#616161]"
          >
            Sender's phone number
          </label>
          <div className="flex w-full h-10 px-1 items-center justify-center gap-1 border-b border-[#808080]">
            <Image
              src={"/delivery/icons/phone.png"}
              alt="icons"
              height={16}
              width={16}
            />
            <input
              type="tel"
              className="w-full py-1 focus:outline-none text-[0.875rem] leading-[1.125rem]"
              placeholder="Enter contact of the sender"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 w-full">
          <h3 className="text-[1rem] leading-[1.25rem] text-[#616161]">
            Preferred Vehicle
          </h3>
          <div className="flex p-[0.625rem] justify-between items-center w-full">
            <div className="flex items-center justify-center py-[0.7rem] px-[2.2rem] rounded-[0.9rem] bg-[#F8F8F8] cursor-pointer">
              <Image
                src={"/delivery/bike.png"}
                alt="bike"
                width={36}
                height={36}
                className="w-[2.2rem] h-[2.2rem]"
              />
            </div>
            <div className="flex items-center justify-center py-[0.7rem] px-[2.2rem] rounded-[0.9rem] bg-[#F8F8F8] cursor-pointer">
              <Image
                src={"/delivery/cab.png"}
                alt="bike"
                width={36}
                height={36}
                className="w-[2.2rem] h-[2.2rem]"
              />
            </div>
          </div>
          <button className="w-full px-8 py-4 flex items-center justify-center text-white rounded-[2rem] bg-[#FE581C] leading-[1.5rem] text-[1rem] mt-16">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSchedule;
