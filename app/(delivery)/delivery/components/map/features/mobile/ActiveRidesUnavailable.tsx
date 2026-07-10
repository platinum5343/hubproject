import React from "react";
import ScheduleIcon from "../../../icons/tracking/ScheduleIcon";
import Link from "next/link";
import PrimaryButton from "../../../shared/PrimaryButton";

const ActiveRidesUnavailable = () => {
  return (
    <div className="flex flex-col w-full items-start gap-8">
      <div className="flex items-center gap-4">
        <h2 className="text-[#616161] text-[1rem] leading-[1.25rem]">
          You have reached your limit of active riders, kindly schedule for
          later
        </h2>
        <Link href={'/delivery/scheduled-delivery'}>
          <ScheduleIcon />
        </Link>
      </div>
      <PrimaryButton label="Find Courier" fullWidth variant="secondary"/>
    </div>
  );
};

export default ActiveRidesUnavailable;
