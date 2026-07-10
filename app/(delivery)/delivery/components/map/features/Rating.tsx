"use client";

import React, { useState } from "react";
import { easeIn, easeOut, motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import PrimaryButton from "../../shared/PrimaryButton";
import Home from "../../icons/rating/Home";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../../store/hooks";
import { setViewRating } from "../../../store/trackingSlice";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeOut },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 40,
    transition: { duration: 0.25, ease: easeIn },
  },
};

const Rating = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating before proceeding");
      return;
    }

    dispatch(setViewRating(false));
    router.push("/delivery");
  };

  return (
    <motion.div
      className="absolute inset-0 bg-black/40 flex items-center justify-center z-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-[18.5rem] md:w-[32.8rem] h-[13.2rem] md:h-[21.375rem] p-[0.625rem]
                   bg-white flex flex-col justify-center items-center gap-6 rounded-[1.25rem]"
      >
        <div className="flex flex-col items-center gap-6 md:gap-2">
          <h1 className="text-[#616161] text-center text-[1.25rem] font-semibold">
            Rate the Courier
          </h1>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className={`cursor-pointer transition-all duration-200 ${
                  star <= (hoverRating || rating)
                    ? "text-[#FE581C] scale-110"
                    : "text-[#808080]"
                }`}
              />
            ))}
          </div>
        </div>

        <PrimaryButton
          label="Back to Home"
          onClick={handleSubmit}
          disabled={rating === 0}
          icon={
            <div className="mt-1">
              <Home />
            </div>
          }
        />
      </motion.div>
    </motion.div>
  );
};

export default Rating;
