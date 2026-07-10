import React from "react";
import Location from "../../../icons/tracking/Location";
import Message from "../../../icons/tracking/Message";
import PrimaryButton from "../../../shared/PrimaryButton";
import { useAppDispatch } from "@/app/(delivery)/delivery/store/hooks";
import { setStartTracking } from "@/app/(delivery)/delivery/store/trackingSlice";
import { setTrackingMessage, startJobCreation } from "@/app/(delivery)/delivery/store/mapSlice";

const StartTracking = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full flex flex-col items-start gap-8">
      <div className="flex justify-center items-center gap-8 w-full">
        <div className="flex flex-col justify-center items-start gap-2 w-full">
          <div className="flex gap-4 items-center w-full">
            <h2 className="text-[#808080] font-medium leading-[1.25rem] truncate w-[11rem]">
              Rider is approaching destination...
            </h2>
            <h2 className="text-[#616161] font-medium leading-[1.25rem] whitespace-nowrap">
              8 mins
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <Location />
            <h2 className="text-[#FE581C] text-[0.875rem] font-medium leading-[1.125rem]">
              1 Marine Base Road, Port Harcourt
            </h2>
          </div>
        </div>
        <div className="cursor-pointer" onClick={() => {
          dispatch(startJobCreation())
          dispatch(setTrackingMessage(true))
        }}>
          <Message />
        </div>
      </div>
      <PrimaryButton
        label="End Tracking"
        fullWidth
        onClick={() => dispatch(setStartTracking(false))}
      />
    </div>
  );
};

export default StartTracking;
