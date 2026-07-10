"use client";

import { motion } from "framer-motion";
import LogisticsContent from "./LogisticsContent";
import LogisticsImages from "./LogisticsImages";
import { sectionContainer } from "@/app/(users)/animations/LogisticsAnimation";

const Logistics = () => {
  return (
    <section className="py-[3.5rem] lg:py-[10.25rem] px-8 lg:px-[5rem]">
      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col md:flex-row items-center gap-10 lg:gap-[6rem]"
      >
        <LogisticsContent />
        <LogisticsImages />
      </motion.div>
    </section>
  );
};

export default Logistics;
