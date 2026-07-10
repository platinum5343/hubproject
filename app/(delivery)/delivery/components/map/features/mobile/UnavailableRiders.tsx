import React from 'react'
import ScheduleIcon from '../../../icons/tracking/ScheduleIcon';
import { useRouter } from 'next/navigation';
import PrimaryButton from '../../../shared/PrimaryButton';
import { useAppDispatch } from '@/app/(delivery)/delivery/store/hooks';
import { startJobCreation } from '@/app/(delivery)/delivery/store/mapSlice';

const UnavailableRiders = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  return (
    <div className="flex w-full flex-col items-start gap-8">
      <div className="flex items-center gap-4">
        <div className="flex flex-col justify-center items-start gap-1 text-[1rem] leading-5">
          <h2 className="text-[#616161]">
            We currently can’t find any available riders, can you wait or
            schedule for later?
          </h2>
          <div className="text-[#FE581C] flex items-center gap-1 font-medium">
            <h2>Closet rider is</h2>
            <h2>47 mins away</h2>
          </div>
        </div>
        <div onClick={() => router.push('/delivery/scheduled-delivery')}>
          <ScheduleIcon />
        </div>
      </div>
      <PrimaryButton label='Find Courier' fullWidth onClick={() => dispatch(startJobCreation())}/>
    </div>
  );
}

export default UnavailableRiders