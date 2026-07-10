import React from "react";
import FloatingInfoContainer from "../../../shared/FloatingInfoContainer";
import PrimaryButton from "../../../shared/PrimaryButton";
import WalletIcon from "../../../icons/tracking/WalletIcon";
import { useRouter } from "next/navigation";

const CashUnavailable = () => {
  const router = useRouter()
  return (
    <FloatingInfoContainer>
      <div className="flex justify-center items-center gap-4">
        <h2 className="text-[#616161] text-[1rem] leading-5">
          Please ensure your card has sufficient balance, as cash payment is
          unavailable for this delivery.
        </h2>
        <PrimaryButton label="Go to wallet" className=" whitespace-nowrap" icon={<WalletIcon />} onClick={() => router.push('/delivery/wallet')}/>
      </div>
    </FloatingInfoContainer>
  );
};

export default CashUnavailable;
