"use client";

import { Parallax } from "react-parallax";
import { motion } from "framer-motion";
import HeroContent from "./HeroContent";
import HeroActions from "./HeroActions";
import { containerVariants } from "@/app/(users)/animations/HeroAnimations";

const Hero = () => {
  return (
    <Parallax
      bgImage="/home/hero-bg.png"
      strength={400}
      bgImageStyle={{
        objectFit: "cover",
        objectPosition: "center",
      }}
      className="relative"
    >
      <section className="py-[8rem] lg:py-[7.5rem] px-6 lg:px-[5rem]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-12"
        >
          <HeroContent />
          <HeroActions />
        </motion.div>
      </section>
    </Parallax>
  );
};

export default Hero;
