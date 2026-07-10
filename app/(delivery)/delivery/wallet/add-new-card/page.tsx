// ADD NEW CARD PAGE — SSR + CSR
// ──────────────────────────────
// SSR: `force-dynamic` prevents static pre-rendering.
//      Without this, Next.js tries to pre-render this page at build time,
//      which crashes because react-loader-spinner → framer-motion →
//      motion.div is not available in the Node.js prerender environment.
//
// CSR: The card form and Redux state are fully client-side ("use client").
"use client";
export const dynamic = "force-dynamic";

import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Link from "next/link";

export default function AddNewCard() {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-10">
      <div className="w-full max-w-[28rem] flex flex-col gap-6">
        {/* Back */}
        <Link
          href="/delivery/wallet"
          className="flex items-center gap-2 text-[#616161] text-sm unageo-regular hover:text-[#FE581C] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Wallet
        </Link>

        <div className="bg-white rounded-2xl border border-[#F0F0F0] shadow-sm p-8 flex flex-col gap-6">
          <h1 className="unageo font-semibold text-[1.25rem] leading-[1.75rem]">
            Add New Card
          </h1>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#616161] unageo-regular">Card Number</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full px-4 py-3 rounded-[2rem] border border-[#E0E0E0] text-sm unageo-regular focus:outline-none focus:border-[#FE581C] bg-[#FAFAFA] transition-colors"
              />
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs text-[#616161] unageo-regular">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  maxLength={7}
                  className="w-full px-4 py-3 rounded-[2rem] border border-[#E0E0E0] text-sm unageo-regular focus:outline-none focus:border-[#FE581C] bg-[#FAFAFA] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs text-[#616161] unageo-regular">CVV</label>
                <input
                  type="text"
                  placeholder="•••"
                  maxLength={4}
                  className="w-full px-4 py-3 rounded-[2rem] border border-[#E0E0E0] text-sm unageo-regular focus:outline-none focus:border-[#FE581C] bg-[#FAFAFA] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-[#616161] unageo-regular">Cardholder Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-[2rem] border border-[#E0E0E0] text-sm unageo-regular focus:outline-none focus:border-[#FE581C] bg-[#FAFAFA] transition-colors"
              />
            </div>
          </div>

          <button className="w-full py-4 rounded-[2.5rem] bg-[#FE581C] text-white unageo-regular font-medium text-[1rem] hover:bg-[#f54708] transition-colors cursor-pointer">
            Add Card
          </button>
        </div>
      </div>
    </div>
  );
}