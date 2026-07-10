import React from "react";
import FloatingInfoContainer from "../../../shared/FloatingInfoContainer";
import PrimaryButton from "../../../shared/PrimaryButton";
import ScheduleDesktopIcon from "../../../icons/tracking/ScheduleDesktopIcon";
import { useRouter } from "next/navigation";

const ActiveRidesUnavailable = () => {
  const router = useRouter()
  return (
    <FloatingInfoContainer>
      <div className="flex justify-center items-center gap-4  h-full">
        <h2 className="leading-[1.25rem]">
          You have reached your limit of active riders, kindly schedule for
          later
        </h2>
        <PrimaryButton label="Schedule" className="mt-4" icon={<ScheduleDesktopIcon />} onClick={() => router.push('/delivery/scheduled-delivery')}/>
      </div>
    </FloatingInfoContainer>
  );
};

export default ActiveRidesUnavailable;
