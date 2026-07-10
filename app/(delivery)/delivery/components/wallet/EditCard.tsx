import Image from "next/image";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setCardColor } from "../../store/cardSlice";
import { openCardFunction } from "../../store/cardFunctionSlice";

const EditCard = () => {
  const dispatch = useAppDispatch();
  const activeCardIndex = useAppSelector((state) => state.card.activeCardIndex);
  const cardColors = useAppSelector((state) => state.card.cardColors);

  const availableColors = [
    "#815932",
    "#1A1A1A",
    "#B22929",
    "#595BD4",
    "#167FFC",
  ];

  const handleColorChange = (color: string) => {
    dispatch(setCardColor({ cardIndex: activeCardIndex, color }));
  };

  return (
    <div className="w-full xl:w-[7rem] xl:h-full flex lg:flex-col flex-col-reverse py-[0.3125rem] px-[0.625rem] xl:items-start items-center">
      <h4 className="text-[0.75rem] font-semibold leading-[1rem] text-[#616161] text-center">
        Pick a color
      </h4>
      <div className="flex justify-between items-center">
        <Image
          onClick={() => dispatch(openCardFunction())}
          src={"/delivery/wallet/close-circle.svg"}
          alt="close-circle"
          width={24}
          height={24}
          className="w-[1.5rem] h-[1.5rem] cursor-pointer hover:opacity-80 transition-all duration-500 ease-in-out"
        />
        <div className="flex flex-row xl:flex-col gap-4 p-2 w-[14.9rem] xl:w-auto">
          {availableColors.map((color) => (
            <button
              key={color}
              onClick={() => handleColorChange(color)}
              className={`w-8 h-8 rounded-full transition-all duration-300 cursor-pointer hover:scale-110 ${
                cardColors[activeCardIndex] === color
                  ? "ring-2 ring-offset-2 ring-gray-800"
                  : ""
              }`}
              style={{ backgroundColor: color }}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditCard;
