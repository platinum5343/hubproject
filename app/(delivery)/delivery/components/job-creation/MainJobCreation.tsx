import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { closeCardOverlay } from "../../store/mapSlice";
import LinkedCardsOverlay from "./PaymentForm/LinkedCardsOverlay";
import JobCreation from "./JobCreation";
import { motion } from "framer-motion";

const MainJobCreation = () => {
  const dispatch = useAppDispatch();
  const showCard = useAppSelector((state) => state.map.showCardOverlay);
  return (
    <>
      <div className="hidden md:flex flex-col px-8 items-center w-[22.5rem] h-full rounded-[1.25rem] bg-[#FFF] overflow-y-auto scrollbar-hide relative shadow-lg">
        <JobCreation />
        {showCard && (
          <LinkedCardsOverlay onClose={() => dispatch(closeCardOverlay())} />
        )}
      </div>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}  
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
          mass: 0.8,
        }}
        className="md:hidden flex flex-col px-8 pt-[1.25rem] items-center absolute z-10 bottom-0 left-0 right-0 bg-white top-[8rem] rounded-t-[2.5rem] "
      >
        <div className="w-8 h-[0.375em] rounded-[0.625rem] bg-[#D3D3D3]"></div>
        <JobCreation />
        {showCard && (
          <LinkedCardsOverlay onClose={() => dispatch(closeCardOverlay())} />
        )}
      </motion.div>
    </>
  );
};

export default MainJobCreation;
