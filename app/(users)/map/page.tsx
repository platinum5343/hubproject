"use client";

// Force SSR on every request — prevents Next.js from pre-rendering this
// page as a static HTML file at build time.
export const dynamic = "force-dynamic";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MapComponent from "../components/MapComponent";
import From from "../../(delivery)/delivery/components/icons/tracking/From";
import To from "../../(delivery)/delivery/components/icons/tracking/To";
import Call from "../../(delivery)/delivery/components/icons/tracking/Call";
import Rating from "../../(delivery)/delivery/components/icons/tracking/Rating";

// ─── types ────────────────────────────────────────────────────────────────────
type TrackingStatus = "idle" | "loading" | "found" | "not_found";

interface RiderInfo {
  name: string;
  initials: string;
  rating: number;
  vehicle: string;
  phone: string;
  status: string;
  eta: string;
  from: string;
  to: string;
}

// ─── mock verification (swap for real API call when backend is ready) ─────────
const MOCK_DELAY = 1800; // ms

const verifyTrackingId = (id: string): Promise<RiderInfo | null> =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (id.trim().length >= 6) {
        resolve({
          name: "Janet Doe",
          initials: "JD",
          rating: 4.8,
          vehicle: "Motorcycle",
          phone: "+234 812 345 6789",
          status: "Ride in progress...",
          eta: "~12 mins",
          from: "1 Marine Base Road, Port Harcourt",
          to: "Q32X+WCX, Port Harcourt Refinery, Abalama",
        });
      } else {
        resolve(null);
      }
    }, MOCK_DELAY);
  });

// ─── TrackingInput — Phase 1: just the search card ───────────────────────────
const TrackingInput = ({
  onFound,
}: {
  onFound: (info: RiderInfo) => void;
}) => {
  const [trackingId, setTrackingId] = useState("");
  const [status, setStatus] = useState<TrackingStatus>("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTrack = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!trackingId.trim()) return;

    setStatus("loading");
    const info = await verifyTrackingId(trackingId);

    if (info) {
      setStatus("found");
      // Brief pause so user sees "verified" state before map opens
      setTimeout(() => onFound(info), 400);
    } else {
      setStatus("not_found");
    }
  };

  return (
    <motion.div
      key="tracking-input"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center w-full h-screen overflow-hidden bg-white px-4"
    >
      <div className="w-full max-w-md">
        {/* Logo — links back to home */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-10 hover:opacity-80 transition-opacity">
          <Image src="/logo.svg" width={40} height={28} alt="logo" />
          <h1 className="unageo font-bold text-[1.6rem] leading-tight">
            Dispatch Hub
          </h1>
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#F0F0F0] shadow-sm p-8 flex flex-col gap-6">
          {/* Icon */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-[#FFF0EB] rounded-full flex items-center justify-center">
              <svg
                className="w-7 h-7 text-[#FE581C]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div className="text-center">
              <h2 className="unageo font-semibold text-[1.25rem] leading-[1.75rem]">
                Track your delivery
              </h2>
              <p className="unageo-regular text-[0.875rem] text-[#616161] leading-[1.4rem] mt-1">
                Enter the tracking ID from the message sent to you
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleTrack} className="flex flex-col gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4 text-[#A5A5A5]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={trackingId}
                onChange={(e) => {
                  setTrackingId(e.target.value);
                  if (status === "not_found") setStatus("idle");
                }}
                placeholder="Tracking ID e.g. 10002000RD"
                className={`w-full pl-10 pr-4 py-3.5 rounded-[2rem] border text-sm unageo-regular focus:outline-none transition-colors duration-200 ${
                  status === "not_found"
                    ? "border-red-400 bg-red-50 placeholder:text-red-300"
                    : status === "found"
                      ? "border-green-400 bg-green-50"
                      : "border-[#E0E0E0] focus:border-[#FE581C] bg-[#FAFAFA]"
                }`}
              />
            </div>

            {/* Error message */}
            <AnimatePresence>
              {status === "not_found" && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-xs unageo-regular text-center"
                >
                  No delivery found with that tracking ID. Please check and try
                  again.
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={!trackingId.trim() || status === "loading"}
              className={`w-full py-3.5 rounded-[2rem] unageo-regular font-medium text-[0.9rem] text-white transition-all duration-300 cursor-pointer ${
                !trackingId.trim() || status === "loading"
                  ? "bg-[#FE581C]/50 cursor-not-allowed"
                  : "bg-[#FE581C] hover:bg-[#f54708] active:bg-[#db450f]"
              }`}
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Verifying...
                </span>
              ) : (
                "Track Package"
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

// ─── TrackingView — Phase 2: rider info + real-time map ──────────────────────
const TrackingView = ({
  rider,
  onReset,
}: {
  rider: RiderInfo;
  onReset: () => void;
}) => {
  return (
    <motion.div
      key="tracking-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full pt-[5rem] lg:pt-[6rem] h-screen overflow-hidden bg-white"
    >
      <div className="flex flex-col md:flex-row w-full h-full md:gap-6 md:p-6 p-4 pb-6">
        {/* ── Left panel: rider info ─────────────────────────────────── */}
        <div className="w-full md:w-[22rem] flex-shrink-0 flex flex-col gap-4 md:h-full md:overflow-y-auto">
          {/* Rider card */}
          <div className="border border-[#FE581C] rounded-2xl p-5 flex flex-col gap-5">
            {/* Profile row */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FE581C] to-[#ff8c63] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                {rider.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="unageo font-semibold text-[0.95rem] leading-[1.25rem] truncate">
                  {rider.name}
                </h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <Rating />
                  <span className="text-xs unageo-regular text-[#616161]">
                    {rider.rating}
                  </span>
                  <span className="text-xs unageo-regular text-[#A5A5A5]">
                    · {rider.vehicle}
                  </span>
                </div>
              </div>
              {/* Call button */}
              <a
                href={`tel:${rider.phone}`}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#F8F8F8] hover:bg-[#FFF0EB] transition-colors flex-shrink-0"
                title={`Call ${rider.name}`}
              >
                <Call />
              </a>
            </div>

            {/* Status + ETA */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs unageo-regular text-[#FE581C] font-medium">
                {rider.status}
              </span>
              <span className="text-xs unageo-regular text-[#616161] bg-[#F4F4F4] px-3 py-1 rounded-full">
                ETA {rider.eta}
              </span>
            </div>

            {/* Route */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-start">
                <div className="mt-1 flex-shrink-0">
                  <From />
                </div>
                <p className="text-sm unageo-regular text-[#333333] leading-[1.4rem]">
                  {rider.from}
                </p>
              </div>
              {/* Dotted connector */}
              <div className="ml-[0.2rem] flex flex-col gap-[3px]">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-[2px] h-[4px] bg-[#D3D3D3] rounded-full ml-[0.1rem]"
                  />
                ))}
              </div>
              <div className="flex gap-3 items-start">
                <div className="mt-1 flex-shrink-0">
                  <To />
                </div>
                <p className="text-sm unageo-regular text-[#333333] leading-[1.4rem]">
                  {rider.to}
                </p>
              </div>
            </div>
          </div>

          {/* Track a different package */}
          <button
            onClick={onReset}
            className="w-full py-3 rounded-[2rem] border border-[#FE581C] text-[#FE581C] unageo-regular text-sm font-medium hover:bg-[#FFF0EB] transition-colors duration-200 cursor-pointer"
          >
            Track another package
          </button>
        </div>

        {/* ── Right panel: live map ──────────────────────────────────── */}
        <div className="flex-1 min-h-[280px] md:min-h-full rounded-2xl overflow-hidden shadow-sm mt-4 md:mt-0">
          <MapComponent />
        </div>
      </div>
    </motion.div>
  );
};

// ─── MapPage — orchestrates the two phases ───────────────────────────────────
const MapPage = () => {
  const [riderInfo, setRiderInfo] = useState<RiderInfo | null>(null);

  return (
    <AnimatePresence mode="wait">
      {riderInfo ? (
        <TrackingView
          key="view"
          rider={riderInfo}
          onReset={() => setRiderInfo(null)}
        />
      ) : (
        <TrackingInput key="input" onFound={setRiderInfo} />
      )}
    </AnimatePresence>
  );
};

export default MapPage;