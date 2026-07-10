import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "../../store/hooks";
import MapComponent from "../MapComponent";
import AnimatedWrapper from "../shared/AnimatedWrapper";
import MainJobCreation from "../job-creation/MainJobCreation";
import Rating from "./features/Rating";

const MapBody = () => {
  const courier = useAppSelector((state) => state.map.findCourier);
  const { rating } = useAppSelector((state) => state.tracking);
  return (
    <div className="flex w-full h-screen md:h-[80vh] md:gap-10 items-start relative">
      {/* Animated Map Container */}
      <motion.div
        layout
        initial={false}
        animate={{
          width: courier ? "auto" : "100%",
          flex: courier ? 1 : undefined,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8,
        }}
        className="relative h-full rounded-xl overflow-hidden"
      >
        <MapComponent />
      </motion.div>

      {/* Animated job creation - Desktop version */}
      {courier && (
        <div className="hidden md:block h-full">
          <AnimatedWrapper show={courier} type="desktop">
            <MainJobCreation />
          </AnimatedWrapper>
        </div>
      )}

      {/* Animated job creation - Mobile version */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          {courier && <MainJobCreation key="job-creation-mobile" />}
        </AnimatePresence>
      </div>

      <AnimatePresence>{rating && <Rating />}</AnimatePresence>
    </div>
  );
};

export default MapBody;
