"use client";
import { PaymentHistoryType } from "../utils/payment-history";
export const dynamic = "force-dynamic";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { IoCloseCircle } from "react-icons/io5";
import PaymentDetailPanel from "../components/payment-details/PaymentDetailPanel";
import { openPaymentDetail, closePaymentDetail } from "../store/paymentHistorySlice";
import { AnimatePresence, motion } from "framer-motion";
import SentIcon from "../components/icons/SentIcon";
import ReceivedIcon from "../components/icons/ReceivedIcon";
import Link from "next/link";
import AuthGuard from "../components/AuthGuard";

// Alias matches PaymentHistoryType so openPaymentDetail() types align.
type PaymentItem = PaymentHistoryType & {
  amount?: string;
  transactionRef?: string;
  paymentMethod?: string;
};

// ── Empty state ───────────────────────────────────────────────────────────────
const EmptyPaymentHistory = () => (
  <div className="flex flex-col items-center justify-center w-full py-24 gap-4">
    <div className="w-16 h-16 bg-[#F4F4F4] rounded-full flex items-center justify-center">
      <Image src="/icons/card.png" alt="empty" width={28} height={28} className="w-7 h-7 opacity-30" />
    </div>
    <div className="flex flex-col items-center gap-1 text-center">
      <h3 className="unageo-regular text-[1rem] font-semibold text-[#333]">No transactions yet</h3>
      <p className="unageo-regular text-[0.875rem] text-[#A5A5A5] max-w-[18rem]">
        Send your first delivery to start building your payment history.
      </p>
    </div>
  </div>
);

const PaymentHistory = () => {
  const dispatch = useAppDispatch();
  const isExpanded = useAppSelector((state) => state.sidebar.expanded);
  const selectedItem = useAppSelector((state) => state.paymentHistory.selectedPayment);
  const [items, setItems] = useState<PaymentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("/api/payment-history");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setItems(data);
        }
      } catch {
        // API not connected yet
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <AuthGuard>
      <div
        className={`md:bg-[#FAFAFA] inline-flex md:pr-8 items-start w-full transition-all duration-500 min-h-screen ease-in-out ${
          isExpanded ? "md:pl-[16rem]" : "md:pl-20"
        }`}
      >
        <motion.div
          animate={{ width: selectedItem ? "calc(100% - 450px)" : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex flex-col items-start gap-4 mx-8 mt-[3.5rem] mb-[0.81rem] w-full lg:w-auto"
        >
          {/* Header */}
          <div className="w-full flex md:justify-between items-center gap-2">
            <Image
              src="/delivery/icons/arrow-square-left.png"
              alt="back"
              className="w-6 h-6 md:hidden"
              width={24}
              height={24}
            />
            <h2 className="unageo-regular text-[1.25rem] md:text-[2rem] font-semibold leading-8 md:leading-10">
              Payment History
            </h2>
            {/* Fixed: link now points to /dashboard/wallet */}
            <Link href="/dashboard/wallet" className="md:flex hidden px-2 items-center gap-1 text-[#FE581C]">
              <h3 className="unageo-regular text-[1rem] font-semibold leading-[1.25rem]">Close</h3>
              <IoCloseCircle className="h-[1.25rem] w-[1.25rem]" />
            </Link>
          </div>

          {/* Body */}
          <div className="flex flex-col items-start md:items-center gap-4 md:pl-[2.56rem] md:pr-[0.94rem] md:pt-[0.56rem] md:bg-white md:rounded-[1.25rem] w-full">
            {loading ? (
              <div className="flex items-center justify-center w-full py-16 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-2 h-2 bg-[#FE581C] rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            ) : items.length === 0 ? (
              <EmptyPaymentHistory />
            ) : (
              items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  onClick={() => dispatch(openPaymentDetail(item))}
                  whileHover={{ scale: 1.01, backgroundColor: "#FAFAFA" }}
                  whileTap={{ scale: 0.99 }}
                  className="flex flex-col lg:flex-row w-full p-[0.625rem] justify-between items-start lg:items-end gap-1 rounded-[1.25rem] border-b border-b-[#F0F0F0] cursor-pointer transition-colors"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1">
                      {item.status === "Sent Package" ? <SentIcon /> : <ReceivedIcon />}
                      <h3 className="unageo-regular text-[0.875rem] md:text-[1rem] font-medium leading-[1.25rem] text-[#616161]">
                        {item.status}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Image src="/icons/card.png" alt="icon" width={14} height={14} />
                      <h3 className="unageo-regular text-[0.75rem] md:text-[0.875rem] leading-[1rem] text-[#616161]">
                        {item.description}
                      </h3>
                    </div>
                  </div>
                  <div className="flex gap-1 unageo-regular text-[0.75rem] font-medium leading-5 text-[#616161]">
                    <p>{item.date}</p>
                    <p>{item.time}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {selectedItem && (
            <div className="md:ml-4">
              <PaymentDetailPanel item={selectedItem} onClose={() => dispatch(closePaymentDetail())} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </AuthGuard>
  );
};

export default PaymentHistory;