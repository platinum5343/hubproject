import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { useAppSelector } from '../../store/hooks';

const EmptyPaymentHistory = () => {
  const payments = useAppSelector((state) => state.wallet.numberOfPayments)
  return (
    <>
      <div className="flex flex-col w-full items-center gap-4 p-4 sm:p-6 md:p-8 h-[27rem]">
        <div className="lg:hidden flex justify-between items-center w-full">
          <h3 className="text-[1.125rem] md:text-[1.25rem] font-semibold leading-[1.5rem] md:leading-[1.75rem]">
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
        <div className="flex flex-col justify-center items-center gap-2 w-full h-full text-[#808080]">
          <Image
            src={"/delivery/wallet/receipt.svg"}
            alt="receipt"
            width={96}
            height={96}
            className="w-12 lg:w-24 h-12 lg:h-24"
          />
          <h3 className="text-[0.875rem] md:text-[1.25rem] font-semibold leading-[1.125rem] md:leading-[1.75rem] ">
            Still a clean slate
          </h3>
          <p className="text-[0.875rem] md:text-[1rem] md:font-semibold leading-[1.125rem] md:leading-[1.25rem] w-[16.875rem] md:w-[21.375rem] text-center">
            Send your first package to start building your payment history.
          </p>
        </div>
      </div>
    </>
  );
}

export default EmptyPaymentHistory