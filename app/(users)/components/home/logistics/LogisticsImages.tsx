"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  fadeRight,
  imagePop,
} from "@/app/(users)/animations/LogisticsAnimation";

const LogisticsImages = () => {
  return (
    <motion.div
      variants={fadeRight}
      className="w-full h-[18rem] md:h-[33.6875rem] grid grid-cols-2 grid-rows-2 gap-1"
    >
      {/* Top-left */}
      <motion.div variants={imagePop} className="col-start-1 row-start-1">
        <Image
          src="/home/log1.png"
          alt="Logistics visual 1"
          width={307}
          height={264}
          className="w-full h-full object-cover rounded-tl-2xl"
        />
      </motion.div>

      {/* Right (spans two rows) */}
      <motion.div
        variants={imagePop}
        className="col-start-2 row-start-1 row-span-2"
      >
        <Image
          src="/home/log3.png"
          alt="Logistics visual 2"
          width={307}
          height={264}
          className="w-full h-full object-cover rounded-r-2xl"
        />
      </motion.div>

      {/* Bottom-left */}
      <motion.div variants={imagePop} className="col-start-1 row-start-2">
        <Image
          src="/home/log2.png"
          alt="Logistics visual 3"
          width={307}
          height={264}
          className="w-full h-full object-cover rounded-bl-2xl"
        />
      </motion.div>
    </motion.div>
  );
};

export default LogisticsImages;
