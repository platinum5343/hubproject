import { motion } from "framer-motion";
import PrimaryButton from "../../../shared/PrimaryButton";

interface PaymentFailedProps {
  handleRetry: () => void;
}

const PaymentFailed = ({ handleRetry }: PaymentFailedProps) => {
  return (
    <motion.div
      key="failed"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-12 gap-4"
    >
      {/* Failure Icon */}
      <div className="relative w-32 h-32">
        {/* Background circle (light red) */}
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
            stroke="#FFCDD2"
            strokeWidth="8"
          />
        </svg>

        {/* Red circle with X */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-[#F44336] rounded-full flex items-center justify-center">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-[1rem] font-medium text-[#F44336] leading-5">
          Insufficient Funds
        </p>
        <p className="text-[0.875rem] text-[#616161] text-center leading-[1.125rem]">
          Please fund card or try a different card
        </p>
      </div>
      {/* Retry button */}
      <div className="mt-16 w-full">
        <PrimaryButton onClick={handleRetry} label="Try Again" fullWidth />
      </div>
    </motion.div>
  );
};

export default PaymentFailed;
