import React from 'react'
import FloatingInfoContainer from '../../../shared/FloatingInfoContainer'
import PrimaryButton from '../../../shared/PrimaryButton';
import ScheduleDesktopIcon from '../../../icons/tracking/ScheduleDesktopIcon';
import { useRouter } from 'next/navigation';

const UnavailableRiders = () => {
  const router = useRouter()
  return (
    <FloatingInfoContainer>
      <div className="flex justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-start gap-1">
          <h2 className="text-[#616161] text-[1rem] leading-5">
            We currently can’t find any available riders, can you wait or
            schedule for later?
          </h2>
          <div className="flex items-center gap-1 text-[#FE581C] text-[1rem] font-medium leading-5">
            <h2>Closet rider is</h2>
            <h2>47 mins away</h2>
          </div>
        </div>
        <PrimaryButton label='Schedule' icon={<ScheduleDesktopIcon />} onClick={() => router.push('/delivery/scheduled-delivery')}/>
      </div>
    </FloatingInfoContainer>
  );
}

export default UnavailableRiders