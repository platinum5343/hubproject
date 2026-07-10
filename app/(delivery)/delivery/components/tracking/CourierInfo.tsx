"use client";

import Image from "next/image";
import { useAppSelector } from "../../store/hooks";
import From from "../icons/tracking/From";
import To from "../icons/tracking/To";
import Share from "../icons/tracking/Share";

// CourierInfo reads from tracking Redux state (set by backend when a ride starts).
// No hardcoded names or addresses anywhere.
const CourierInfo = () => {
  const courier = useAppSelector((state) => state.tracking);

  // Derive initials for avatar fallback
  const name = (courier as any).courierName ?? "";
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w: string) => w[0]?.toUpperCase() ?? "")
    .join("");

  const from = (courier as any).fromAddress ?? "";
  const to = (courier as any).toAddress ?? "";
  const status = (courier as any).status ?? "Ride in progress...";
  const avatarUrl = (courier as any).courierAvatar ?? "";

  return (
    <div className="flex justify-center items-center gap-4">
      <div className="flex flex-col items-start justify-center gap-2 w-full">
        {/* Avatar + name */}
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <Image src={avatarUrl} alt="courier" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FE581C] to-[#ff8c63] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {initials || "?"}
            </div>
          )}
          <div className="flex flex-col items-start">
            <h2 className="text-[1.125rem] font-semibold leading-6 text-[#616161]">
              {name || "Finding courier..."}
            </h2>
            <h3 className="text-[#A5A5A5] text-[0.75rem] font-medium leading-4">{status}</h3>
          </div>
        </div>

        {/* Route */}
        {(from || to) && (
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1">
              <From />
              <h3 className="text-[#616161] text-[0.75rem] leading-4 truncate w-[5rem] md:w-[8rem]">{from}</h3>
            </div>
            <div className="flex items-center gap-1">
              <To />
              <h3 className="text-[#616161] text-[0.75rem] leading-4 truncate w-[5rem] md:w-[8rem]">{to}</h3>
            </div>
          </div>
        )}
      </div>

      {/* Share — call is mobile-app only, removed from web */}
      <div className="flex items-center gap-6">
        <Share />
      </div>
    </div>
  );
};

export default CourierInfo;