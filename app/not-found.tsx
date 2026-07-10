// Shown for any 404 across the entire app.
// Server Component — no "use client" needed.

import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "404 — Page Not Found | Dispatch Hub",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-8 px-4">
      <Image
        src="/logo.svg"
        alt="Dispatch Hub"
        width={60}
        height={40}
        priority
      />
      {/* 4📦4 — matches the Figma design */}
      <div className="flex items-center gap-2 text-[7rem] font-bold leading-none text-[#1A1A2E]">
        <span>4</span>
        <Image
          src="/icons/box.png"
          alt="box"
          width={80}
          height={80}
          className="w-20 h-20 object-contain"
        />
        <span>4</span>
      </div>
      <p className="unageo-regular text-[#616161] text-lg text-center max-w-sm">
        Sorry, the page you&apos;re looking for does not exist.
      </p>
      <Link
        href="/"
        className="flex py-4 px-10 justify-center items-center rounded-[2rem] bg-[#FE581C] text-white unageo-regular text-[0.9rem] hover:bg-[#f54708] transition-colors duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
}