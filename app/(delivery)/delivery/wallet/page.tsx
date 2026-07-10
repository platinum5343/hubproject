"use client";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { openSidebar } from "../store/sidebarSlice";
import { useEffect } from "react";
import { closeExpenses, openExpenses } from "../store/walletSlice";
import Expenses from "../components/wallet/Expenses";
import PaymentHistorySection from "../components/wallet/PaymentHistorySection";
import OneCreditCard from "../components/wallet/OneCreditCard";
import EmptyCreditCard from "../components/wallet/EmptyCreditCard";
import MultipleCreditCards from "../components/wallet/MultipleCreditCards";
import DoubleCreditCard from "../components/wallet/DoubleCreditCard";

const Wallet = () => {
  const dispatch = useAppDispatch();
  const isExpanded = useAppSelector((state) => state.sidebar.expanded);
  const expenses = useAppSelector((state) => state.wallet.expenseState);

  // Use totalCards from card slice instead of wallet.cardNumber
  const totalCards = useAppSelector((state) => state.card.totalCards);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        dispatch(openExpenses());
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  // Render appropriate card component based on totalCards
  const renderCardComponent = () => {
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
        // If more than 3 cards, show MultipleCreditCards
        return <MultipleCreditCards />;
    }
  };

  return (
    <div
      className={`md:bg-[#FAFAFA] flex flex-col md:pr-8 items-center w-full transition-all duration-500 ease-in-out ${
        isExpanded ? "md:pl-[16rem]" : "md:pl-20"
      }`}
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:gap-[3.31rem] unageo-regular w-full p-4 sm:p-6 md:p-8">
        <div className="flex w-full lg:w-[65%] xl:w-[57%] flex-col items-start gap-3 sm:gap-4">
          {/* header */}
          <div className="flex w-full p-1 items-center lg:items-start justify-between">
            <div className="flex items-center gap-2">
              <Image
                onClick={() => dispatch(openSidebar())}
                src={"/delivery/avatar.svg"}
                alt="avatar"
                width={32}
                height={32}
                className="w-[2rem] h-[2rem] md:hidden cursor-pointer"
              />
              <h2 className="text-xl sm:text-2xl md:text-[1.75rem] lg:text-[2rem] font-semibold leading-tight sm:leading-[2rem] md:leading-[2.25rem] lg:leading-[2.5rem]">
                My Cards
              </h2>
            </div>
            <div
              onClick={() => dispatch(openExpenses())}
              className="flex lg:hidden p-[0.625rem] items-center justify-center rounded-[1rem] bg-[#F4F4F4]"
            >
              <Image
                src={"/delivery/wallet/chart.png"}
                alt="chart"
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </div>
          </div>

          {/* Dynamic Card Rendering */}
          {renderCardComponent()}
        </div>
        {expenses && <Expenses />}
      </div>
      <PaymentHistorySection />
    </div>
  );
};

export default Wallet;
