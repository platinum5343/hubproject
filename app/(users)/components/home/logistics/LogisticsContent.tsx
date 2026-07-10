"use client";

import { motion } from "framer-motion";
import Customers from "./Customers";
import DispatchRiders from "./DispatchRiders";
import LogisticsCompanies from "./LogisticsCompanies";
import { fadeLeft } from "@/app/(users)/animations/LogisticsAnimation";

const LogisticsContent = () => {
  return (
    <motion.div variants={fadeLeft} className="flex flex-col gap-6 max-w-xl">
      <div className="flex flex-col gap-3">
        <h1 className="unageo-bold text-[2rem] md:text-[2.75rem] lg:text-[3.75rem] leading-tight">
          Smart Logistics, Made Simple
        </h1>

        <p className="unageo text-[1rem] md:text-[1.25rem] leading-relaxed text-[#616161]">
          Dispatch Hub is a modern delivery platform that connects individuals,
          small businesses, and e-commerce brands with fast, reliable, and
          affordable dispatch services. Whether you&apos;re sending a single
          package or managing hundreds of deliveries each week, Dispatch Hub is
          built to simplify your logistics—saving you time, money, and stress.
        </p>
      </div>

      <div className="flex flex-col gap-1 max-w-[33rem]">
        <Customers />
        <DispatchRiders />
        <LogisticsCompanies />
      </div>
    </motion.div>
  );
};

export default LogisticsContent;
