"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/app/(users)/animations/HeroAnimations";

const HeroContent = () => {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-col items-center gap-6 lg:gap-8"
    >
      <div className="flex flex-col items-center gap-2 lg:gap-4 md:max-w-[48rem]">
        <h1 className="text-center unageo-bold text-[2rem] md:text-[3rem] lg:text-[3.75rem] leading-tight">
          Deliver anywhere now with Dispatch Hub
        </h1>

        <h3 className="text-center max-w-[35rem] unageo text-[1rem] lg:text-[1.25rem] font-medium leading-relaxed">
          Enjoy fast, reliable, and eco-friendly delivery solutions that keep
          your business moving efficiently.
        </h3>
      </div>

      <div className="py-4 px-10 rounded-full bg-[#FFEEE8]">
        <p className="unageo font-medium text-[1rem] md:text-[1.25rem] text-[#FE581C]">
          Register as a
        </p>
      </div>
    </motion.div>
  );
};

export default HeroContent;
