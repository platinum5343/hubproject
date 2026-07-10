import Image from "next/image";
import React from "react";
import Rating from "../icons/assign-courier/Rating";
import InfoIcon from "../icons/assign-courier/InfoIcon";
import ConfirmInfo from "../icons/assign-courier/ConfirmInfo";
import FromIcon from "../icons/assign-courier/FromIcon";
import ToIcon from "../icons/assign-courier/ToIcon";
import PrimaryButton from "../shared/PrimaryButton";

const AssignCourier = () => {
  return (
    <div className="w-full flex flex-col justify-between items-center">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex w-full h-[4.5625rem] p-3 items-start">
            <div className="flex items-center gap-2 w-full ">
              <Image
                src={"/delivery/active-profile.png"}
                width={50}
                height={50}
                alt="profile"
                className="object-cover"
              />
              <div className="flex items-center gap-3 w-full">
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-1">
                    <h1 className="text-[#616161] text-[1rem] font-medium leading-[1.25rem]">
                      Janet Doe
                    </h1>
                    <div className="flex items-center gap-[0.1875rem]">
                      <div className="w-[0.125rem] h-[0.125rem] bg-[#FE581C] rounded-full"></div>
                      <h2 className="text-[#616161] text-[0.75rem] font-medium leading-[1rem]">
                        8 minutes away
                      </h2>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Rating />
                    <h2 className="text-[#FE581C] text-[0.75rem] leading-4">
                      4.69
                    </h2>
                    <h2 className="text-[#808080] text-[0.75rem] leading-[1rem]">
                      253 rides
                    </h2>
                  </div>
                </div>
                <InfoIcon />
              </div>
            </div>
          </div>
          <h1 className="text-[1rem] font-medium leading-5 text-[#FE581C] text-center">
            Arriving in 8 minutes...
          </h1>
        </div>
        <div className="w-full h-[0.25rem] bg-[#E8E8E8] rounded-[1.25rem]"></div>
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col items-center gap-1 text-[0.875rem] text-[#616161] leading-[1.125rem]">
            <h2>Vehicle Type:</h2>
            <h2 className="font-semibold">Silver Camry</h2>
          </div>
          <div className="flex flex-col items-start gap-1 text-[0.875rem] text-[#616161] leading-[1.125rem]">
            <h2>Plate Number:</h2>
            <h2 className="font-semibold">WU7372TWUWE</h2>
          </div>
        </div>
        <div className="w-full h-[0.25rem] bg-[#E8E8E8] rounded-[1.25rem]"></div>
        <div className="flex flex-col w-full h-[6.125rem] justify-between items-start relative">
          <div className="flex items-center gap-1">
            <FromIcon />
            <h2 className="text-[#616161] text-[0.75rem] leading-4">
              Q32X+WCX, Port Harcourt Refinery, Abuloma, Port Harcourt 501101,
              Rivers
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <ToIcon />
            <h2 className="text-[#616161] text-[0.75rem] leading-4">
              1 Marine Base Road, Port Harcourt
            </h2>
          </div>
          <div className="w-[0.25rem] h-[1.875rem] absolute bottom-[1.9375rem] left-[0.5625rem] rounded-[1.25rem] bg-[#E8E8E8]"></div>
        </div>
        <div className="w-full h-[0.25rem] bg-[#E8E8E8] rounded-[1.25rem]"></div>
        <div className="flex w-full items-center gap-1">
          <ConfirmInfo />
          <h2 className="text-[#616161] text-[0.75rem] leading-4">
            Please confirm your rider starts your ride before leaving!
          </h2>
        </div>
      </div>
      <div className="w-full mt-10">
        <PrimaryButton label="Confirm ride" fullWidth />
      </div>
    </div>
  );
};

export default AssignCourier;
