"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { service } from "@/app/(users)/utils/service";
import { slideVariants } from "@/app/(users)/animations/ServicesAnimations";
import ServiceSlide from "./ServicesSlide";
import ServicesDots from "./ServicesDots";

const ServicesCarousel = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % service.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  return (
    <div className="w-full max-w-[90rem] flex flex-col gap-6">
      <div className="relative overflow-hidden h-[26rem] md:h-[28rem]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <ServiceSlide service={service[index]} />
          </motion.div>
        </AnimatePresence>
      </div>

      <ServicesDots count={service.length} active={index} onChange={goTo} />
    </div>
  );
};

export default ServicesCarousel;
