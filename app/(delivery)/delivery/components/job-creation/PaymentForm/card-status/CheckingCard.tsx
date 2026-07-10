import { motion } from "framer-motion";
import PaymentLoader from "../../../shared/Loader";

const CheckingCard = () => {
  return (
    <motion.div
      key="checking"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <PaymentLoader message="Checking Card" size="lg" />
    </motion.div>
  );
}

export default CheckingCard