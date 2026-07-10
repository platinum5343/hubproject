import Image from "next/image";
import ReceivedIcon from "../icons/ReceivedIcon";
import SentIcon from "../icons/SentIcon";
import { motion } from "framer-motion";
import { paymentHistory } from "../../utils/payment-history";

const PaymentHistory = () => {
  return (
    <>
      {paymentHistory.slice(0, 5).map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          whileHover={{ scale: 1.01, backgroundColor: "#FAFAFA" }}
          whileTap={{ scale: 0.99 }}
          className="flex flex-col lg:flex-row w-full p-[0.625rem] justify-between items-start lg:items-end gap-1 rounded-[1.25rem] border-b border-b-[#F0F0F0] cursor-pointer transition-colors"
        >
          {/* Status and Description */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              {item.status === "Sent Package" ? <SentIcon /> : <ReceivedIcon />}
              <h3 className="unageo-regular text-[0.875rem] md:text-[1rem] font-medium leading-[1.25rem] text-[#616161]">
                {item.status}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src={"/icons/card.png"}
                alt="icon"
                width={14}
                height={14}
              />
              <h3 className="unageo-regular text-[0.75rem] md:text-[0.875rem] leading-[1rem] md:leading-[1.125rem] text-[#616161]">
                {item.description}
              </h3>
            </div>
          </div>

          {/* Date and Time */}
          <div className="flex gap-1 unageo-regular text-[0.75rem] font-normal md:font-medium leading-5 lg:items-end text-[#616161]">
            <p>{item.date}</p>
            <p>{item.time}</p>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default PaymentHistory;
