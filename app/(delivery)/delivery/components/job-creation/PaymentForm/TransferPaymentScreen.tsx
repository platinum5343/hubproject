"use client";
import { useState, useEffect } from "react";
import CopyAndPaste from "../../icons/payment-method/CopyAndPaste";
import PaymentLoader from "../../shared/Loader";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  closeJobCreation,
  prevStep,
  resetJobCreation,
  setLoadingPayment,
} from "../../../store/mapSlice";
import PrimaryButton from "../../shared/PrimaryButton";

const TransferPaymentScreen = () => {
  const dispatch = useAppDispatch();
  // const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const accountNumber = "2345679194";
  const { isLoadingPayment } = useAppSelector((state) => state.map);

  // Simulate API call - show loader for 3 seconds ONLY on mount
  useEffect(() => {
    dispatch(setLoadingPayment(true));

    const timer = setTimeout(() => {
      dispatch(setLoadingPayment(false));
    }, 3000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleCancel = () => {
    // dispatch(resetJobCreation())
    dispatch(closeJobCreation());
  };

  // Show loader while loading
  if (isLoadingPayment) {
    return (
      <div className="relative w-full h-full">
        {/* Loader centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PaymentLoader message="Please wait..." size="lg" />
        </div>
      </div>
    );
  }

  // Show actual content after loading
  return (
    <>
      <div className="flex flex-col w-full justify-between items-start mt-4 h-full">
        <div className="flex flex-col items-start gap-4 w-full">
          <div className="flex flex-col items-start gap-1">
            <h1 className="text-[1.25rem] font-medium leading-[1.75rem]">
              Pay With Bank Transfer
            </h1>
            <h2 className="text-[#616161] text-[0.875rem] leading-[1.125rem]">
              Copy the account number and proceed to your bank app to complete
              this transfer
            </h2>
          </div>

          <div className="w-full flex p-2 justify-between items-center rounded-lg bg-[#F8F8F8] text-[1rem] leading-[1.25rem] text-[#808080]">
            <h2>Expires in:</h2>
            <h2>00:59:00</h2>
          </div>

          <div className="flex flex-col items-start gap-6 w-full">
            <div className="flex py-1 px-[0.125rem] flex-col items-start gap-1 border-b border-b-[#E8E8E8] w-full">
              <h2 className="text-[1rem] font-medium leading-[1.25rem]">
                Amount
              </h2>
              <h2 className="text-[0.875rem] leading-[1.125rem]">NGN 4500</h2>
            </div>

            <div className="flex py-1 px-[0.125rem] flex-col items-start gap-1 border-b border-b-[#E8E8E8] w-full">
              <h2 className="text-[1rem] font-medium leading-[1.25rem]">
                Bank Name
              </h2>
              <h2 className="text-[0.875rem] leading-[1.125rem]">
                WEMA BANK PLC
              </h2>
            </div>

            <div className="flex py-1 px-[0.125rem] flex-col items-start gap-1 border-b border-b-[#E8E8E8] w-full">
              <h2 className="text-[1rem] font-medium leading-[1.25rem]">
                Beneficiary
              </h2>
              <h2 className="text-[0.875rem] leading-[1.125rem]">
                DISPATCH HUB PAYOUT
              </h2>
            </div>

            <div className="flex py-1 px-[0.125rem] flex-col items-start gap-1 border-b border-b-[#E8E8E8] w-full">
              <h2 className="text-[1rem] font-medium leading-[1.25rem]">
                Account Number
              </h2>

              <div className="flex py-[1.25rem] px-[0.625rem] items-center w-full justify-between rounded-[1rem] bg-[#F8F8F8] relative">
                <h2>{accountNumber}</h2>

                <div onClick={handleCopy} className="cursor-pointer">
                  <CopyAndPaste />
                </div>

                {copied && (
                  <span className="absolute right-0 top-[-20px] text-[0.75rem] text-[#FE581C]">
                    Copied!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-4 py-8">
          <PrimaryButton
            label="Cancel"
            variant="outline"
            fullWidth
            onClick={() => {
              // dispatch(resetJobCreation());
              dispatch(closeJobCreation());
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TransferPaymentScreen;