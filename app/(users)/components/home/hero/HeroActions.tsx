"use client";

import { motion } from "framer-motion";
import Cycle from "../../svg/Cycle";
import Delivery from "../../svg/Delivery";
import { floatCard } from "@/app/(users)/animations/HeroAnimations"; 
import { useAppDispatch } from "@/app/(users)/store/hooks"; 
import { openModal, setActiveSignupType } from "@/app/(users)/store/authSlice";

const HeroActions = () => {
  const dispatch = useAppDispatch();

  const handleSignup = (type: "delivery" | "courier") => {
    dispatch(setActiveSignupType(type));
    dispatch(openModal("signup"));
  };

  return (
    <motion.div
      variants={floatCard}
      className="md:w-[54rem] w-full flex md:flex-row flex-col p-4 md:p-6 gap-4 bg-white rounded-xl hero-box z-10"
    >
      {[
        { label: "Delivery", icon: <Delivery />, type: "delivery" },
        { label: "Courier", icon: <Cycle />, type: "courier" },
      ].map((item, index) => (
        <div key={item.label} className="w-full">
          {/* Clickable Item */}
          <div
            onClick={() => handleSignup(item.type as any)}
            className="flex w-full justify-center items-center cursor-pointer group"
          >
            <div className="flex flex-col items-center gap-1 py-[0.92rem] md:py-[2.5rem] px-[5.2rem] md:px-[8.94rem]">
              {item.icon}

              <p className="unageo text-[1.25rem] font-semibold text-[#808080] group-hover:text-[#FE581C] transition-colors">
                {item.label}
              </p>
            </div>
          </div>

          {/* ✅ Separator Line (Mobile Only, Between Items Only) */}
          {index === 0 && (
            <div className="block md:hidden w-full border-t border-dashed border-[#D3D3D3]" />
          )}
        </div>
      ))}
    </motion.div>
  );
};

export default HeroActions;
