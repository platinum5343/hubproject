"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, textStagger } from "@/app/(users)/animations/ServicesAnimations";

const ServicesHeader = () => {
  return (
    <motion.div
      variants={textStagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex flex-col items-start md:items-center gap-8 max-w-[55.75rem]"
    >
      <motion.div
        variants={fadeUp}
        className="flex flex-col gap-2 md:text-center"
      >
        <h1 className="unageo-bold text-[2rem] md:text-[3rem] lg:text-[3.75rem] leading-tight">
          How Our Services Help
        </h1>
        <p className="unageo-regular text-[1.125rem] md:text-[1.5rem] text-[#545454]">
          Our local dispatch services are designed to meet the unique needs of
          businesses and individuals across Nigeria with efficiency and
          professionalism.
        </p>
      </motion.div>

      <motion.div variants={fadeUp}>
        <Link
          href=""
          className="py-3 md:py-4 px-6 md:px-8 w-full md:w-[13.5rem] rounded-full button text-center font-medium"
        >
          Get Started
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ServicesHeader;
