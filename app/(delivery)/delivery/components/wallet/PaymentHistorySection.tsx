import Image from "next/image";
import { motion } from "framer-motion";
import { paymentHistory } from "../../utils/payment-history";
import SentIcon from "../icons/SentIcon";
import ReceivedIcon from "../icons/ReceivedIcon";
import Link from "next/link";
import { useAppSelector } from "../../store/hooks";
import EmptyPaymentHistory from "./EmptyPaymentHistory";
import PaymentHistory from "./PaymentHistory";

const PaymentHistorySection = () => {
  const payments = useAppSelector((state) => state.wallet.numberOfPayments);
  return (
    <div className="flex flex-col w-full items-center gap-4 unageo-regular p-4 sm:p-6 md:p-8">
      <div className="flex justify-between items-center w-full">
        <h3
          className={`text-[1.125rem] md:text-[1.25rem] font-semibold leading-[1.5rem] md:leading-[1.75rem] ${
            payments > 0 ? "" : "hidden lg:block"
          }`}
        >
          Payment History
        </h3>
        {payments > 0 && (
          <Link
            href={"/delivery/payment-history"}
            className="flex items-center gap-[0.125rem] md:gap-1 bg-[#F8F8F8] lg:bg-[#F8F8F8]/0 rounded-[1.375rem] lg:rounded-none"
          >
            <h4 className="text-[#FE581C] text-[0.875rem] md:text-[1rem] font-medium md:font-semibold leading-[1.125rem] md:leading-[1.25rem]">
              View all
            </h4>
            <Image
              src={"/delivery/wallet/arrow-right.svg"}
              alt="icon"
              width={20}
              height={20}
            />
          </Link>
        )}
      </div>
      <div
        className={`flex flex-col gap-4 md:pl-[2.56rem] md:pr-[0.94rem] md:pt-[0.56rem]  w-full ${
          payments > 0
            ? "md:bg-white items-start md:items-center md:rounded-[1.25rem]"
            : "md:bg-white bg-[#F8F8F8] items-center rounded-[1.25rem]"
        }`}
      >
        {payments > 0 ? (
          <PaymentHistory />
        ) : (
         <EmptyPaymentHistory />
        )}
      </div>
    </div>
  );
};

export default PaymentHistorySection;
