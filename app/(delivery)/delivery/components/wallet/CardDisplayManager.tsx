import React from "react";
import { useAppSelector } from "../../store/hooks";
import EmptyCreditCard from "./EmptyCreditCard";
import OneCreditCard from "./OneCreditCard";
import DoubleCreditCard from "./DoubleCreditCard";
import MultipleCreditCards from "./MultipleCreditCards";

const CardDisplayManager = () => {
  const totalCards = useAppSelector((state) => state.card.totalCards);

  // Conditionally render based on totalCards
  switch (totalCards) {
    case 0:
      return <EmptyCreditCard />;
    case 1:
      return <OneCreditCard />;
    case 2:
      return <DoubleCreditCard />;
    case 3:
      return <MultipleCreditCards />;
    default:
      // If totalCards is greater than 3, still show MultipleCreditCards
      return <MultipleCreditCards />;
  }
};

export default CardDisplayManager;
