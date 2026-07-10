import Image from "next/image";
import React from "react";
import From from "../../../icons/tracking/From";
import To from "../../../icons/tracking/To";
import Rating from "../../../icons/tracking/Rating";
import StarMobile from "../../../icons/rating/StarMobile";
import PrimaryButton from "../../../shared/PrimaryButton";

const RideComplete = () => {
  return (
    <div className="w-full flex flex-col items-start gap-8">
      <div className="flex items-center gap-4">
        <div className="flex flex-col justify-center items-start gap-2">
          <h2 className="text-[#FE581C] font-medium leading-[1.25rem] whitespace-nowrap">
            Your rider has completed your delivery
          </h2>
          <div className="flex items-center gap-3">
            <Image
              src={"/delivery/active-profile.png"}
              alt="profile"
              width={32}
              height={32}
            />
            <div className="flex flex-col items-start">
              <h2 className="text-[#616161] text-[0.875rem] font-medium leading-[1.25rem]">
                Janet Doe
              </h2>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1">
                  <From />
                  <h3 className="text-[#616161] text-[0.75rem] leading-4 truncate w-[5rem] md:w-[8rem]">
                    1 Marine Base Road, Port Harcourt
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  <To />
                  <h3 className="text-[#616161] text-[0.75rem] leading-4 truncate w-[5rem] md:w-[8rem]">
                    Q32X+WCX, Port Harcourt Refinery, Abuloma, Port Harcourt
                    501101, Rivers
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <StarMobile />
      </div>
      <PrimaryButton label="Close" variant="outline" fullWidth/>
    </div>
  );
};

export default RideComplete;
