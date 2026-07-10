import Image from "next/image";
import React, { useState } from "react";

const AddNewCardForm = () => {
  const [selectedCard, setSelectedCard] = useState<
    "mastercard" | "visa" | null
  >(null);

  return (
    <form className="flex flex-col items-start gap-4 w-full">
      <div className="flex items-center gap-2">
        <div
          onClick={() => setSelectedCard("mastercard")}
          className={`flex w-[3.1875rem] h-[1.82813rem] py-[0.4rem] px-[0.8rem] justify-center items-center rounded-[0.9rem] bg-[#FDFDFD] cursor-pointer transition-all duration-200 ${
            selectedCard === "mastercard"
              ? "border border-[#FE581C]"
              : "border border-transparent"
          }`}
        >
          <Image
            src={"/delivery/wallet/mastercard.svg"}
            alt="mastercard"
            className="w-[1.6rem] h-[1rem]"
            width={26}
            height={16}
          />
        </div>
        <div
          onClick={() => setSelectedCard("visa")}
          className={`flex w-[3.1875rem] h-[1.82813rem] py-[0.4rem] px-[0.8rem] justify-center items-center rounded-[0.9rem] bg-[#FDFDFD] cursor-pointer transition-all duration-200 ${
            selectedCard === "visa"
              ? "border border-[#FE581C]"
              : "border border-transparent"
          }`}
        >
          <Image
            src={"/delivery/wallet/visa.svg"}
            alt="visa"
            className="w-[1.9rem] h-[1rem]"
            width={32}
            height={10}
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 w-full">
        <label className="text-[#616161] text-[0.875rem] leading-6">
          Card Number
        </label>
        <div className="flex  h-12 px-4 justify-between items-center w-full rounded-4xl border border-[#D3D3D3]">
          <input
            type="number"
            placeholder="4566 0000 0000 0000"
            className="flex py-1 items-start gap-[0.625rem] w-full focus:outline-none text-[0.875rem] leading-[1.125rem]"
          />
          <Image
            src={"/delivery/wallet/card.svg"}
            alt="calendar"
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 w-full">
        <label className="text-[#616161] text-[0.875rem] leading-6">
          Expiry Date
        </label>
        <div className="flex  h-12 px-4 justify-between items-center w-full rounded-4xl border border-[#D3D3D3]">
          <input
            type="text"
            placeholder="MM/YY"
            className="flex py-1 items-start gap-[0.625rem] w-full focus:outline-none text-[0.875rem] leading-[1.125rem]"
          />
          <Image
            src={"/delivery/wallet/calendar.svg"}
            alt="calendar"
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 w-full">
        <label className="text-[#616161] text-[0.875rem] leading-6">CVV</label>
        <div className="flex  h-12 px-4 justify-between items-center w-full rounded-4xl border border-[#D3D3D3]">
          <input
            type="number"
            placeholder="000"
            className="flex py-1 items-start gap-[0.625rem] w-full focus:outline-none text-[0.875rem] leading-[1.125rem]"
          />
          <Image
            src={"/delivery/wallet/info.svg"}
            alt="calendar"
            width={16}
            height={16}
            className="w-4 h-4"
          />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 w-full">
        <label className="text-[#616161] text-[0.875rem] leading-6">
          Cardholder's Name
        </label>
        <div className="flex  h-12 px-4 justify-between items-center w-full rounded-4xl border border-[#D3D3D3]">
          <input
            type="text"
            placeholder="Enter cardholder's name"
            className="flex py-1 items-start gap-[0.625rem] w-full focus:outline-none text-[0.875rem] leading-[1.125rem]"
          />
        </div>
      </div>
      <button className="w-full mt-4 bg-[#FE581C] rounded-[1.5rem] h-[2.7rem] text-white text-[0.75rem] leading-[1.13rem] cursor-pointer hover:bg-[#f54708] transition-colors duration-500 ease-in-out">
        Add New Card
      </button>
    </form>
  );
};

export default AddNewCardForm;
