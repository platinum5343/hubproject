"use client";

import Image from "next/image";

export interface ActiveRideData {
  id: string | number;
  courierName: string;
  courierInitials: string;
  status: string;
  avatarUrl?: string;
}

interface Props {
  rides?: ActiveRideData[];
}

// ── Empty state ───────────────────────────────────────────────────────────────
const NoActiveRides = () => (
  <div className="hidden lg:flex flex-col items-center justify-center h-[20rem] w-[23rem] unageo-regular">
    <div className="flex items-center gap-4 w-full">
      <h2 className="text-[1.5rem] font-semibold leading-[2rem]">Active Ride</h2>
      <h3 className="flex w-8 p-1 justify-center items-center bg-[#EDEDED] rounded-full text-[1rem] font-semibold leading-[1.25rem]">
        0
      </h3>
    </div>
    <div className="w-full h-[12rem] bg-white flex flex-col justify-center items-center rounded-[1.25rem] px-8 py-8 mt-4 gap-3">
      <div className="w-12 h-12 bg-[#F4F4F4] rounded-full flex items-center justify-center">
        <Image src="/delivery/icons/track.png" width={20} height={20} alt="empty" className="opacity-40" />
      </div>
      <p className="unageo-regular text-[0.8rem] text-[#A5A5A5] text-center">
        No active rides right now
      </p>
    </div>
  </div>
);

// ── Single ride card ──────────────────────────────────────────────────────────
const RideCard = ({ ride }: { ride: ActiveRideData }) => (
  <div className="flex flex-col w-full h-full p-[0.625rem] justify-center items-center rounded-[1rem] bg-[#F8F8F8]">
    <div className="flex flex-col items-center gap-4">
      {/* Avatar */}
      <div className="flex w-[9.5rem] h-[9.5rem] p-[1.62rem] items-center rounded-full bg-[#EDEDED]">
        {ride.avatarUrl ? (
          <Image src={ride.avatarUrl} width={100} height={100} alt="avatar" className="w-[100px] h-[100px] rounded-full object-cover" />
        ) : (
          <div className="w-[100px] h-[100px] rounded-full bg-gradient-to-br from-[#FE581C] to-[#ff8c63] flex items-center justify-center text-white text-2xl font-bold">
            {ride.courierInitials}
          </div>
        )}
      </div>
      {/* Details */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-[1.125rem] font-semibold leading-6">{ride.courierName}</h3>
          <h4 className="text-[#FE581C] text-[0.75rem] font-medium leading-4">{ride.status}</h4>
        </div>
        <div className="flex items-center gap-[1.5rem]">
          {[
            { src: "/delivery/icons/track.png", label: "Track" },
            { src: "/delivery/icons/message-text.png", label: "Message" },
            { src: "/delivery/icons/call.png", label: "Call" },
          ].map(({ src, label }) => (
            <div key={label} className="flex w-[3.5rem] p-2 flex-col items-center gap-1 bg-[#F0F0F0] rounded-lg cursor-pointer hover:bg-[#e8e8e8] transition-colors">
              <Image src={src} height={20} width={20} alt={label} />
              <h4 className="text-[10px] leading-[0.875rem]">{label}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// ── ActiveRide ────────────────────────────────────────────────────────────────
const ActiveRide = ({ rides = [] }: Props) => {
  if (!rides || rides.length === 0) return <NoActiveRides />;

  return (
    <div className="hidden lg:block w-[23rem] unageo-regular">
      <div className="flex items-center gap-4">
        <h2 className="text-[1.5rem] font-semibold leading-[2rem]">Active Ride</h2>
        <h3 className="flex w-8 p-1 justify-center items-center bg-[#EDEDED] rounded-full text-[1rem] font-semibold leading-[1.25rem]">
          {rides.length}
        </h3>
      </div>
      <div className="w-full bg-white flex flex-col gap-3 rounded-[1.25rem] px-8 py-12 mt-4">
        {rides.map((ride) => (
          <RideCard key={ride.id} ride={ride} />
        ))}
      </div>
    </div>
  );
};

export default ActiveRide;