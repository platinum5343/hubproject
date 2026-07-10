import { useAppDispatch } from "../../../store/hooks";
import { nextStep, prevStep } from "../../../store/mapSlice";
import PreviousIcon from "../../icons/PreviousIcon";
import ProgressIndicator from "../../SendPackageForm/ProgressIndicator";
import PrimaryButton from "../../shared/PrimaryButton";
import DeliverySummarySection from "../DeliverySummary/DeliverySummarySection";

const DeliverySummary = () => {
  const dispatch = useAppDispatch();
  const handleContinue = () => {
    dispatch(nextStep());
  };
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div
        onClick={() => dispatch(prevStep())}
        className="cursor-pointer hover:opacity-75 transition-all duration-500 ease-in-out"
      >
        <PreviousIcon />
      </div>
      <div className="flex flex-col w-full h-full items-start gap-4 ">
        {/* Progress indicator (3 dots) */}
        <ProgressIndicator currentMajorStep={2} />
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-[1.25rem] font-medium leading-[1.75rem]">
            Delivery Summary
          </h1>
          <h2 className="text-[0.875rem] leading-[1.125rem] text-[#616161]">
            Please review before you proceed.
          </h2>
        </div>
        <DeliverySummarySection />
      </div>
      <div className="py-8 md:mt-30 mt-10">
        <PrimaryButton label="Continue" fullWidth onClick={handleContinue} />
      </div>
    </div>
  );
};

export default DeliverySummary;
