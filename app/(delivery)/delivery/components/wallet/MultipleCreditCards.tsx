import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setActiveCard } from "../../store/cardSlice";
import CardFunctions from "./CardFunctions";
import CreditCard1 from "./CreditCard1";
import CreditCard2 from "./CreditCard2";
import CreditCard3 from "./CreditCard3";
import EditCard from "./EditCard";

const MultipleCreditCards = () => {
  const dispatch = useAppDispatch();
  const activeCardIndex = useAppSelector((state) => state.card.activeCardIndex);
  const totalCards = useAppSelector((state) => state.card.totalCards);
  const cardFunction = useAppSelector((state) => state.cardFunction.functions);

  // All available cards
  const allCards = [
    { id: 0, component: CreditCard1 },
    { id: 1, component: CreditCard2 },
    { id: 2, component: CreditCard3 },
  ];

  // Only display cards based on totalCards from Redux
  const cards = allCards.slice(0, totalCards);

  const handleCardChange = (index: number) => {
    dispatch(setActiveCard(index));
  };

  return (
    <div className="w-full lg:h-[26rem] xl:h-[24rem] lg:rounded-[1.25rem] lg:bg-white lg:shadow-md flex justify-center items-center lg:p-6">
      <div className="flex flex-col xl:flex-row w-full lg:w-[40rem] lg:h-[18rem] items-center justify-center gap-4 sm:gap-5 md:gap-6 mt-6 sm:mt-8 md:mt-10 lg:mt-0">
        {/* Credit cards */}
        <div className="flex w-full flex-col items-center lg:gap-[1.5rem]">
          <div className="h-[11rem] sm:h-[13rem] md:h-[13.5rem] lg:h-[14.3rem] relative w-full flex items-start justify-center overflow-visible">
            {/* Card Stack Container */}
            <div className="relative flex items-center justify-center w-full h-full pt-2 sm:pt-3 md:pt-4">
              {cards.map((card, index) => {
                const CardComponent = card.component;

                // Calculate position relative to active card
                const position = index - activeCardIndex;

                // Responsive values based on screen size
                // Mobile: smaller offset, Desktop: larger offset
                const offsetX =
                  typeof window !== "undefined" && window.innerWidth < 640
                    ? 30
                    : typeof window !== "undefined" && window.innerWidth < 1024
                    ? 50
                    : 60;

                // Determine stacking properties
                let translateX = 0;
                let zIndex = 0;
                let opacity = 1;
                let filter = "blur(0px)";
                let scale = 1;

                if (position === 0) {
                  // Active card - front and center
                  translateX = 0;
                  zIndex = 30;
                  opacity = 1;
                  filter = "blur(0px)";
                  scale = 1;
                } else if (position < 0) {
                  // Cards that were shown before (slide to left/back)
                  translateX = position * offsetX;
                  zIndex = 30 + position;
                  opacity = 0.9 + position * 0.1;
                  filter = `blur(${Math.abs(position) * 3}px)`;
                  scale = 1 - Math.abs(position) * 0.1;
                } else {
                  // Cards waiting to be shown (stack to the left/back)
                  translateX = -position * offsetX;
                  zIndex = 30 - position;
                  opacity = 0.9 - position * 0.1;
                  filter = `blur(${position * 3}px)`;
                  scale = 1 - position * 0.1;
                }

                return (
                  <div
                    key={card.id}
                    className="absolute transition-all duration-700 ease-in-out"
                    style={{
                      transform: `translateX(${translateX}px) scale(${scale})`,
                      opacity,
                      zIndex,
                      filter,
                      left: "50%",
                      top: "0",
                      marginLeft: "calc(-8.5rem * var(--scale, 1))",
                      transformOrigin: "center center",
                    }}
                  >
                    <CardComponent />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Radio Buttons */}
          <div className="flex gap-2 items-center justify-center">
            {cards.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleCardChange(index)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  index === activeCardIndex
                    ? "bg-gray-800 w-2.5 h-2.5"
                    : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
                }`}
                aria-label={`Select card ${index + 1}`}
              />
            ))}
          </div>
        </div>
        {cardFunction ? <CardFunctions /> : <EditCard />}
      </div>
    </div>
  );
};

export default MultipleCreditCards;
