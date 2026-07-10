import React from "react";
import FloatingInfoContainer from "../../../shared/FloatingInfoContainer";
import Location from "../../../icons/tracking/Location";
import Message from "../../../icons/tracking/Message";
import { useAppDispatch } from "@/app/(delivery)/delivery/store/hooks";
import {
  setTrackingMessage,
  startJobCreation,
} from "@/app/(delivery)/delivery/store/mapSlice";

const StartTracking = () => {
  const dispatch = useAppDispatch();
  return (
    <FloatingInfoContainer>
      <div className="flex w-full justify-center items-center gap-8">
        <div className="flex flex-col justify-center items-start gap-2 w-full">
          <div className="flex gap-8 items-center w-full">
            <h2 className="text-[#808080] font-medium leading-[1.25rem]">
              Rider is approaching destination...
            </h2>
            <h2 className="text-[#616161] font-medium leading-[1.25rem]">
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
        <div
          className="cursor-pointer"
          onClick={() => {
            dispatch(startJobCreation());
            dispatch(setTrackingMessage(true));
          }}
        >
          <Message />
        </div>
      </div>
    </FloatingInfoContainer>
  );
};

export default StartTracking;
