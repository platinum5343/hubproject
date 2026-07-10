import React from "react";
import { useAppSelector } from "../../store/hooks";
import LocationStep from "./steps/LocationStep";
import AddDeliveryStops from "./steps/AddDeliveryStops";
import SendPackageStep from "./steps/SendPackageStep";
import ReceivePackageStep from "./steps/ReceivePackageStep";
import PaymentMethod from "./steps/PaymentMethod";
import DeliverySummary from "./steps/DeliverySummary";
import AssignCourier from "../find-courier/AssignCourier";
import MultipleDeliveryInfo from "../multiple-delivery/MultipleDeliveryInfo";
import StepTransition from "../shared/StepTransition";
import TrackingMessage from "../find-courier/TrackingMessage";

const StepManager = () => {
  const { paymentVerified, deliveryType, currentStep, multipleDeliveryInfo, trackingMessage } =
    useAppSelector((state) => state.map);

  // If payment is verified, show success view instead of steps
  if (paymentVerified) {
    return (
      <div className="w-full flex flex-col items-start unageo-regular h-full relative">
        <StepTransition stepKey="assign-courier">
          <AssignCourier />
        </StepTransition>
      </div>
    );
  }

  if (trackingMessage) {
    return (
      <div className="w-full flex flex-col items-start unageo-regular h-full relative">
        <StepTransition stepKey="tracking-message">
          <TrackingMessage />
        </StepTransition>
      </div>
    );
  }

  if (multipleDeliveryInfo) {
    return (
      <div className="w-full flex flex-col items-start unageo-regular h-full relative">
        <StepTransition stepKey="multiple-delivery-info">
        <MultipleDeliveryInfo />
        </StepTransition>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepTransition stepKey="step-1">
            <LocationStep />
          </StepTransition>
        );
      case 2:
        return (
          <StepTransition stepKey="step-2">
            <AddDeliveryStops />
          </StepTransition>
        );
      case 3:
        //Route based on delivery type
         return (
           <StepTransition stepKey="step-3">
             {deliveryType === "send" ? (
               <SendPackageStep />
             ) : (
               <ReceivePackageStep />
             )}
           </StepTransition>
         );
      case 4:
        return (
          <StepTransition stepKey="step-4">
            <DeliverySummary />
          </StepTransition>
        );
      case 5:
         return (
           <StepTransition stepKey="step-5">
             <PaymentMethod />
           </StepTransition>
         );
      default:
       return (
         <StepTransition stepKey="step-default">
           <LocationStep />
         </StepTransition>
       );
    }
  };
  return (
    <div className="w-full flex flex-col items-start unageo-regular h-full relative">
      {renderStep()}
    </div>
  );
};

export default StepManager;
