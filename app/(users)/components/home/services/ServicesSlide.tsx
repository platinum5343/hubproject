"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { imageDepth, textStagger, fadeUp } from "@/app/(users)/animations/ServicesAnimations";

const ServiceSlide = ({ service }: { service: any }) => {
  return (
    <div className="flex flex-col md:flex-row bg-[#FDFDFD] rounded-2xl overflow-hidden h-full">
      <motion.div
        variants={imageDepth}
        initial="hidden"
        animate="show"
        className="md:w-[48%] h-[14rem] md:h-full relative"
      >
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 48vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        variants={textStagger}
        initial="hidden"
        animate="show"
        className="flex flex-col justify-center p-4 md:p-8 gap-3 flex-1"
      >
        <motion.h2
          variants={fadeUp}
          className="unageo-bold text-[1.5rem] md:text-[2.25rem]"
        >
          {service.title}{" "}
          <span className="text-[#F3693B]">{service.highlight}</span>
        </motion.h2>

        <motion.p variants={fadeUp} className="text-[#545454] leading-relaxed">
          {service.description}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ServiceSlide;