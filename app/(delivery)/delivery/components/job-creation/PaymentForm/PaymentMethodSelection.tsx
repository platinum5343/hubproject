"use client";
import { useAppDispatch } from "../../../store/hooks";
import {
  nextPaymentScreen,
  openCardOverlay,
  prevStep,
  setPaymentMethod,
} from "../../../store/mapSlice";
import { useState } from "react";
import PaymentOptionButton from "./PaymentOptionButton";
import PrimaryButton from "../../shared/PrimaryButton";
import ProgressIndicator from "../../SendPackageForm/ProgressIndicator";
import PreviousIcon from "../../icons/PreviousIcon";

const PaymentMethodSelection = () => {
  const dispatch = useAppDispatch();
  const [selectedMethod, setSelectedMethod] = useState<
    "cash" | "transfer" | "wallet" | null
  >(null);

  const handleSelectOption = (method: "cash" | "transfer" | "wallet") => {
    setSelectedMethod(method);
  };

  const handleContinue = () => {
    if (!selectedMethod) return;

    // If wallet is selected, show card selection overlay
    if (selectedMethod === "wallet") {
      dispatch(openCardOverlay());
      return;
    }

    // Map wallet to card for Redux (or update Redux to accept wallet)
    dispatch(setPaymentMethod(selectedMethod));
    dispatch(nextPaymentScreen());
  };

  const paymentOptions = [
    { id: "wallet", label: "Wallet" },
    { id: "cash", label: "Cash" },
    { id: "transfer", label: "Bank Transfer" },
  ];

  return (
    <>
      <div
        onClick={() => dispatch(prevStep())}
        className="cursor-pointer hover:opacity-75 transition-all duration-500 ease-in-out"
      >
        <PreviousIcon />
      </div>
      <ProgressIndicator currentMajorStep={3} />

      <div className="flex flex-col w-full h-full gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2 mt-4">
          <h3 className="text-[1.25rem] font-medium leading-[1.75rem]">
            Payment Method
          </h3>
          <p className="text-[#616161] text-[0.875rem] leading-[1.125rem]">
            Choose your preferred payment method
          </p>
        </div>

        {/* Payment options and button container */}
        <div className="w-full h-full flex flex-col justify-between">
          {/* Payment options */}
          <div className="flex flex-col gap-4 w-full">
            {paymentOptions.map((option) => (
              <PaymentOptionButton
                key={option.id}
                label={option.label}
                isSelected={selectedMethod === option.id}
                onClick={() =>
                  handleSelectOption(
                    option.id as "cash" | "transfer" | "wallet"
                  )
                }
              />
            ))}
          </div>

          {/* Continue button */}
          <PrimaryButton
            label="Continue"
            onClick={handleContinue}
            disabled={!selectedMethod}
            fullWidth
          />
        </div>
        {/* Linked Cards Overlay */}
      </div>
    </>
  );
};

export default PaymentMethodSelection;
