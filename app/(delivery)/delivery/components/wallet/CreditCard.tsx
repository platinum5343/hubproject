import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CreditCard = () => {
  return (
    <div className="flex w-full lg:w-[31rem] h-[11rem] sm:h-[12rem] md:h-[18rem] lg:h-full rounded-2xl sm:rounded-3xl bg-[#A66148] relative px-6 sm:px-7 md:px-8 py-6 sm:py-8 md:py-9 lg:py-10 text-white">
      <Image
        src={"/delivery/wallet/card-vector.png"}
        alt="card"
        width={348}
        height={200}
        className="w-full h-full absolute inset-0"
      />
      <div className="flex flex-col w-full h-full">
        <div className="flex items-start w-[90%] justify-between">
          <h3
            className={`${inter.className} text-lg sm:text-xl md:text-2xl lg:text-[1.7rem] font-semibold leading-tight sm:leading-6 md:leading-7 lg:leading-8`}
          >
            FIDELITY
          </h3>
          <Image
            src={"/delivery/wallet/contactless.svg"}
            alt="wifi"
            width={24}
            height={32}
            className="w-4 sm:w-5 md:w-5 lg:w-6 h-5 sm:h-6 md:h-7 lg:h-8"
          />
          <h4
            className={`${inter.className} text-sm sm:text-base md:text-lg lg:text-[1.2rem] font-semibold leading-tight sm:leading-5 md:leading-5 lg:leading-6`}
          >
            Debit
          </h4>
        </div>
        <div className="flex w-full justify-between mt-3 sm:mt-3.5 md:mt-4">
          <Image
            src={"/delivery/wallet/smartchip.svg"}
            alt="smartchip"
            width={63}
            height={42}
            className="w-10 sm:w-11 md:w-12 lg:w-[4rem] h-7 sm:h-8 md:h-9 lg:h-[3rem]"
          />
          <Image
            src={"/delivery/wallet/mastercard.svg"}
            alt="mastercard"
            width={48}
            height={28}
            className="w-9 sm:w-10 md:w-11 lg:w-[4.2rem] h-6 sm:h-7 md:h-8 lg:h-[2.6rem]"
          />
        </div>
        <div className="flex w-full justify-between mt-10 md:mt-24 lg:mt-16">
          <div className={`flex flex-col items-start ${inter.className}`}>
            <h4 className="text-sm sm:text-base md:text-lg lg:text-[1.4rem] font-semibold leading-tight sm:leading-5 md:leading-6 lg:leading-[1.7rem]">
              5678 XXXX XXXX 8562
            </h4>
            <h4 className="text-xs sm:text-sm md:text-base lg:text-[1rem] font-semibold leading-tight sm:leading-4 md:leading-5 lg:leading-[1.4rem] mt-1">
              JANE DOE
            </h4>
          </div>
          <div
            className={`${inter.className} flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4`}
          >
            <h4 className="text-[0.45rem] sm:text-[0.5rem] md:text-[0.55rem] lg:text-[0.6rem] font-medium leading-tight w-5 sm:w-6">
              VALID THRU
            </h4>
            <h4 className="text-xs sm:text-sm md:text-base lg:text-[1rem] font-medium leading-tight sm:leading-4 md:leading-5 lg:leading-[1.4rem]">
              06/24
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
