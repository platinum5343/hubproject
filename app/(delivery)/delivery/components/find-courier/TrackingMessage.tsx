import PreviousIcon from "../icons/PreviousIcon";
import { useAppDispatch } from "../../store/hooks";
import Image from "next/image";
import Rating from "../icons/assign-courier/Rating";
import InfoIcon from "../icons/assign-courier/InfoIcon";
import PrimaryButton from "../shared/PrimaryButton";
import SendMessage from "../icons/tracking/SendMessage";

const TrackingMessage = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-[1.25rem] font-medium leading-[1.75rem]">
          Tracking Package
        </h1>
        <div className="flex flex-col gap-2 w-full">
          <div className="w-full p-3 flex items-center gap-2">
            <Image
              src={"/delivery/active-profile.png"}
              alt="profile"
              height={50}
              width={50}
            />
            <div className="flex items-center gap-3 w-full">
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-1 text-[#616161] font-medium">
                  <h2 className="leading-[1.25rem]">Janet Doe</h2>
                  <div className="w-[0.125rem] h-[0.125rem] bg-[#FE581C] rounded-full"></div>
                  <h2 className="text-[0.75rem] leading-4">8 minutes away</h2>
                </div>
                <div className="flex gap-1 items-center leading-4 text-[0.75rem]">
                  <div className="flex items-center gap-1">
                    <Rating />
                    <h2 className="text-[#FE581C] ">4.69</h2>
                  </div>
                  <h2 className="text-[#808080]">253 Rides</h2>
                </div>
              </div>
              <InfoIcon />
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 w-full h-[12.5rem] py-4 rounded-[1rem] border border-[#808080] px-2">
            <div className="flex items-center">
              <label className="text-[0.875rem] leading-[1.125rem]">leave a message</label>
            </div>
            <textarea placeholder="Say something" className="flex py-1 items-start gap-[0.625rem] w-full " rows={6} />
          </div>
        </div>
      </div>

      <PrimaryButton label="Send" fullWidth icon={<SendMessage />} className="md:mt-24 mt-40"/>
    </div>
  );
};

export default TrackingMessage;
