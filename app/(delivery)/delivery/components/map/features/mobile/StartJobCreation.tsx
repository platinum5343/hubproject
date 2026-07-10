"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch } from "../../../../store/hooks";
import { startJobCreation } from "../../../../store/mapSlice";
import PrimaryButton from "../../../shared/PrimaryButton";

// Same greeting pool as DesktopHeader — reuse for consistency
const GREETINGS = [
  (name: string) => `Welcome back, ${name} 👋`,
  (name: string) => `Good to see you, ${name}!`,
  (name: string) => `Hey ${name}, ready to ship?`,
  (name: string) => `Hello, ${name}! Let's get moving.`,
  (name: string) => `What's on the move today, ${name}?`,
  (name: string) => `${name}, your deliveries await!`,
  (name: string) => `Great day for deliveries, ${name}!`,
  (name: string) => `On your marks, ${name} 🚀`,
  (name: string) => `Let's do this, ${name}!`,
  (name: string) => `Welcome, ${name} — what are we sending?`,
];

const SUB_MESSAGES = [
  "What can we do for you today?",
  "Where are we delivering today?",
  "Your next delivery is just a tap away.",
  "Fast, reliable, always on time.",
  "Ready when you are.",
  "Let's make someone's day.",
  "Need a pickup or drop-off?",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const StartJobCreation = () => {
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState<string>("there");

  const greetingFn = useMemo(() => pickRandom(GREETINGS), []);
  const subMessage = useMemo(() => pickRandom(SUB_MESSAGES), []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("dispatch_hub_user");
      if (raw) {
        const user = JSON.parse(raw);
        const firstName = (user.name || user.fullName || "there")
          .split(" ")[0];
        setUserName(firstName);
      }
    } catch {
      // fallback to "there"
    }
  }, []);

  return (
    <div className="flex flex-col w-full items-start gap-8">
      <div className="flex justify-between w-full items-center">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-start gap-1"
        >
          <h3 className="text-[1.125rem] font-medium leading-[1.5rem]">
            {greetingFn(userName)}
          </h3>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.35 }}
            className="text-[1rem] leading-[1.25rem] text-[#616161]"
          >
            {subMessage}
          </motion.h3>
        </motion.div>

        {/* Search icon */}
        <div className="flex py-1 px-[0.625rem] items-center justify-center rounded-[0.75rem] bg-[#F4F4F4]">
          <div className="flex w-[2.8rem] h-[2.8rem] py-1 px-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M7 0C3.14585 0 0 3.14585 0 7C0 10.8541 3.14585 14 7 14C8.748 14 10.345 13.348 11.5742 12.2812L12 12.707V14L18 20L20 18L14 12H12.707L12.2812 11.5742C13.348 10.345 14 8.748 14 7C14 3.14585 10.8541 0 7 0ZM7 2C9.77327 2 12 4.22673 12 7C12 9.77327 9.77327 12 7 12C4.22673 12 2 9.77327 2 7C2 4.22673 4.22673 2 7 2Z"
                fill="#FE581C"
              />
            </svg>
          </div>
        </div>
      </div>

      <PrimaryButton
        label="Find Courier"
        onClick={() => dispatch(startJobCreation())}
        fullWidth
      />
    </div>
  );
};

export default StartJobCreation;