import Image from 'next/image';
import React from 'react'
import From from '../../../icons/tracking/From';
import To from '../../../icons/tracking/To';
import PrimaryButton from '../../../shared/PrimaryButton';

const ReturnPackage = () => {
  return (
    <div className="flex w-full flex-col items-start gap-[2.625rem]">
      <div className="flex flex-col justify-center items-start gap-2">
        <h2 className="text-[#FE581C] text-[1rem] font-medium leading-5">
          Your rider has requested a return package.
        </h2>
        <div className="flex items-start gap-3">
          <Image
            alt="profile"
            src={"/delivery/active-profile.png"}
            width={32}
            height={32}
          />
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-[#616161] text-[1rem] font-medium leading-[1.25rem]">
              Janet Doe
            </h2>
            <div className="flex flex-col justify-center items-start gap-2">
              <div className="flex items-center gap-1">
                <From />
                <h3 className="text-[#616161] text-[0.75rem] leading-4 truncate w-[15rem]">
                  1 Marine Base Road, Port Harcourt
                </h3>
              </div>
              <div className="flex items-center gap-1">
                <To />
                <h3 className="text-[#616161] text-[0.75rem] leading-4 truncate w-[15rem] ">
                  Q32X+WCX, Port Harcourt Refinery, Abuloma, Port Harcourt
                  501101, Rivers
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PrimaryButton label='Accept' fullWidth/>
    </div>
  );
}

export default ReturnPackage