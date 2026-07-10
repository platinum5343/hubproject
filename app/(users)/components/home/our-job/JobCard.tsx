"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cardHover, textHover, imageHover, overlayHover } from "@/app/(users)/animations/OurJobAnimation";

type JobCardProps = {
  image: string;
  title: string;
  description: string;
};

const JobCard = ({ image, title, description }: JobCardProps) => {
  return (
    <motion.div
      variants={cardHover}
      initial="initial"
      whileHover="hover"
      className="flex flex-col rounded-[1rem] bg-[#FDFDFD] overflow-hidden cursor-pointer"
    >
      {/* Image section */}
      <div className="relative w-full h-[16rem] lg:h-[20rem] overflow-hidden rounded-[1rem]">
        <motion.div variants={imageHover} className="relative w-full h-full">
          <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover mt-4 rounded-[1rem]" />
        </motion.div>

        {/* Gradient overlay */}
        <motion.div
          variants={overlayHover}
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={textHover}
        className="flex flex-col gap-2 px-4 py-4"
      >
        <h2 className="unageo text-[1.75rem] lg:text-[2rem] font-semibold leading-tight">
          {title}
        </h2>

        <p className="unageo-regular text-[0.9rem] lg:text-[1rem] leading-relaxed text-[#545454]">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default JobCard;