"use client";

import { toggleDispatchHub } from "@/app/(users)/store/faqSlice";
import { useAppDispatch, useAppSelector } from "@/app/(users)/store/hooks";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { AiFillPlusCircle } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";

const DispatchHub = () => {
  const faq = useAppSelector((state) => state.faq);
  const dispatch = useAppDispatch();

  const handleDispatchHub = () => {
    dispatch(toggleDispatchHub());
  };

  // Animation variants for the paragraph
  const paragraphVariants: Variants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
        opacity: { duration: 0.2 },
        height: { duration: 0.3 },
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0.0, 0.2, 1],
        opacity: { duration: 0.3, delay: 0.1 },
        height: { duration: 0.3 },
      },
    },
  };

  // Animation variants for the arrow icon
  const arrowVariants: Variants = {
    up: {
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
    down: {
      rotate: 180,
      transition: {
        duration: 0.3,
        ease: [0.4, 0.0, 0.2, 1],
      },
    },
  };
  return (
    <div
      onClick={handleDispatchHub}
      className="flex flex-col py-[0.8rem] md:py-8 px-[1rem] md:px-10 items-start gap-2 md:gap-4 border-b border-b-[#EDEDED] w-full cursor-pointer hover:bg-gray-50/50 transition-colors duration-200"
    >
      <div className="flex items-center justify-between w-full">
        <h3 className="unageo-regular font-medium text-[1.25rem] md:text-[1.5rem] leading-[2rem] flex-1 w-full">
          What is Dispatch Hub?
        </h3>
        <motion.div
          variants={arrowVariants}
          animate={faq.dispatchHub ? "up" : "down"}
          className="flex-shrink-0"
        >
          {faq.dispatchHub ? (
            <IoIosCloseCircle className="w-6 h-6" />
          ) : (
            <AiFillPlusCircle className="w-6 h-6 text-[#808080]" />
          )}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {faq.dispatchHub && (
          <motion.div
            variants={paragraphVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden w-full"
          >
            <motion.p
              className="text-[1.125rem] md:text-[1rem] leading-[1.75rem] unageo-regular"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              Dispatch Hub isa logistics and delivery platform that connects
              individuals and businesses with reliable couriers for fast,
              secure, and affordable deliveries accross Nigeria.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DispatchHub;
