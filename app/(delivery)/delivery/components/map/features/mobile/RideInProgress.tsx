import PrimaryButton from "../../../shared/PrimaryButton";
import CourierInfo from "../../../tracking/CourierInfo";

const RideInProgress = () => {
  return (
    <div className="flex flex-col w-full items-start gap-8">
      <CourierInfo />
      <PrimaryButton label="Cancel ride" fullWidth variant="outline" />
    </div>
  );
};

export default RideInProgress;
