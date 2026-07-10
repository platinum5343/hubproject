import { motion } from "framer-motion";

const PaymentSuccess = () => {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-12 gap-4"
    >
      {/* Success Icon */}
      <div className="relative w-32 h-32">
        {/* Background circle (light green) */}
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#C8E6C9"
            strokeWidth="8"
          />
        </svg>

        {/* Green circle with checkmark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-[#4CAF50] rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
      </div>

      <p className="text-[1rem] font-medium text-[#4CAF50] leading-5">
        Success
      </p>
    </motion.div>
  );
}

export default PaymentSuccess