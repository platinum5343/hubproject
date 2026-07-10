"use client";
import { useAppDispatch, useAppSelector } from "@/app/(users)/store/hooks";
import { toggleCustomers } from "@/app/(users)/store/logisticSlice";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";

const Customers = () => {
  const logistics = useAppSelector((state) => state.logistics);
  const dispatch = useAppDispatch();

  // handle customers & business toggle
  const handleCustomers = () => {
    dispatch(toggleCustomers());
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
      onClick={handleCustomers}
      className="flex flex-col px-4 py-5 items-start border-b border-b-[#EDEDED] w-full md:w-auto gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors duration-200 text-[#616161]"
    >
      <div className="flex items-center justify-between gap-4 w-full md:w-auto">
        <p className="text-[1rem] lg:text-[1.125rem] lg:font-medium font-semibold unageo leading-[1.5rem] lg:leading-[1.75rem]">
          For Customers & Businesses
        </p>

        <motion.div
          variants={arrowVariants}
          animate={logistics.customers ? "down" : "up"}
          className="flex-shrink-0"
        >
          <IoChevronDown className="w-6 h-6" />
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {logistics.customers && (
          <motion.div
            variants={paragraphVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden w-full"
          >
            <motion.p
              className="text-[1.125rem] font-normal leading-[1.75rem] unageo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              Partner with DispatchHub to reach more customers, streamline
              requests, and manage your riders with ease.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Customers;
