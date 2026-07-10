// PRIVACY PAGE — SSG (Static Site Generation)
// ─────────────────────────────────────────────
// This page contains only static text that never changes at runtime.
// No "use client", no `force-dynamic` — Next.js pre-renders it as a
// static HTML file at build time and serves it from Cloudflare's CDN.
// Zero server cost, instant load, fully SEO-indexed.

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "Learn how Dispatch Hub collects and uses your personal information when you use our delivery services.",
};

const Privacy = () => {
  return (
    <>
      <div className="flex py-3 md:py-4 px-6 md:px-8 flex-col items-center justify-center mt-[6rem]">
        <div className="flex flex-col w-full items-center gap-2 md:gap-4 my-[3rem] md:my-[4rem]">
          <h1 className="text-center unageo text-[2rem] md:text-[3.75rem] font-bold leading-[2.5rem] md:leading-[4.25rem]">
            Privacy Notice
          </h1>
          <h3 className="unageo-regular text-[1.2rem] md:text-[2.5rem] font-medium md:font-semibold leading-[2rem] md:leading-[3rem]">
            For Customers & Riders
          </h3>
          <h5 className="unageo-regular text-[1rem] md:text-[1.5rem] leading-[1.5rem] md:leading-[2rem]">
            Last Update: 13th July 2025
          </h5>
        </div>
      </div>
      <div className="flex flex-col items-start gap-[2.8rem] px-6 md:px-20 mb-[4.5rem] md:mb-[12rem]">
        <div className="h-[0.125rem] w-full bg-[#E8E8E8]"></div>
        <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
          At Dispatch Hub, your privacy is important to us. This Privacy Notice
          explains how we collect and use your personal information when you use
          our services.
        </p>
        <div className="flex flex-col items-start gap-2">
          <h2 className="unageo-regular text-[1.5rem] md:text-[2rem] font-semibold leading-[2rem] md:leading-[2.5rem]">
            What We Collect
          </h2>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            <span className="font-semibold">For Customers:</span> We collect the
            following information to process and complete delivery requests:
          </p>
          <ul className="list-disc list-inside space-y-2 unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            <li>Email address</li>
            <li>Phone number</li>
            <li>Location data (pickup and drop-off addresses)</li>
          </ul>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8 mt-10">
            <span className="font-semibold">For Riders:</span> We collect the
            following information to enable delivery matching, communication,
            and real-time tracking:
          </p>
          <ul className="list-disc list-inside space-y-2 unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            <li>Email address</li>
            <li>Phone number</li>
            <li>Location data (used during active deliveries only)</li>
          </ul>

          <h2 className="unageo-regular text-[1.5rem] md:text-[2rem] font-semibold leading-[2rem] md:leading-[2.5rem] mt-10">
            How We Use Your Information
          </h2>
          <ul className="list-disc list-inside space-y-2 unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            <li>To facilitate delivery requests between customers and riders</li>
            <li>To enable real-time tracking of deliveries</li>
            <li>To contact you regarding updates, confirmations, or issues with your delivery</li>
            <li>To improve the safety and efficiency of our service</li>
          </ul>

          <h2 className="unageo-regular text-[1.5rem] md:text-[2rem] font-semibold leading-[2rem] md:leading-[2.5rem] mt-10">
            Your Privacy Rights
          </h2>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            We never sell your data. Your information is stored securely and
            only shared with trusted parties essential for completing your
            delivery (e.g., the assigned rider or customer).
          </p>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            You may request to:
          </p>
          <ul className="list-disc list-inside space-y-2 unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8 font-semibold">
            <li>Access or correct your data</li>
            <li>Delete your account and associated information</li>
          </ul>

          <h2 className="unageo-regular text-[1.5rem] md:text-[2rem] font-semibold leading-[2rem] md:leading-[2.5rem] mt-10">
            Contact Us
          </h2>
          <p className="unageo-regular text-[1rem] md:text-[1.5rem] leading-6 md:leading-8">
            If you have any questions about how your data is used, contact our
            support team at:{" "}
            <Link href={"mailto:support@dispatchhub.ng"} className="text-[#FE581C]">
              support@dispatchhub.ng
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Privacy;