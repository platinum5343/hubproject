"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setPaymentVerified, setLoadingPayment } from "../../../store/mapSlice";
import PrimaryButton from "../../shared/PrimaryButton";
import PaymentLoader from "../../shared/Loader";

const CashPaymentScreen = () => {
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const { isLoadingPayment } = useAppSelector((state) => state.map);

  const handleConfirm = () => {
    // Show loading
    setIsProcessing(true);
    dispatch(setLoadingPayment(true));

    // Simulate processing - 3 seconds
    setTimeout(() => {
      dispatch(setLoadingPayment(false));
      dispatch(setPaymentVerified(true));
      setIsProcessing(false);
    }, 3000);
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

  return (
    <>
      <div className="flex flex-col w-full h-full justify-between mt-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-[1.25rem] font-medium leading-[1.75rem]">
              Cash Payment
            </h3>
            <p className="text-[#616161] text-[0.875rem] leading-[1.125rem]">
              You will pay the courier in cash upon delivery.
            </p>
          </div>

          {/* Payment details */}
          <div className="flex flex-col gap-4 p-4 rounded-[1rem] bg-[#F8F8F8]">
            <div className="flex justify-between items-center">
              <span className="text-[#616161] text-[0.875rem]">
                Delivery Fee:
              </span>
              <span className="text-[1rem] font-medium">NGN 4,500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#616161] text-[0.875rem]">
                Service Charge:
              </span>
              <span className="text-[1rem] font-medium">NGN 500</span>
            </div>
            <div className="w-full h-px bg-[#E8E8E8]"></div>
            <div className="flex justify-between items-center">
              <span className="text-[1rem] font-medium">Total:</span>
              <span className="text-[1.25rem] font-semibold text-[#FE581C]">
                NGN 5,000
              </span>
            </div>
          </div>

          {/* Payment instructions */}
          <div className="flex flex-col gap-2 p-4 rounded-[1rem] border border-[#FE581C] bg-[#FFF5F0]">
            <h4 className="text-[1rem] font-medium text-[#FE581C]">
              Payment Instructions
            </h4>
            <ul className="list-disc list-inside text-[0.875rem] text-[#616161] space-y-1">
              <li>Have the exact amount ready</li>
              <li>Payment will be collected upon delivery</li>
              <li>Request a receipt from the courier</li>
            </ul>
          </div>
        </div>

        {/* Confirm button */}
        <div className="mt-6">
          <PrimaryButton
            label="Confirm & Proceed"
            onClick={handleConfirm}
            disabled={isProcessing}
            fullWidth
          />
        </div>
      </div>
    </>
  );
};

export default CashPaymentScreen;
