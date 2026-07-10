import React from 'react'
import PrimaryButton from '../../../shared/PrimaryButton';
import { useRouter } from 'next/navigation';
import WalletIcon from '../../../icons/tracking/WalletIcon';

const CashUnavailable = () => {
  const router = useRouter()
  return (
    <div className="flex w-full flex-col items-start gap-8">
      <h2 className="text-[#616161] text-[1rem] leading-5">
        Please ensure your card has sufficient balance, as cash payment is
        unavailable for this delivery.
      </h2>
      <PrimaryButton label='Go to wallet' fullWidth icon={<WalletIcon />} onClick={() => router.push('/delivery/wallet')}/>
    </div>
  );
}

export default CashUnavailable 