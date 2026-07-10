import React from "react";
import FloatingInfoContainer from "../../../shared/FloatingInfoContainer";
import Image from "next/image";
import From from "../../../icons/tracking/From";
import To from "../../../icons/tracking/To";
import PrimaryButton from "../../../shared/PrimaryButton";

const ReturnPackage = () => {
  return (
    <FloatingInfoContainer>
      <div className="flex items-center justify-center gap-4 h-full">
        <div className="flex flex-col justify-center items-start gap-2 w-full">
          <h2 className="text-[#FE581C] font-medium leading-[1.25rem] text-[0.9rem]">
            Your rider has requested a return package.
          </h2>
          <div className="flex items-center gap-3">
            <Image
              src={"/delivery/active-profile.png"}
              alt="profile"
              height={32}
              width={32}
            />
            <div className="flex flex-col items-start">
              <h2 className="text-[#616161] text-[0.875rem] font-medium leading-[1.125rem]">
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
        <PrimaryButton label="Accept" className="py-[0.7rem] px-[1.8rem] mt-4"/>
      </div>
    </FloatingInfoContainer>
  );
};

export default ReturnPackage;
