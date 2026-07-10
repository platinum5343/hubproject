"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Dynamic greeting pool ────────────────────────────────────────────────────
// A new message is picked at random on every full page load.
// The array is long enough that repeats feel rare.
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

// Pick once per mount — stays stable on re-renders, changes on page reload
function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const DesktopHeader = () => {
  const [userName, setUserName] = useState<string>("there");
  const [visible, setVisible] = useState(false);

  // Pick greeting + sub message once on mount
  const greetingFn = useMemo(() => pickRandom(GREETINGS), []);
  const subMessage = useMemo(() => pickRandom(SUB_MESSAGES), []);

  useEffect(() => {
    // Read the persisted user from localStorage (set by loginSuccess action)
    try {
      const raw = localStorage.getItem("dispatch_hub_user");
      if (raw) {
        const user = JSON.parse(raw);
        // Use first name only so the greeting doesn't overflow
        const firstName = (user.name || user.fullName || "there")
          .split(" ")[0];
        setUserName(firstName);
      }
    } catch {
      // localStorage unavailable or malformed — "there" fallback is fine
    }
    // Slight delay before animating in so the map loads first
    const t = setTimeout(() => setVisible(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="hidden md:flex w-full py-4 justify-between items-center">
      {/* ── Greeting ── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="greeting"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex flex-col items-start gap-1 unageo-regular"
          >
            <h1 className="text-[2rem] font-medium leading-[2.5rem]">
              {greetingFn(userName)}
            </h1>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-[1.125rem] leading-[1.5rem] text-[#616161]"
            >
              {subMessage}
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Icons ── */}
      <div className="flex p-2 items-center gap-6">
        <Image
          src={"/delivery/icons/notification.svg"}
          alt="notification"
          width={36}
          height={36}
          className="h-[2.25rem] w-[2.25rem]"
        />
        <Image
          src={"/delivery/icons/profile.png"}
          alt="profile"
          width={52}
          height={52}
          className="h-[3.25rem] w-[3.25rem] rounded-full object-cover"
          priority
          loading="eager"
        />
      </div>
    </div>
  );
};

export default DesktopHeader;