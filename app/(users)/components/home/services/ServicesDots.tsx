"use client";

import { motion } from "framer-motion";

const ServicesDots = ({
  count,
  active,
  onChange,
}: {
  count: number;
  active: number;
  onChange: (i: number) => void;
}) => {
  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <button key={i} onClick={() => onChange(i)}>
          <motion.div
            animate={{
              width: active === i ? 32 : 12,
              backgroundColor: active === i ? "#F3693B" : "#D1D5DB",
            }}
            transition={{ duration: 0.3 }}
            className="h-3 rounded-full"
          />
        </button>
      ))}
    </div>
  );
};

export default ServicesDots;
