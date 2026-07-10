import React from "react";
import CardFunctions from "./CardFunctions";
import CreditCard1 from "./CreditCard1";
import { useAppSelector } from "../../store/hooks";
import EditCard from "./EditCard";

const OneCreditCard = () => {
  const cardFunction = useAppSelector((state) => state.cardFunction.functions);

  return (
    <div className="w-full lg:h-[26rem] xl:h-[24rem] lg:rounded-[1.25rem] lg:bg-white lg:shadow-md flex justify-center items-center lg:p-6">
      <div className="flex flex-col xl:flex-row w-full lg:w-[40rem] lg:h-[18rem] items-center justify-center gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8 md:mt-10 lg:mt-0">
        {/* Single Credit card */}
        <div className="flex w-full flex-col items-center lg:gap-[1.5rem]">
          <div className="h-[11rem] sm:h-[13rem] md:h-[13.5rem] lg:h-[14.3rem] relative w-full flex items-start justify-center">
            <div className="relative flex items-center justify-center w-full h-full pt-2 sm:pt-3 md:pt-4">
              <CreditCard1 />
            </div>
          </div>
        </div>
        {cardFunction ? <CardFunctions /> : <EditCard />}
      </div>
    </div>
  );
};

export default OneCreditCard;
