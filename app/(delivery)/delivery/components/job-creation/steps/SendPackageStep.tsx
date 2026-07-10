// components/job-creation/steps/SendPackageStep.tsx
"use client";
import { useState, useRef } from "react";
import PreviousIcon from "../../icons/PreviousIcon";
import ProgressIndicator from "../../PackageFormShared/ProgressIndicator";
import FormHeader from "../../SendPackageForm/FormHeader";
import FormFields from "../../SendPackageForm/FormFields";
import VehicleSelector from "../../PackageFormShared/VehicleSelector";
import FormActions from "../../PackageFormShared/FormActions";
import { useSendPackageForm } from "../../../hooks/useSendPackageForm";

const SendPackageStep = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    // Form state
    description,
    numberOfPackages,
    receiverName,
    receiverPhone,
    preferredVehicle,
    currentStop,
    hasMultipleStops,
    totalStops,
    currentPackageFormIndex,

    // Setters
    setDescription,
    setNumberOfPackages,
    setReceiverName,
    setReceiverPhone,
    setPreferredVehicle,

    // Handlers
    handleSubmit,
    handleBack,
    handlePrevStep,
  } = useSendPackageForm();

  const showBackButton = hasMultipleStops && currentPackageFormIndex > 0;

  const handleFormScroll = () => {
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 600);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 overflow-hidden">
      {/* Back to previous step button */}
      <div
        onClick={handlePrevStep}
        className="cursor-pointer hover:opacity-75 transition-all duration-500 ease-in-out flex-shrink-0"
      >
        <PreviousIcon />
      </div>

      <div className="flex flex-col w-full h-full items-start justify-between overflow-hidden">
        <div
          className={`flex flex-col items-start gap-[1.25rem] w-full flex-shrink-0 pb-4 relative z-10 transition-colors duration-300 border-b ${
            isScrolling ? "border-[#E8E8E8]" : "border-transparent"
          }`}
        >
          {/* Progress indicator (3 dots) */}
          <ProgressIndicator currentMajorStep={1} />

          {/* Form header with title and location */}
          <FormHeader
            hasMultipleStops={hasMultipleStops}
            currentIndex={currentPackageFormIndex}
            totalStops={totalStops}
            currentLocation={currentStop.location}
          />
        </div>

        {/* Main form */}
        <form
          onSubmit={handleSubmit}
          onScroll={handleFormScroll}
          className="flex flex-col items-start gap-4 mt-[1.25rem] w-full overflow-y-auto pr-2 pb-20 scrollbar-hide flex-1"
        >
          {/* Form input fields */}
          <FormFields
            description={description}
            numberOfPackages={numberOfPackages}
            receiverName={receiverName}
            receiverPhone={receiverPhone}
            onDescriptionChange={setDescription}
            onNumberChange={setNumberOfPackages}
            onNameChange={setReceiverName}
            onPhoneChange={setReceiverPhone}
          />

          {/* Vehicle selection */}
          <VehicleSelector
            selectedVehicle={preferredVehicle}
            onSelect={setPreferredVehicle}
          />

          {/* Action buttons */}
          <FormActions showBackButton={showBackButton} onBack={handleBack} />
        </form>
      </div>
    </div>
  );
};

export default SendPackageStep;
