// Client Component — required by Next.js for error boundaries.
// Catches runtime errors in the (users) route group and shows a recovery UI.

"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your error tracking service here (e.g. Sentry)
    console.error("[App Error]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white gap-6 px-4">
      <Image src="/logo.svg" alt="Dispatch Hub" width={50} height={34} priority />
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="unageo text-2xl font-semibold text-[#1A1A2E]">
          Something went wrong
        </h2>
        <p className="unageo-regular text-[#616161] max-w-sm">
          We hit an unexpected error. Your data is safe — please try again.
        </p>
        {error.digest && (
          <p className="text-xs text-[#A5A5A5] font-mono mt-1">
            Error ID: {error.digest}
          </p>
        )}
      </div>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="flex py-3 px-8 rounded-[2rem] bg-[#FE581C] text-white unageo-regular text-sm hover:bg-[#f54708] transition-colors cursor-pointer"
        >
          Try again
        </button>
        <Link
          href="/"
          className="flex py-3 px-8 rounded-[2rem] border border-[#E0E0E0] text-[#333] unageo-regular text-sm hover:bg-[#F8F8F8] transition-colors"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}