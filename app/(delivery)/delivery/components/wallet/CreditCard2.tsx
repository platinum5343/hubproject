import Image from "next/image";
import { Inter } from "next/font/google";
import { useAppSelector } from "../../store/hooks";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const CreditCard2 = () => {
  const cardColor = useAppSelector((state) => state.card.cardColors[1]);

  return (
    <div
      className="flex w-[17rem] sm:w-[19rem] md:w-[22rem] lg:w-[24.7rem] h-[9rem] sm:h-[11rem] md:h-[12rem] lg:h-[14rem] rounded-2xl sm:rounded-3xl relative px-6 sm:px-7 md:px-8 py-6 sm:py-8 md:py-9 lg:py-10 text-white transition-colors duration-500"
      style={{ backgroundColor: cardColor }}
    >
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
            className={`${inter.className} text-[0.9rem] sm:text-xl md:text-lg lg:text-[1.4rem] font-semibold leading-[1.1rem] sm:leading-4 md:leading-5 lg:leading-6`}
          >
            FIDELITY
          </h3>
          <Image
            src={"/delivery/wallet/contactless.svg"}
            alt="wifi"
            width={24}
            height={32}
            className="w-[0.82rem] sm:w-4 md:w-4 lg:w-[1.18rem] h-[1.07rem] sm:h-5 md:h-5 lg:h-[1.55rem]"
          />
          <h4
            className={`${inter.className} text-[0.657rem] sm:text-base md:text-lg lg:text-[0.9rem] font-semibold leading-[0.84rem] sm:leading-4 lg:leading-[1.2rem]`}
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
            className="w-[2.1rem] sm:w-9 md:w-10 lg:w-[3rem] h-[1.4rem] sm:h-6 md:h-7 lg:h-[2rem]"
          />
          <Image
            src={"/delivery/wallet/mastercard.svg"}
            alt="mastercard"
            width={48}
            height={28}
            className="w-[2.3rem] sm:w-10 md:w-11 lg:w-[3.3rem] h-[1.4rem] sm:h-7 lg:h-[2rem]"
          />
        </div>
        <div className="flex w-full justify-between mt-6 lg:mt-12">
          <div className={`flex flex-col items-start ${inter.className}`}>
            <h4 className="text-[0.75rem] sm:text-sm md:text-sm lg:text-[1rem] font-semibold leading-[0.9rem] sm:leading-5 md:leading-6 lg:leading-[1.7rem]">
              5678 XXXX XXXX 8562
            </h4>
            <h4 className="text-[0.5rem] sm:text-xs  lg:text-[0.8rem] font-semibold leading-[0.75rem] sm:leading-4 md:leading-5 lg:leading-[1rem] mt-1">
              JANE DOE
            </h4>
          </div>
          <div
            className={`${inter.className} flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-4`}
          >
            <h4 className="text-[0.3rem] sm:text-[0.35rem]  lg:text-[0.4rem] font-medium leading-[0.5rem] md:leading-[0.6rem] w-5 sm:w-6">
              VALID THRU
            </h4>
            <h4 className="text-[0.5rem] sm:text-xs lg:text-[0.8rem] font-medium leading-[0.75rem] lg:leading-[1rem]">
              06/24
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCard2;
