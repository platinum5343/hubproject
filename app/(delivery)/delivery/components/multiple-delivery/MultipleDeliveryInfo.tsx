// components/multiple-delivery/MultipleDeliveryInfo.tsx
import React from "react";
import PreviousIcon from "../icons/PreviousIcon";
import { useAppDispatch } from "../../store/hooks";
import { setMultipleDeliveryInfo } from "../../store/mapSlice";
import StepItem from "./StepItem";
import { howItWorksSteps } from "../../utils/multiple-delivery-data"

const MultipleDeliveryInfo = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      {/* Back button */}
      <div
        onClick={() => dispatch(setMultipleDeliveryInfo(false))}
        className="cursor-pointer hover:opacity-75 transition-all duration-500 ease-in-out"
      >
        <PreviousIcon />
      </div>

      {/* What is Multiple Delivery section */}
      <div className="flex flex-col w-full items-start gap-2 mt-6">
        <h1 className="text-[#FE581C] text-[1.25rem] font-semibold leading-[1.75rem]">
          What is Multiple Delivery?
        </h1>
        <h2 className="text-[#616161] text-[0.875rem] leading-[1.125rem]">
          Our One Rider, Multiple Deliveries feature lets you send several items
          at once using a single rider saving you time, money, and hassle.
        </h2>
      </div>

      {/* How it works section */}
      <div className="mt-[2.62rem] flex w-full flex-col items-start gap-4">
        <h1 className="text-[#FE581C] text-[1.25rem] font-semibold leading-[1.75rem]">
          How it works?
        </h1>
        <div className="flex flex-col items-start gap-4 w-full">
          {howItWorksSteps.map((step) => (
            <StepItem
              key={step.id}
              icon={step.icon}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MultipleDeliveryInfo;
