import { BsFillSendFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { motion } from "framer-motion";
import ReportSvg from "../icons/ReportSvg";

const PaymentDetailPanel = ({
  item,
  onClose,
}: {
  item: any;
  onClose: () => void;
}) => {
  return (
    <>
      {/* Desktop Animation - Slide from right */}
      <motion.div
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          opacity: { duration: 0.2 },
        }}
        className="hidden lg:block fixed lg:relative inset-0 lg:inset-auto z-50 md:z-auto bg-white lg:max-w-[23rem] md:rounded-[1.25rem] overflow-y-auto lg:mt-[7rem] p-6 shadow-xl"
      >
        <PanelContent item={item} onClose={onClose} />
      </motion.div>

      {/* Mobile Animation - Slide from bottom with backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="lg:hidden fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[1.5rem] p-6 max-h-[90vh] overflow-y-auto"
        >
          <PanelContent item={item} onClose={onClose} />
        </motion.div>
      </motion.div>
    </>
  );
};

// Extracted panel content to avoid duplication
const PanelContent = ({
  item,
  onClose,
}: {
  item: any;
  onClose: () => void;
}) => {
  return (
    <>
      {/* Panel Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="flex gap-3 items-center"
      >
        <button onClick={onClose}>
          <IoCloseCircle className="h-6 w-6 text-[#D3D3D3] hover:text-[#FE581C] transition-colors" />
        </button>
        <h3 className="unageo-regular text-[1.25rem] font-medium leading-7">
          Receipt Details
        </h3>
      </motion.div>

      {/* Panel Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="flex flex-col gap-6 mt-4"
      >
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="flex flex-col py-[0.25rem] px-[0.125rem] gap-1 unageo-regular border-b border-[#F0F0F0]"
        >
          <h3 className="text-[1rem] font-medium leading-5">Payment</h3>
          <h3 className="text-[0.875rem] leading-[1.125rem]">₦1000</h3>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="flex flex-col py-[0.25rem] px-[0.125rem] gap-1 unageo-regular border-b border-[#F0F0F0]"
        >
          <h3 className="text-[1rem] font-medium leading-5">Date</h3>
          <h3 className="text-[0.875rem] leading-[1.125rem]">{item.date}</h3>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.3 }}
          className="flex flex-col py-[0.25rem] px-[0.125rem] gap-1 unageo-regular border-b border-[#F0F0F0]"
        >
          <h3 className="text-[1rem] font-medium leading-5">Time</h3>
          <h3 className="text-[0.875rem] leading-[1.125rem]">{item.time}</h3>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="flex flex-col py-[0.25rem] px-[0.125rem] gap-1 unageo-regular border-b border-[#F0F0F0]"
        >
          <h3 className="text-[1rem] font-medium leading-5">Description</h3>
          <h3 className="text-[0.875rem] leading-[1.125rem]">
            {item.description}
          </h3>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.3 }}
          className="flex flex-col py-[0.25rem] px-[0.125rem] gap-1 unageo-regular border-b border-[#F0F0F0]"
        >
          <h3 className="text-[1rem] font-medium leading-5">
            Transaction Reference
          </h3>
          <h3 className="text-[0.875rem] leading-[1.125rem]">
            234567919478295783920475
          </h3>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="flex items-center gap-[0.8125rem] mt-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex py-4 px-8 justify-center text-[#FE581C] rounded-4xl bg-[#FFEEE8] items-center gap-2 hover:bg-[#FFE0D6] transition-colors"
        >
          <h3 className="unageo-regular text-[1rem] leading-6">Share</h3>
          <BsFillSendFill className="h-4 w-4" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex py-4 px-8 justify-center text-[#FFF] rounded-4xl bg-[#C62828] items-center gap-2 hover:bg-[#B71C1C] transition-colors"
        >
          <h3 className="unageo-regular text-[1rem] leading-6">Report</h3>
          <ReportSvg />
        </motion.button>
      </motion.div>
    </>
  );
};

export default PaymentDetailPanel;